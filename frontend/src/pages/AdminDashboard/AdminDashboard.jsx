import {
  FaUsers,
  FaBuilding,
  FaBriefcase,
  FaFileAlt,
  FaChartLine,
  FaUserShield,
  FaCog
} from "react-icons/fa";

import "./AdminDashboard.css";

function AdminDashboard() {

  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      icon: <FaUsers />
    },
    {
      title: "Companies",
      value: "142",
      icon: <FaBuilding />
    },
    {
      title: "Jobs Posted",
      value: "586",
      icon: <FaBriefcase />
    },
    {
      title: "Applications",
      value: "3,814",
      icon: <FaFileAlt />
    }
  ];

  return (

    <section className="admin-page">

      <div className="admin-container">

        <div className="admin-header">

          <div>

            <h1>Admin Dashboard</h1>

            <p>
              Manage users, recruiters, jobs and monitor AI recruitment analytics.
            </p>

          </div>

          <button className="admin-btn">

            <FaCog />

            Settings

          </button>

        </div>

        <div className="stats-grid">

          {stats.map((item, index) => (

            <div className="stat-card" key={index}>

              <div className="stat-icon">

                {item.icon}

              </div>

              <div>

                <h2>{item.value}</h2>

                <p>{item.title}</p>

              </div>

            </div>

          ))}

        </div>

        <div className="dashboard-grid">

          <div className="panel">

            <h2>
              <FaBriefcase />
              Recent Jobs
            </h2>

            <table>

              <thead>

                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>Google</td>
                  <td>React Developer</td>
                  <td className="active">Active</td>
                </tr>

                <tr>
                  <td>Microsoft</td>
                  <td>Python Developer</td>
                  <td className="active">Active</td>
                </tr>

                <tr>
                  <td>OpenAI</td>
                  <td>AI Engineer</td>
                  <td className="closed">Closed</td>
                </tr>

              </tbody>

            </table>

          </div>

          <div className="panel">

            <h2>

              <FaUserShield />

              Platform Overview

            </h2>

            <div className="overview">

              <div>

                <span>Recruiters</span>

                <strong>128</strong>

              </div>

              <div>

                <span>Candidates</span>

                <strong>1120</strong>

              </div>

              <div>

                <span>Companies</span>

                <strong>142</strong>

              </div>

              <div>

                <span>AI Matches Today</span>

                <strong>1,584</strong>

              </div>

            </div>

          </div>

        </div>

        <div className="analytics-card">

          <h2>

            <FaChartLine />

            AI Recruitment Analytics

          </h2>

          <p>

            Charts showing job trends, application growth,
            recruiter activity and AI recommendation accuracy
            will appear here.

          </p>

        </div>

      </div>

    </section>

  );

}

export default AdminDashboard;