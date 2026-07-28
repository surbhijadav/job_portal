from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsRecruiterOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        # Anyone can view jobs
        if request.method in SAFE_METHODS:
            return True

        # Only authenticated recruiters can create/update/delete
        return (
            request.user.is_authenticated
            and request.user.role == "recruiter"
        )