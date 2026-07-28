from django.db import models
from recruiters.models import RecruiterProfile


class Company(models.Model):

    recruiter = models.OneToOneField(
        RecruiterProfile,
        on_delete=models.CASCADE
    )

    company_name = models.CharField(max_length=200)

    website = models.URLField(blank=True)

    location = models.CharField(max_length=150)

    description = models.TextField()

    logo = models.ImageField(
        upload_to="company_logos/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.company_name