from django.db.transaction import atomic
from django.contrib.auth import authenticate
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.serializers import ValidationError
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle

from authy.serializers import *
from authy.models import User, Profile, UserOTP
from authy.tasks import send_account_verified_email, send_forgot_password_email


class UserRegistrationViewset(ModelViewSet):
    serializer_class = AddCustomerUserSerializer
    http_method_names = ["post"]
    permission_classes = (AllowAny,)
    throttle_classes = [UserRateThrottle, AnonRateThrottle]


class CustomerViewset(ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()
    http_method_names = ["post", "patch", "get"]
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return self.queryset.filter(business_id=self.kwargs.get("business_id"))

    def perform_create(self, serializer):
        serializer.is_valid(raise_exception=True)
        addresses = serializer.validated_data.pop("addresses")
        business_id = self.kwargs.get("business_id")
        instance = serializer.save(business_id=business_id)

        for address in addresses:
            Address.objects.create(**address, customer=instance)


class ProfileViewset(ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()


class VerifyOTPView(GenericAPIView):
    serializer_class = OTPSerializer
    permission_classes = (AllowAny,)
    throttle_classes = [UserRateThrottle, AnonRateThrottle]
    http_method_names = ["post"]

    @transaction.atomic
    def post(self, request):
        otp = request.data.get("otp")
        try:
            user = User.objects.get(otp=otp)
        except User.DoesNotExist:
            raise serializers.ValidationError({"errors": "Invalid OTP!"})

        if user.is_verified:
            raise serializers.ValidationError(
                {"errors": "Account is already Verified!"}
            )

        user.is_verified = True

        user.save()
        send_account_verified_email(user.email)
        message = "Successfully verified email, proceed to login"
        return Response(
            {"message": message},
            status=status.HTTP_200_OK,
        )


class SigninView(GenericAPIView):
    serializer_class = UserLoginSerializer
    http_method_names = ["post"]
    permission_classes = (AllowAny,)
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    def post(self, request):
        request.user.auth_token.delete()

        return Response("User logged out successfully", status=status.HTTP_200_OK)


class ForgotPasswordView(GenericAPIView):
    serializer_class = ForgotPasswordSerializer
    permission_classes = (AllowAny,)
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    @transaction.atomic
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = request.data.get("email", "")
        code = CodeGenerator.generate_otp(6)
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist as exc:
            raise ValidationError({"errors": "Example error message"}) from exc

        otp, is_new = UserOTP.objects.get_or_create(
            user=user, defaults={"user": user, "secret": code}
        )

        if not is_new:
            otp.delete()
            otp = UserOTP.objects.create(user=user, secret=code)
            send_forgot_password_email(email, str(otp.secret))
        return Response(
            {"message": "We have sent a password reset mail to your box if it exists"},
            status=status.HTTP_200_OK,
        )


class RequestNewOTPView(GenericAPIView):
    permission_classes = []
    serializer_class = RequestNewOTPSerializer
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        serializer.is_valid(raise_exception=True)

        user_data = serializer.validated_data
        user = User.objects.get(email=user_data["email"])

        if user.is_verified:
            raise ValidationError({"errors": "Email is already verified"})

        otp = CodeGenerator.generate_otp(4)
        send_account_activation_email(user_data.get("email"), otp)
        user.otp = otp
        user.save()

        return Response(
            {"data": "OTP sent to " + str(user_data["email"]) + " successfully"},
            status=status.HTTP_200_OK,
        )


class SetNewPasswordView(GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = [AllowAny]
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def patch(self, request, token):
        serializer = self.serializer_class(data=request.data, context={"token": token})
        serializer.is_valid(raise_exception=True)
        return Response(
            serializer.validated_data,
            status=status.HTTP_200_OK,
        )


class BusinessUserRegistrationViewset(ModelViewSet):
    serializer_class = UserSerializer
    http_method_names = ["post"]
    permission_classes = (AllowAny,)
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        businesses = request.data.pop("businesses")
        user_serializer = UserSerializer(data=request.data)
        businesses_list = []
        if user_serializer.is_valid(raise_exception=True):
            user = user_serializer.save()
            for business in businesses:
                business_serializer = BusinessSerializer(data=business)

            if business_serializer.is_valid(raise_exception=True):
                business = business_serializer.save(owner=user)
                businesses_list.append(business)

            return Response(
                {
                    "user": UserSerializer(user).data,
                    "businesses": BusinessSerializer(businesses_list, many=True).data,
                },
                status=status.HTTP_201_CREATED,
            )

        raise ValidationError({"errors": "Ensure all fields are filled"})


class ValidateOTPView(GenericAPIView):
    serializer_class = OTPSerializer
    permission_classes = (AllowAny,)
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        secret = request.data.get("otp", "")

        try:
            otp = UserOTP.objects.get(secret=secret)

        except UserOTP.DoesNotExist:
            return Response(
                {"errors": "Wrong OTP Token "},
                status=status.HTTP_400_BAD_REQUEST,
            )

        otp.delete()
        return Response(
            {"message": "Successfully verified your otp"},
            status=status.HTTP_200_OK,
        )


class BusinessRegistrationViewset(ModelViewSet):
    serializer_class = BusinessSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Business.objects.all()
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class StateViewset(ModelViewSet):
    serializer_class = StateSerializer
    permission_classes = (AllowAny,)
    queryset = State.objects.all()
    http_method_names = [
        "get",
    ]


class AddressViewset(ModelViewSet):
    serializer_class = AddressSerializer
    permission_classes = (AllowAny,)
    queryset = Address.objects.all()
