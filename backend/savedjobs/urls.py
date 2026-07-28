from rest_framework.routers import DefaultRouter
from .views import SavedJobViewSet

router = DefaultRouter()
router.register("", SavedJobViewSet, basename="savedjobs")

urlpatterns = router.urls