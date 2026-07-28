import { useEffect, useState } from "react";
import { getApplications } from "../../services/api";
import "./MyApplications.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "accepted";
      case "rejected":
        return "rejected";
      case "reviewed":
        return "reviewed";
      default:
        return "pending";
    }
  };

  if (loading) {
    return <p className="loading-text">Loading applications...</p>;
  }

  return (
    <div className="applications-section">
      <h2>📋 My Applications</h2>

      {applications.length === 0 ? (
        <p className="empty-text">
          You haven't applied for any jobs yet.
        </p>
      ) : (
        <div className="application-list">
          {applications.map((app) => (
            <div key={app.id} className="application-card">
              <div>
                <h3>{app.job_title}</h3>

                <p>{app.company_name}</p>

                <p>{app.location}</p>
              </div>

              <div className={`status ${getStatusClass(app.status)}`}>
                {app.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;