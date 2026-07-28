from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Resume
from .serializers import ResumeSerializer
from candidates.models import CandidateProfile


class ResumeViewSet(viewsets.ModelViewSet):
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return Resume.objects.filter(candidate__user=self.request.user)

    def perform_create(self, serializer):
        candidate, _ = CandidateProfile.objects.get_or_create(user=self.request.user)
        serializer.save(candidate=candidate)