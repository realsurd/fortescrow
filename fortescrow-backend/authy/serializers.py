from __future__ import annotations
from datetime import date

from django.conf import settings
from django.contrib.auth import authenticate
from django.db import transaction
from django.contrib.auth.hashers import make_password

from rest_framework import serializers
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.serializers import ModelSerializer, Serializer

from authy.models import (
    User,
    UserOTP,
    Profile,
    Business,
    Customer,
    State,
    Address,
)
from authy.tasks import (
    send_account_activation_email,
    send_update_password_succcess_email,
)
from authy.services.code_generators import CodeGenerator
from authy.services.utils import refresh_token


class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = "__all__"
        read_only_fields = ("owner", "key")


class AddressSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Address
        read_only_fields = ("customer",)


class CustomerSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True,)
    total_revenue = serializers.SerializerMethodField()
    overdue_payments = serializers.SerializerMethodField()
    open_balances = serializers.SerializerMethodField()

    class Meta:
        model = Customer
        fields = "__all__"
        read_only_fields = (
            "business",
            "open_balance",
            "total_revenue",
            "overdue_payments",
            "open_balances",
            "is_active",
        )

    def get_total_revenue(self, instance):
        paid_invoices = instance.invoice_set.filter(invoice_status="Paid")
        total_revenue = sum(invoice.total_amount for invoice in paid_invoices)
        return total_revenue

    def get_overdue_payments(self, instance):
        today = date.today()
        overdue_invoices = instance.invoice_set.filter(
            due_date__lt=today, invoice_status="Pending"
        )
        overdue_payments = sum(invoice.total_amount for invoice in overdue_invoices)
        return overdue_payments

    def get_open_balances(self, instance):
        pending_invoices = instance.invoice_set.filter(invoice_status="Pending")
        open_balances = sum(invoice.total_amount for invoice in pending_invoices)
        return open_balances

    def to_representation(self, instance: Customer):
        rep = super(CustomerSerializer, self).to_representation(instance)
        return rep


class AddCustomerUserSerializer(ModelSerializer):
    picture = serializers.CharField(source="profile.picture", read_only=True)

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "password",
            "email",
            "user_type",
            "picture",
            "id",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def validate_password(self, value):
        return make_password(value)

    @transaction.atomic
    def create(self, validated_data):
        otp = CodeGenerator.generate_otp(4)
        validated_data["otp"] = otp
        user = User.objects.create(**validated_data)
        send_account_activation_email(validated_data.get("email"), otp)
        return user


class UserSerializer(ModelSerializer):
    businesses = BusinessSerializer(many=True, write_only=True, required=False)
    picture = serializers.CharField(source="profile.picture", read_only=True)

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "password",
            "email",
            "user_type",
            "picture",
            "id",
            "businesses",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def validate_password(self, value):
        return make_password(value)

    @transaction.atomic
    def create(self, validated_data):
        otp = CodeGenerator.generate_otp(4)
        validated_data["otp"] = otp
        user = User.objects.create(**validated_data)
        send_account_activation_email(validated_data.get("email"), otp)
        return user


class OTPSerializer(serializers.Serializer):
    otp = serializers.IntegerField()


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=50, write_only=True)
    password = serializers.CharField(max_length=50, write_only=True)
    token = serializers.CharField(max_length=100, read_only=True)

    class Meta:
        model = User
        fields = ["email", "password", "token", "id"]
        read_only_fields = ("token",)

    def validate(self, data):
        password = data.get("password", "")
        email = data.get("email", "")
        user = authenticate(email=email, password=password)

        if not user:
            raise serializers.ValidationError(
                {"errors": "Invalid credentials, try again"},
                code=status.HTTP_400_BAD_REQUEST,
            )

        if not user.is_active:
            raise serializers.ValidationError(
                {"errors": "Account disabled, contact admin"},
                code=status.HTTP_401_UNAUTHORIZED,
            )

        if not user.is_verified:
            raise AuthenticationFailed(
                {"errors": "Please verify your email is, and try again"},
                code=status.HTTP_403_FORBIDDEN,
            )

        token = refresh_token(user)
        user.first_login = False
        user.save()
        data = UserSerializer(user).data
        data["token"] = token
        data["business_id"] = (
            user.businesses.first().id if user.businesses.first() else None
        )
        return data

    def create(self, validated_data):
        return validated_data


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=50, write_only=True)

    class Meta:
        fields = ["email"]


class RequestNewOTPSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=2, max_length=100)


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=8, max_length=68, write_only=True)

    class Meta:
        fields = ["password"]

    def validate(self, data):
        password = data.get("password")
        otp = self.context.get("token")
        try:
            user_otp = UserOTP.objects.get(secret=otp)
            user = user_otp.user
        except UserOTP.DoesNotExist as exc:
            raise AuthenticationFailed(
                {"errors": "The reset otp is invalid try again"}
            ) from exc

        user.set_password(password)
        user_otp.delete()
        user.save()
        token = refresh_token(user)
        send_update_password_succcess_email(user.email)
        return {"email": user.email, "token": token}


class StateSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = State


class ProfileSerializer(ModelSerializer):
    class Meta:
        fields = "__all__"
        model = Profile
        read_only_fields = ("user",)
