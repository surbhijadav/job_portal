from rest_framework.routers import DefaultRouter
from .views import CandidateProfileViewSet

router = DefaultRouter()
router.register(r'', CandidateProfileViewSet, basename='candidate')

urlpatterns = router.urls