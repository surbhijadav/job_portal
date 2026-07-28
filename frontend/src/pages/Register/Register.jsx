import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRole = (role) => {
    setFormData({
      ...formData,
      role,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await registerUser(formData);

      alert("Registration Successful!");

      navigate("/login");

    } catch (err) {

      console.error(err);

      if (err.response?.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Registration Failed");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-page">

      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>

      <div className="register-card">

        <div className="register-header">

          <h1>Create Account</h1>

          <p>Join our AI Job Portal</p>

        </div>

        {error && (
          <p style={{ color: "#ef4444", marginBottom: "20px" }}>
            {error}
          </p>
        )}

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">

            <label>Full Name</label>

            <input
              type="text"
              name="full_name"
              placeholder="Enter your full name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="input-group">

            <label>Phone</label>

            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>

          <div className="role-section">

            <label>Select Role</label>

            <div className="role-options">

              <div
                className={
                  formData.role === "candidate"
                    ? "role-card active"
                    : "role-card"
                }
                onClick={() => handleRole("candidate")}
              >
                👨‍💻
                <span>Candidate</span>
              </div>

              <div
                className={
                  formData.role === "recruiter"
                    ? "role-card active"
                    : "role-card"
                }
                onClick={() => handleRole("recruiter")}
              >
                🏢
                <span>Recruiter</span>
              </div>

            </div>

          </div>

          <div className="terms">

            <input type="checkbox" required />

            <span>
              I agree to the Terms & Conditions
            </span>

          </div>

          <button
            className="register-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <div className="bottom-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Register;