from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "full_name",
        "email",
        "role",
        "email_verified",
        "recruiter_approved",
        "is_active",
    )

    list_filter = (
        "role",
        "email_verified",
        "is_active",
    )

    search_fields = (
        "full_name",
        "email",
    )