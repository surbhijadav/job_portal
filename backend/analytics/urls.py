from django.urls import path
from .views import dashboard, candidate_dashboard

urlpatterns = [
    path("", dashboard),
    path("candidate-dashboard/", candidate_dashboard),
]