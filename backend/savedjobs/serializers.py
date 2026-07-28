from rest_framework import serializers
from .models import SavedJob


class SavedJobSerializer(serializers.ModelSerializer):

    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    company_name = serializers.CharField(
        source="job.company.company_name",
        read_only=True
    )

    company_logo = serializers.ImageField(
        source="job.company.logo",
        read_only=True
    )

    location = serializers.CharField(
        source="job.location",
        read_only=True
    )

    salary = serializers.IntegerField(
        source="job.salary",
        read_only=True
    )

    experience = serializers.CharField(
        source="job.experience",
        read_only=True
    )

    job_type = serializers.CharField(
        source="job.job_type",
        read_only=True
    )

    skills = serializers.CharField(
        source="job.skills",
        read_only=True
    )

    description = serializers.CharField(
        source="job.description",
        read_only=True
    )

    class Meta:
        model = SavedJob
        fields = [
            "id",
            "job",
            "saved_at",
            "job_title",
            "company_name",
            "company_logo",
            "location",
            "salary",
            "experience",
            "job_type",
            "skills",
            "description",
        ]