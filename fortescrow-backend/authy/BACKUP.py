# SERIALIZERS

class UpdatePasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(max_length=50, write_only=True)
    secret = serializers.CharField(max_length=50, write_only=True)

    class Meta:
        fields = ["old_password", "new_password", "secret"]


class UpdatePasswordInAppSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=50, write_only=True)
    new_password = serializers.CharField(max_length=50, write_only=True)

    class Meta:
        fields = ["old_password", "new_password"]


class ArtisanSerializer(ModelSerializer):
    class Meta:
        model = User
        ref_name = "artisan"
        fields = (
            "id",
            "first_name",
            "last_name",
            "phone_number",
            "email",
        )

    def to_representation(self, instance):
        rep = super(ArtisanSerializer, self).to_representation(instance)
        if instance.is_verified:
            rep["picture"] = (
                settings.CLOUDINARY_ROOT_URL + str(instance.picture)
                if instance.picture
                else None
            )

        return rep


class UpdateUserSerializer(ModelSerializer):
    address = serializers.CharField(max_length=200, write_only=True)

    class Meta:
        model = User
        fields = (
            "phone_number",
            "password",
            "address",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def update(self, instance: User, validated_data):
        instance.profile.address = validated_data.get(
            "address", instance.profile.address
        )
        instance.phone_number = validated_data.get(
            "phone_number", instance.phone_number
        )
        instance.save()
        return instance



# URLS
router.register(r"update-user", UpdateUserView, basename="update-user")



    path("users/verify-otp", ValidateOTPView.as_view()),
    path("users/request-new-otp", RequestNewOTPView.as_view()),
    path("users/update-password", UpdatePasswordView.as_view()),
    path("users/update-password-in-app", UpdatePasswordInAppView.as_view()),
    
    
# VIEWS

class UpdateUserView(ModelViewSet):
    serializer_class = UpdateUserSerializer
    http_method_names = ["patch"]
    queryset = User.objects.all()




class UpdatePasswordView(GenericAPIView):
    serializer_class = UpdatePasswordSerializer
    permission_classes = (AllowAny,)

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_password = request.data.get("new_password", "")
        secret = request.data.get("secret", "")

        try:
            user = UserOTP.objects.get(secret=secret).user
        except UserOTP.DoesNotExist as exc:
            raise serializers.ValidationError(
                {"errors": "Wrong Password Token"}, code=status.HTTP_400_BAD_REQUEST
            ) from exc

        if user:
            user.set_password(new_password)
            user.save()
            send_update_password_succcess_email(user.email)
            return Response(
                {"message": "Successfully updated your password"},
                status=status.HTTP_200_OK,
            )


class ValidateOTPView(GenericAPIView):
    serializer_class = OTPSerializer
    permission_classes = (AllowAny,)

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        secret = request.data.get("otp", "")

        try:
            UserOTP.objects.get(secret=secret)

        except UserOTP.DoesNotExist as exc:
            raise serializers.ValidationError(
                {"errors": "Wrong Password Token"}, code=status.HTTP_400_BAD_REQUEST
            ) from exc

        return Response(
            {"message": "Successfully verified your otp"},
            status=status.HTTP_200_OK,
        )


class UpdatePasswordInAppView(GenericAPIView):
    serializer_class = UpdatePasswordInAppSerializer
    permission_classes = (IsAuthenticated,)

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        old_password = request.data.get("old_password", "")
        new_password = request.data.get("new_password", "")

        user = authenticate(email=request.user.email, password=old_password)
        if user:
            user.set_password(new_password)
            user.save()
            send_update_password_succcess_email(user.email)
            return Response(
                {"message": "Successfully updated your password"},
                status=status.HTTP_200_OK,
            )

        raise serializers.ValidationError(
            {"errors": "Wrong Password"}, code=status.HTTP_400_BAD_REQUEST
        )








