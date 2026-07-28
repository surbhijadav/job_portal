
from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    company = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Job
        fields = "__all__"