from django.db import models
from candidates.models import CandidateProfile
from jobs.models import Job


class AIRecommendation(models.Model):
    candidate = models.ForeignKey(CandidateProfile, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    score = models.FloatField()
    matched_skills = models.TextField()

    def __str__(self):
        return f"{self.candidate} - {self.job}"