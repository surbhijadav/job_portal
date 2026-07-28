import { useEffect, useState } from "react";
import api from "../../services/api";
import "./FeaturedJobs.css";
import JobCard from "../JobCard/JobCard";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api
      .get("jobs/")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="featured-section">
      <div className="featured-container">

        <h2 className="section-title">
          Featured Jobs
        </h2>

        <p className="section-subtitle">
          AI Recommended Opportunities
        </p>

        <div className="job-grid">

          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}

        </div>

      </div>
    </section>
  );
}