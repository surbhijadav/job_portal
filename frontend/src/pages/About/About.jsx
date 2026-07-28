import {
  FaRobot,
  FaBullseye,
  FaUsers,
  FaBriefcase,
  FaCheckCircle
} from "react-icons/fa";

import "./About.css";

function About() {
  return (
    <section className="about-page">

      <div className="about-container">

        {/* Hero */}

        <div className="about-hero">

          <span className="about-badge">
            AI Powered Recruitment Platform
          </span>

          <h1>
            Transforming Hiring with Artificial Intelligence
          </h1>

          <p>
            AIHire is a modern recruitment platform that connects talented
            candidates with leading companies using intelligent job matching,
            resume analysis, and AI-powered recommendations.
          </p>

        </div>

        {/* Mission */}

        <div className="about-grid">

          <div className="about-card">

            <FaBullseye />

            <h2>Our Mission</h2>

            <p>
              To simplify recruitment through intelligent technology,
              helping recruiters hire faster and candidates discover
              careers that truly match their skills.
            </p>

          </div>

          <div className="about-card">

            <FaRobot />

            <h2>AI Matching</h2>

            <p>
              Our recommendation engine analyzes resumes, skills and
              job requirements to suggest the best opportunities with
              an AI match score.
            </p>

          </div>

          <div className="about-card">

            <FaUsers />

            <h2>For Candidates</h2>

            <p>
              Upload your resume, receive AI recommendations,
              explore companies and apply for jobs with ease.
            </p>

          </div>

          <div className="about-card">

            <FaBriefcase />

            <h2>For Recruiters</h2>

            <p>
              Post jobs, manage applications and discover qualified
              candidates through an intelligent recruitment workflow.
            </p>

          </div>

        </div>

        {/* Features */}

        <div className="features-section">

          <h2>Platform Features</h2>

          <div className="feature-list">

            <div><FaCheckCircle /> AI Job Recommendations</div>
            <div><FaCheckCircle /> Resume Upload</div>
            <div><FaCheckCircle /> Smart Resume Matching</div>
            <div><FaCheckCircle /> Recruiter Dashboard</div>
            <div><FaCheckCircle /> Candidate Dashboard</div>
            <div><FaCheckCircle /> Company Directory</div>
            <div><FaCheckCircle /> Secure Authentication</div>
            <div><FaCheckCircle /> Responsive Modern Interface</div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;