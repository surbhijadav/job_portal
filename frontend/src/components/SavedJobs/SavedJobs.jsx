import { useEffect, useState } from "react";
import { FaBookmark, FaTrash } from "react-icons/fa";
import { getSavedJobs, removeSavedJob } from "../../services/api";
import "./SavedJobs.css";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const loadSavedJobs = async () => {
    try {
      const data = await getSavedJobs();
      setSavedJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeSavedJob(id);

      setSavedJobs((prev) =>
        prev.filter((job) => job.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to remove saved job.");
    }
  };

  if (loading) {
    return <p className="loading-text">Loading saved jobs...</p>;
  }

  return (
    <div className="saved-section">
      <h2>
        <FaBookmark /> Saved Jobs
      </h2>

      {savedJobs.length === 0 ? (
        <p className="empty-text">
          You haven't saved any jobs yet.
        </p>
      ) : (
        <div className="saved-grid">
          {savedJobs.map((job) => (
            <div className="saved-card" key={job.id}>
              <div>
                <h3>{job.job_title}</h3>

                <p>{job.company_name}</p>

                <p>{job.location}</p>

                <p>₹{Number(job.salary).toLocaleString("en-IN")}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(job.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedJobs;