import { useState, useRef } from "react";
import { uploadResume, getRecommendations } from "../../services/api";
import JobCard from "../../components/JobCard/JobCard";
import "./CandidateDashboard.css";
import MyApplications from "../../components/MyApplications/MyApplications";
import SavedJobs from "../../components/SavedJobs/SavedJobs";
import DashboardStats from "../../components/DashboardStats/DashboardStats";

function CandidateDashboard() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingJobs, setFetchingJobs] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setError(null);
    }
  };

  const fetchRecommendations = async () => {
    setFetchingJobs(true);
    try {
      const data = await getRecommendations();
      setRecommendedJobs(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch recommended jobs.");
    } finally {
      setFetchingJobs(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await uploadResume(file);
      setSuccess("Resume analyzed successfully! Fetching AI recommendations...");
      // Once uploaded, automatically fetch new recommendations
      await fetchRecommendations();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to upload resume. Ensure it's a valid PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container dashboard-container">
      <div className="dashboard-header">
        <h1>Candidate Dashboard</h1>
        <p>Your centralized hub for AI-driven career growth.</p>
      </div>
      <DashboardStats />

      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}

      <div className="glass-panel">
        <h2>📄 AI Resume Analysis</h2>
        <p style={{ color: "#a0aabf", marginBottom: "20px" }}>
          Upload your latest resume (PDF). Our AI will analyze your skills and experience to find the perfect jobs for you.
        </p>

        <div 
          className={`upload-area ${dragOver ? "dragover" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            className="file-input" 
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
          <div className="upload-label">
            <div className="upload-icon">☁️</div>
            <div className="upload-text">
              {file ? file.name : "Drag & Drop your resume here, or Click to browse"}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <button 
            className="upload-btn" 
            onClick={handleUpload} 
            disabled={loading || !file}
          >
            {loading ? "Analyzing..." : "Analyze Resume ✨"}
          </button>
        </div>
      </div>

      <div className="glass-panel">
        <h2>🎯 AI Recommended Jobs</h2>
        
        {loading || fetchingJobs ? (
          <div className="loader">
            <div className="spinner"></div>
            <p>Our AI is scanning jobs for you...</p>
          </div>
        ) : recommendedJobs.length > 0 ? (
          <div className="candidate-job-grid">
            {recommendedJobs.map((item) => (
              // Item might have { id, job, score } depending on recommendation model
              <JobCard key={item.id} job={item.job} />
            ))}
          </div>
        ) : (
          <p style={{ color: "#a0aabf", textAlign: "center", padding: "40px 0" }}>
            Upload your resume to receive personalized job matches!
          </p>
        )}
      </div>
<SavedJobs />
<MyApplications />
    </div>
  );
}

export default CandidateDashboard;
