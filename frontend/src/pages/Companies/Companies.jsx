import { useEffect, useState } from "react";
import { FaSearch, FaBuilding } from "react-icons/fa";
import "./Companies.css";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Dummy data for now.
    // We'll replace this with the Django API later.
    setCompanies([
      {
        id: 1,
        name: "Google",
        industry: "Technology",
        location: "Ahmedabad",
        employees: "10,000+",
        jobs: 24,
        description: "Build products used by billions of people."
      },
      {
        id: 2,
        name: "Microsoft",
        industry: "Software",
        location: "Remote",
        employees: "220,000+",
        jobs: 18,
        description: "Empowering every person and organization."
      },
      {
        id: 3,
        name: "OpenAI",
        industry: "Artificial Intelligence",
        location: "Hybrid",
        employees: "3,000+",
        jobs: 12,
        description: "Creating safe and beneficial AI."
      }
    ]);
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="companies-page">

      <div className="companies-container">

        <h1 className="companies-title">
          Discover Top Companies
        </h1>

        <p className="companies-subtitle">
          Find the world's best employers and explore exciting career opportunities.
        </p>

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search companies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="companies-grid">

          {filteredCompanies.map((company) => (

            <div className="company-card" key={company.id}>

              <div className="company-logo">
                <FaBuilding />
              </div>

              <h2>{company.name}</h2>

              <span className="industry">
                {company.industry}
              </span>

              <p className="location">
                📍 {company.location}
              </p>

              <p className="employees">
                👥 {company.employees} Employees
              </p>

              <p className="jobs">
                💼 {company.jobs} Open Jobs
              </p>

              <p className="description">
                {company.description}
              </p>

              <div className="company-buttons">
                <button className="view-btn">
                  View Company
                </button>

                <button className="jobs-btn">
                  View Jobs
                </button>
              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Companies;