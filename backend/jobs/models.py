from django.db import models
from companies.models import Company


class Job(models.Model):

    JOB_TYPES = [
        ("Full Time", "Full Time"),
        ("Part Time", "Part Time"),
        ("Internship", "Internship"),
        ("Remote", "Remote"),
    ]

    title = models.CharField(max_length=200)

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    location = models.CharField(max_length=150)

    salary = models.IntegerField()

    experience = models.CharField(max_length=100)

    job_type = models.CharField(
        max_length=30,
        choices=JOB_TYPES
    )

    description = models.TextField()

    skills = models.TextField()

    deadline = models.DateField()

    created_at = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title