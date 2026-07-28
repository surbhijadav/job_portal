from rest_framework import serializers


class AnalyticsSerializer(serializers.Serializer):
    total_jobs = serializers.IntegerField()
    active_jobs = serializers.IntegerField()
    total_candidates = serializers.IntegerField()
    total_recruiters = serializers.IntegerField()
    total_applications = serializers.IntegerField()
    total_notifications = serializers.IntegerField()
    total_recommendations = serializers.IntegerField()