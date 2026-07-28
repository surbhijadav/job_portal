from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from jobs.models import Job
from candidates.models import CandidateProfile
from recruiters.models import RecruiterProfile
from applications.models import Application
from notifications.models import Notification
from recommendations.models import Recommendation
from resumes.models import Resume
from savedjobs.models import SavedJob


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard(request):

    data = {
        "total_jobs": Job.objects.count(),
        "active_jobs": Job.objects.filter(is_active=True).count(),
        "total_candidates": CandidateProfile.objects.count(),
        "total_recruiters": RecruiterProfile.objects.count(),
        "total_applications": Application.objects.count(),
        "total_notifications": Notification.objects.count(),
        "total_recommendations": Recommendation.objects.count(),
    }

    return Response(data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def candidate_dashboard(request):

    try:
        profile = CandidateProfile.objects.get(user=request.user)
    except CandidateProfile.DoesNotExist:
        return Response(
            {
                "applications": 0,
                "saved_jobs": 0,
                "resume_uploaded": False,
                "recommendations": 0,
            }
        )

    data = {
        "applications": Application.objects.filter(
            candidate=request.user
        ).count(),

        "saved_jobs": SavedJob.objects.filter(
            candidate=request.user
        ).count(),

        "resume_uploaded": Resume.objects.filter(
            candidate=profile
        ).exists(),

        "recommendations": Recommendation.objects.filter(
            candidate=profile
        ).count(),
    }

    return Response(data)