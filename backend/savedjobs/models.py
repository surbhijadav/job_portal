from django.db import models
from accounts.models import User
from jobs.models import Job


class SavedJob(models.Model):
    candidate = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="saved_jobs"
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="saved_by"
    )

    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-saved_at"]
        constraints = [
            models.UniqueConstraint(
                fields=["candidate", "job"],
                name="unique_saved_job"
            )
        ]

    def __str__(self):
        return f"{self.candidate.full_name} - {self.job.title}"