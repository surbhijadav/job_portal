from rest_framework.response import Response
from rest_framework.decorators import api_view

from candidates.models import CandidateProfile
from jobs.models import Job


@api_view(["GET"])
def match_skills(request):

    results = []

    candidates = CandidateProfile.objects.all()
    jobs = Job.objects.all()

    for candidate in candidates:

        candidate_skills = set(
            skill.strip().lower()
            for skill in candidate.skills.split(",")
            if skill.strip()
        )

        for job in jobs:

            job_skills = set(
                skill.strip().lower()
                for skill in job.skills.split(",")
                if skill.strip()
            )

            matched = candidate_skills & job_skills

            if len(job_skills) == 0:
                score = 0
            else:
                score = round(len(matched) / len(job_skills) * 100, 2)

            results.append({
                "candidate": candidate.user.full_name,
                "job": job.title,
                "matched_skills": list(matched),
                "score": score
            })

    return Response(results)