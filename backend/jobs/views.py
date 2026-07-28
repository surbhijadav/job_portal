from rest_framework import viewsets

from .models import Job
from .serializers import JobSerializer
from .permissions import IsRecruiterOrReadOnly


class JobViewSet(viewsets.ModelViewSet):

    # Required by DRF Router
    queryset = Job.objects.all()

    serializer_class = JobSerializer

    permission_classes = [IsRecruiterOrReadOnly]

    def get_queryset(self):

        queryset = Job.objects.all().order_by("-created_at")

        user = self.request.user

        # Show only logged-in recruiter's jobs
        if (
            user.is_authenticated
            and getattr(user, "role", None) == "recruiter"
            and self.action == "list"
        ):
            queryset = queryset.filter(
                company__recruiter__user=user
            )

        return queryset

    def perform_create(self, serializer):

        user = self.request.user

        # Create Recruiter Profile if it doesn't exist
        if not hasattr(user, "recruiter_profile"):

            from recruiters.models import RecruiterProfile
            from companies.models import Company

            profile = RecruiterProfile.objects.create(
                user=user,
                designation="Recruiter",
                phone="0000000000",
            )

            company = Company.objects.create(
                recruiter=profile,
                company_name=f"{user.full_name}'s Company",
                location="HQ",
                description="Tech Company",
            )

        else:

            profile = user.recruiter_profile

            # Create Company if it doesn't exist
            if not hasattr(profile, "company"):

                from companies.models import Company

                company = Company.objects.create(
                    recruiter=profile,
                    company_name=f"{user.full_name}'s Company",
                    location="HQ",
                    description="Tech Company",
                )

            else:
                company = profile.company

        serializer.save(company=company)