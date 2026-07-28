from rest_framework.routers import DefaultRouter
from .views import RecommendationViewSet

router = DefaultRouter()
router.register("", RecommendationViewSet)

urlpatterns = router.urls