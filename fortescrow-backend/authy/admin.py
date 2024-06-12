from django.contrib import admin

from authy.models import *
# Register your models here.
admin.site.register(User)
admin.site.register(UserOTP)
admin.site.register(Profile)
admin.site.register(Business)
admin.site.register(Customer)
admin.site.register(State)
admin.site.register(Address)