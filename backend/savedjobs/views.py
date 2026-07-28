from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import SavedJob
from .serializers import SavedJobSerializer
from jobs.models import Job


class SavedJobViewSet(viewsets.ModelViewSet):

    serializer_class = SavedJobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedJob.objects.filter(
            candidate=self.request.user
        ).select_related(
            "job",
            "job__company"
        )

    def create(self, request, *args, **kwargs):

        job_id = request.data.get("job")

        if not job_id:
            return Response(
                {"error": "Job ID is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            job = Job.objects.get(id=job_id)

        except Job.DoesNotExist:
            return Response(
                {"error": "Job not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        saved_job, created = SavedJob.objects.get_or_create(
            candidate=request.user,
            job=job
        )

        if not created:
            return Response(
                {"error": "Job already saved."},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = self.get_serializer(saved_job)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    def destroy(self, request, *args, **kwargs):

        saved_job = self.get_object()

        saved_job.delete()

        return Response(
            {"message": "Job removed from saved jobs."},
            status=status.HTTP_204_NO_CONTENT
        )