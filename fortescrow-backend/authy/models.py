from __future__ import annotations

from typing import Dict, List
from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.db import models

from cloudinary.models import CloudinaryField
from mixins.base_model import BaseModel
from authy.dependencies.constants import BUSINESS
from authy.dependencies.choices import USER_TYPES_CHOICE
from authy.services.code_generators import CodeGenerator
from authy.managers import UserManager


class BaseSoftDeletableModel(models.Model):
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(
        auto_now=True,
    )
    user = models.ForeignKey(
        "User",
        null=True,
        on_delete=models.SET_NULL,
        related_name="deleted_user",
        blank=True,
    )
    deleted_by = models.ForeignKey(
        "User", null=True, on_delete=models.SET_NULL, related_name="deleter", blank=True
    )

    class Meta:
        abstract = True

    def soft_delete(self, user, deleted_by):
        self.is_deleted = True
        self.user = user
        self.deleted_by = deleted_by
        self.save()


class User(AbstractUser, BaseModel, BaseSoftDeletableModel):
    email = models.EmailField(unique=True, verbose_name="E-mail Address")
    first_name = models.CharField(max_length=150, blank=True, verbose_name="First Name")
    last_name = models.CharField(max_length=150, blank=True, verbose_name="Last Name")
    user_type = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        choices=USER_TYPES_CHOICE,
        default=BUSINESS,
        verbose_name="User type",
    )
    first_login = models.BooleanField(default=True, verbose_name="First Login")
    otp = models.IntegerField(blank=True, null=True, unique=True)
    is_verified = models.BooleanField(default=False, verbose_name="Is Verified")
    objects = UserManager()
    REQUIRED_FIELDS = ["first_name", "last_name", ]
    USERNAME_FIELD: str = "email"

    class Meta:
        ordering = ("email",)

    def __str__(self: AbstractUser):
        return f"{self.email}"

    @property
    def get_full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"

    def save(self: User, *args: List[str], **kwargs: Dict) -> None:
        if not self.username:
            digit = CodeGenerator.generate_otp(2)
            email = self.email
            self.username = str(email).split("@")[0]
            self.username += str(digit)

        super().save(*args, **kwargs)


class UserOTP(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    secret = models.CharField(max_length=50, default=uuid4)


class Profile(BaseModel):
    user = models.OneToOneField("User", on_delete=models.CASCADE)
    picture = CloudinaryField("profile_pic", null=True, blank=True)
    display_name = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    phone_number = models.CharField(
        unique=True, max_length=20, blank=True, null=True, verbose_name="Phone Number"
    )

    def __str__(self):
        return f"Profile for {self.user.email}"


class Business(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="businesses")
    name = models.CharField(max_length=255)
    registration_number = models.CharField(max_length=50, blank=True)
    logo = CloudinaryField("logo", null=True, blank=True)
    key = models.CharField(max_length=50, default=uuid4, null=True, blank=True)


class Customer(BaseModel):
    display_name = models.CharField(max_length=100, blank=True, null=True)
    full_name = models.CharField(max_length=100, blank=True, null=True)
    company_name = models.CharField(max_length=100, blank=True, null=True)
    website = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True)
    mobile_number = models.CharField(max_length=20, null=True, blank=True)
    work_number = models.CharField(max_length=20,)
    customer_type = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        choices=USER_TYPES_CHOICE,
        default=BUSINESS,
        verbose_name="Client type",
    )
    business = models.ForeignKey("Business", on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False, verbose_name="Is Active")

    def __str__(self) -> str:
        return f"{self.full_name}"

    @property
    def calculate_open_balance(self):
        pending_invoices = self.invoice_set.filter(invoice_status="PENDING")
        open_balance = sum(invoice.total_amount for invoice in pending_invoices)
        return open_balance


class State(BaseModel):
    name = models.CharField(max_length=100)
    def __str__(self) -> str:
        return f"{self.name}"


class Address(BaseModel):
    BILLING = "Billing"
    SHIPPING = "Shipping"
    ADDRESS_CHOICES = ((SHIPPING, SHIPPING), (BILLING, BILLING))
    state = models.ForeignKey("State", on_delete=models.SET_NULL, null=True, blank=True)
    postal_code = models.CharField(max_length=15)
    type = models.CharField(max_length=15, default=BILLING, choices=ADDRESS_CHOICES)
    address_1 = models.TextField()
    address_2 = models.TextField(blank=True)
    customer = models.ForeignKey("Customer", on_delete=models.CASCADE, related_name="addresses")
