import "./Categories.css";

const categories = [
  {
    icon: "💻",
    title: "Software Development",
    jobs: "120 Jobs",
    color: "#6C63FF",
  },
  {
    icon: "🎨",
    title: "UI / UX Design",
    jobs: "48 Jobs",
    color: "#FF6B81",
  },
  {
    icon: "📊",
    title: "Data Science",
    jobs: "95 Jobs",
    color: "#00C9A7",
  },
  {
    icon: "☁️",
    title: "Cloud Computing",
    jobs: "64 Jobs",
    color: "#3B82F6",
  },
  {
    icon: "📱",
    title: "Mobile Development",
    jobs: "73 Jobs",
    color: "#F59E0B",
  },
  {
    icon: "🤖",
    title: "Artificial Intelligence",
    jobs: "54 Jobs",
    color: "#8B5CF6",
  },
  {
    icon: "🛡️",
    title: "Cyber Security",
    jobs: "41 Jobs",
    color: "#EF4444",
  },
  {
    icon: "📈",
    title: "Marketing",
    jobs: "82 Jobs",
    color: "#10B981",
  },
];

function Categories() {
  return (
    <section className="categories">

      <div className="category-heading">

        <span>Browse Categories</span>

        <h2>Choose Your Career Path</h2>

        <p>
          Explore thousands of jobs across the most popular industries.
        </p>

      </div>

      <div className="category-grid">

        {categories.map((item, index) => (

          <div
            className="category-card"
            key={index}
            style={{ "--clr": item.color }}
          >

            <div className="category-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.jobs}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Categories;