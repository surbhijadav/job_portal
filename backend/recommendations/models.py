# pyrefly: ignore [missing-import]
from django.db import models
from candidates.models import CandidateProfile
from jobs.models import Job


class Recommendation(models.Model):
    candidate = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    score = models.FloatField(default=0)

    def __str__(self):
        return f"{self.candidate.user.full_name} -> {self.job.title}"