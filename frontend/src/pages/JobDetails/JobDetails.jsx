import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { applyJob } from "../../services/api";
import "./JobDetails.css";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    api
      .get(`jobs/${id}/`)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching job:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Job...</h2>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="loading">
        <h2>Job Not Found</h2>
      </div>
    );
  }

  const handleApply = async () => {
  setApplying(true);
  setMessage("");

  try {
    await applyJob(job.id);

    setApplied(true);
    setMessage("🎉 Application submitted successfully!");
  } catch (err) {
    setMessage(
      err.response?.data?.detail ||
      "You have already applied for this job."
    );
  } finally {
    setApplying(false);
  }
};

  return (
    <section className="job-details">
      <div className="job-details-card">

        <div className="job-header">
          <div>
            <h1>{job.title}</h1>
            <p>Company ID: {job.company}</p>
          </div>

          <span className="job-type">
            {job.job_type}
          </span>
        </div>

        <div className="job-info">
          <div>📍 {job.location}</div>

          <div>
            💰 ₹ {(job.salary / 100000).toFixed(1)} LPA
          </div>

          <div>
            👨‍💻 {job.experience} Years Experience
          </div>

          <div>
            📅 Deadline: {job.deadline}
          </div>
        </div>

        <h3>Job Description</h3>

        <p className="description">
          {job.description}
        </p>

        <h3>Required Skills</h3>

        <div className="skills">
          {job.skills &&
            job.skills.split(",").map((skill, index) => (
              <span key={index}>
                {skill.trim()}
              </span>
            ))}
        </div>

        <>
  <button
    className="apply-btn"
    onClick={handleApply}
    disabled={applying || applied}
  >
    {applied
      ? "✓ Application Submitted"
      : applying
      ? "Applying..."
      : "Apply Now"}
  </button>

  {message && (
    <p
      style={{
        textAlign: "center",
        marginTop: "18px",
        color: applied ? "#22c55e" : "#facc15",
        fontWeight: "600",
      }}
    >
      {message}
    </p>
  )}
</>

      </div>
    </section>
  );
}

export default JobDetails;