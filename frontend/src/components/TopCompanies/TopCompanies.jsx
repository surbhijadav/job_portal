import "./TopCompanies.css";

const companies = [
  {
    name: "Google",
    jobs: 42,
    logo: "🟡"
  },
  {
    name: "Microsoft",
    jobs: 36,
    logo: "🟦"
  },
  {
    name: "Amazon",
    jobs: 28,
    logo: "🟧"
  },
  {
    name: "Infosys",
    jobs: 31,
    logo: "🔵"
  },
  {
    name: "TCS",
    jobs: 25,
    logo: "🟣"
  },
  {
    name: "Adobe",
    jobs: 18,
    logo: "🔴"
  }
];

function TopCompanies() {
  return (
    <section className="companies">

      <div className="company-title">

        <span>Top Recruiters</span>

        <h2>Companies Hiring Now</h2>

        <p>
          Discover opportunities from leading companies.
        </p>

      </div>

      <div className="company-grid">

        {companies.map((company,index)=>(

          <div className="company-card" key={index}>

            <div className="company-logo">
              {company.logo}
            </div>

            <h3>{company.name}</h3>

            <p>{company.jobs} Open Jobs</p>

            <button>View Jobs</button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default TopCompanies;