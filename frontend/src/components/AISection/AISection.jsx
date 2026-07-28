import "./AISection.css";

function AISection() {
  return (
    <section className="ai-section">

      <div className="ai-left">

        <span className="ai-badge">
          🤖 AI Recommendation Engine
        </span>

        <h2>
          Let AI Find The
          <span> Perfect Job </span>
          For You
        </h2>

        <p>
          Our intelligent recommendation engine analyzes your skills,
          experience and interests to suggest the most suitable jobs.
        </p>

        <button>
          Try AI Recommendation
        </button>

      </div>

      <div className="ai-right">

        <div className="ai-card">

          <h3>AI Match Score</h3>

          <div className="circle">
            95%
          </div>

          <div className="skill">

            <span>React</span>

            <div className="progress">

              <div
                className="fill"
                style={{width:"95%"}}
              ></div>

            </div>

          </div>

          <div className="skill">

            <span>JavaScript</span>

            <div className="progress">

              <div
                className="fill"
                style={{width:"88%"}}
              ></div>

            </div>

          </div>

          <div className="skill">

            <span>Python</span>

            <div className="progress">

              <div
                className="fill"
                style={{width:"80%"}}
              ></div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default AISection;