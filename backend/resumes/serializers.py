from rest_framework import serializers
from .models import Resume

class ResumeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Resume
        fields = ["id", "candidate", "file", "uploaded_at"]
        read_only_fields = ["candidate", "uploaded_at"]