from django.db import models
from accounts.models import User


class CandidateProfile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="candidate_profile"
    )

    headline = models.CharField(max_length=200, blank=True)

    bio = models.TextField(blank=True)

    skills = models.TextField(blank=True)

    education = models.TextField(blank=True)

    experience = models.TextField(blank=True)

    github = models.URLField(blank=True)

    linkedin = models.URLField(blank=True)

    portfolio = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.full_name