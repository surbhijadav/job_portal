import "./Stats.css";

function Stats() {
  const stats = [
    { number: "500+", title: "Jobs Posted" },
    { number: "120+", title: "Companies" },
    { number: "1500+", title: "Candidates" },
    { number: "95%", title: "AI Match Accuracy" },
  ];

  return (
    <section className="stats">

      {stats.map((item, index) => (
        <div className="stat-card" key={index}>
          <h1>{item.number}</h1>
          <p>{item.title}</p>
        </div>
      ))}

    </section>
  );
}

export default Stats;