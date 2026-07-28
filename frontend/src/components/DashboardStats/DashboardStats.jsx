import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaBookmark,
  FaFileAlt,
  FaRobot,
} from "react-icons/fa";

import { getDashboardStats } from "../../services/api";
import "./DashboardStats.css";

export default function DashboardStats() {

  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!stats) return null;

  return (
    <div className="stats-grid">

      <div className="stat-card">
        <FaBriefcase />
        <h2>{stats.applications}</h2>
        <p>Applications</p>
      </div>

      <div className="stat-card">
        <FaBookmark />
        <h2>{stats.saved_jobs}</h2>
        <p>Saved Jobs</p>
      </div>

      <div className="stat-card">
        <FaFileAlt />
        <h2>{stats.resume_uploaded ? "✓" : "✕"}</h2>
        <p>Resume</p>
      </div>

      <div className="stat-card">
        <FaRobot />
        <h2>{stats.recommendations}</h2>
        <p>AI Matches</p>
      </div>

    </div>
  );
}