import { useState, useEffect } from "react";
import {
  getRecruiterJobs,
  postJob,
  updateJob,
  deleteJob,
} from "../../services/api";
import "./RecruiterDashboard.css";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingJob, setEditingJob] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    job_type: "Full Time",
    location: "",
    salary: "",
    experience: "",
    description: "",
    skills: "",
    deadline: ""
  });

  const fetchJobs = async () => {
    try {
      const data = await getRecruiterJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) return;

  try {

    await deleteJob(id);

    setJobs(jobs.filter(job => job.id !== id));

  } catch (err) {

    alert("Failed to delete job.");

    console.error(err);

  }

};

const handleEdit = (job) => {

  setEditingJob(job);

  setFormData({
    title: job.title,
    job_type: job.job_type,
    location: job.location,
    salary: job.salary,
    experience: job.experience,
    description: job.description,
    skills: job.skills,
    deadline: job.deadline,
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

};

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {

  if (editingJob) {

    await updateJob(editingJob.id, formData);

    setSuccess("Job updated successfully!");

  } else {

    await postJob(formData);

    setSuccess("Job posted successfully!");

  }

  setEditingJob(null);

  setFormData({
    title: "",
    job_type: "Full Time",
    location: "",
    salary: "",
    experience: "",
    description: "",
    skills: "",
    deadline: "",
  });

  fetchJobs();

} catch (err) {

  setError(
    err.response?.data?.detail ||
    "Operation failed."
  );

}finally {
      setLoading(false);
    }
  };

  return (
    <div className="container dashboard-container">
      <div className="dashboard-header">
        <h1>Recruiter Dashboard</h1>
        <p>Manage your job postings and find the best AI-matched talent.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{jobs.length}</h3>
          <p>Active Postings</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>Total Applicants</p>
        </div>
        <div className="stat-card">
          <h3>0</h3>
          <p>AI Matches Found</p>
        </div>
      </div>

      <div className="glass-panel">
        <h2>📝 Post a New Job</h2>
        
        <form className="job-form" onSubmit={handleSubmit}>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <div className="form-group">
            <label>Job Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Senior React Developer" />
          </div>

          <div className="form-group">
            <label>Job Type</label>
            <select name="job_type" value={formData.job_type} onChange={handleChange}>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Remote, New York" />
          </div>

          <div className="form-group">
            <label>Salary (Yearly in ₹)</label>
            <input type="number" name="salary" value={formData.salary} onChange={handleChange} required placeholder="e.g. 1500000" />
          </div>

          <div className="form-group">
            <label>Experience Needed</label>
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} required placeholder="e.g. 2-3 Years" />
          </div>

          <div className="form-group full-width">
            <label>Skills Required (comma separated)</label>
            <input type="text" name="skills" value={formData.skills} onChange={handleChange} required placeholder="e.g. React, Node.js, Python" />
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" placeholder="Describe the role..."></textarea>
          </div>

          <div className="form-group full-width">
            <label>Application Deadline</label>
            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading
  ? "Saving..."
  : editingJob
  ? "Update Job ✏️"
  : "Publish Job 🚀"}
          </button>
        </form>
      </div>

      <div className="glass-panel">
        <h2>🏢 My Job Postings</h2>
        
        {jobs.length > 0 ? (
          <div className="job-list">
            {jobs.map(job => (
              <div key={job.id} className="job-list-item">
                <div className="job-info">
                  <h3>{job.title}</h3>
                  <p>{job.location} • {job.job_type} • Created recently</p>
                </div>
                <div className="job-actions">

  <button className="view-btn">
    Applicants
  </button>

<button
  className="edit-btn"
  onClick={() => handleEdit(job)}
>
  Edit
</button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(job.id)}
  >
    Delete
  </button>

</div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "#a0aabf", textAlign: "center", padding: "20px 0" }}>
            You haven't posted any jobs yet.
          </p>
        )}
      </div>

    </div>
  );
}

export default RecruiterDashboard;
