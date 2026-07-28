import "./Testimonials.css";

const reviews = [
  {
    name: "Rahul Patel",
    role: "Frontend Developer",
    text: "The AI recommendation system helped me find a React Developer role within a week.",
    image: "👨🏻‍💻"
  },
  {
    name: "Priya Shah",
    role: "UI/UX Designer",
    text: "Beautiful platform and accurate job recommendations. Much better than searching manually.",
    image: "👩🏻‍🎨"
  },
  {
    name: "Amit Kumar",
    role: "Python Developer",
    text: "The skill matching feature showed exactly which jobs matched my profile.",
    image: "👨🏻‍💼"
  }
];

function Testimonials() {
  return (
    <section className="testimonials">

      <div className="testimonial-heading">

        <span>Testimonials</span>

        <h2>What Our Users Say</h2>

        <p>
          Thousands of professionals trust AIHire to discover their next career opportunity.
        </p>

      </div>

      <div className="testimonial-grid">

        {reviews.map((review,index)=>(

          <div className="testimonial-card" key={index}>

            <div className="avatar">
              {review.image}
            </div>

            <div className="stars">
              ⭐⭐⭐⭐⭐
            </div>

            <p className="review">
              "{review.text}"
            </p>

            <h3>{review.name}</h3>

            <span>{review.role}</span>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Testimonials;