import { Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaStar,
  FaRobot,
  FaBookmark,
} from "react-icons/fa";

import "./JobCard.css";
import { applyJob } from "../../services/api";

function JobCard({ job }) {
  const navigate = useNavigate();

  const aiMatch = Math.floor(Math.random() * 7) + 93;

  const skills = job.skills?.split(",") || [];

  const user = JSON.parse(localStorage.getItem("user"));

  const handleApply = async () => {
    // Not Logged In
    if (!user) {
      navigate("/login");
      return;
    }

    // Only Candidates Can Apply
    if (user.role !== "candidate") {
      alert("Only candidates can apply for jobs.");
      return;
    }

    try {
      await applyJob(job.id);

      alert("🎉 Application submitted successfully!");
    } catch (err) {
      if (err.response?.status === 400) {
        alert("You have already applied for this job.");
      } else {
        console.error(err);
        alert("Unable to apply. Please try again.");
      }
    }
  };

  return (
    <div className="job-card">
      <div className="job-left">
        <div className="company-logo">
          {(job.company_name || "AI").charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="job-center">
        <div className="job-header">
          <div>
            <h2>{job.title}</h2>

            <p className="company-name">
              {job.company_name || "AIHire Technologies"}
            </p>
          </div>

          <button className="bookmark-btn">
            <FaBookmark />
          </button>
        </div>

        <div className="job-meta">
          <span>
            <FaMapMarkerAlt />
            {job.location}
          </span>

          <span>
            <FaBriefcase />
            {job.job_type}
          </span>

          <span>
            <FaMoneyBillWave />₹
            {Number(job.salary).toLocaleString("en-IN")}
          </span>

          <span>
            <FaStar />
            {job.experience} Years
          </span>
        </div>

        <div className="skills">
          {skills.map((skill, index) => (
            <span key={index}>{skill.trim()}</span>
          ))}
        </div>

        <p className="description">{job.description}</p>

        <div className="bottom-row">
          <span className="posted">Posted Recently</span>

          <div className="buttons">
            <Link to={`/jobs/${job.id}`} className="details-btn">
              View Details
            </Link>

            <button className="apply-btn" onClick={handleApply}>
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <div className="job-right">
        <div className="match-box">
          <FaRobot />

          <h2>{aiMatch}%</h2>

          <p>AI Match</p>
        </div>
      </div>
    </div>
  );
}

export default JobCard;