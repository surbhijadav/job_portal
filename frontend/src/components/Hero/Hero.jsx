import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSearch = () => {

    const params = new URLSearchParams();

    if (search.trim()) {
      params.append("search", search);
    }

    if (location.trim()) {
      params.append("location", location);
    }

    navigate(`/jobs?${params.toString()}`);

  };

  const handleHireTalent = () => {

    // Not logged in
    if (!user) {
      navigate("/login");
      return;
    }

    // Recruiter
    if (user.role === "recruiter") {
      navigate("/recruiter-dashboard");
      return;
    }

    // Admin
    if (user.role === "admin") {
      navigate("/admin-dashboard");
      return;
    }

    // Candidate
    navigate("/register");

  };

  return (

    <section className="hero">

      <div className="hero-left">

        <span className="badge">
          🚀 AI Powered Recruitment
        </span>

        <h1>
          Find Your
          <span> Dream Job </span>
          With AI
        </h1>

        <p>
          Discover jobs perfectly matched to your skills using
          Artificial Intelligence.
        </p>

        <div className="hero-search">

          <input
            type="text"
            placeholder="Search Job..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>

        </div>

        <div className="hero-buttons">

          <button
            className="primary"
            onClick={() => navigate("/jobs")}
          >
            Find Jobs
          </button>

          <button
            className="secondary"
            onClick={handleHireTalent}
          >
            Hire Talent
          </button>

        </div>

      </div>

      <div className="hero-right">

        <div className="glass-card">

          🤖

          <h3>AI Matching</h3>

          <p>95% Accuracy</p>

        </div>

      </div>

    </section>

  );

}

export default Hero;