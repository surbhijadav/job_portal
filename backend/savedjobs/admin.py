from django.contrib import admin
from .models import SavedJob


@admin.register(SavedJob)
class SavedJobAdmin(admin.ModelAdmin):

    list_display = (
        "candidate",
        "job",
        "saved_at",
    )

    search_fields = (
        "candidate__full_name",
        "candidate__email",
        "job__title",
    )

    list_filter = (
        "saved_at",
    )

    ordering = (
        "-saved_at",
    )