import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const profile = await login(
        formData.email,
        formData.password
      );

      if (
        profile.role === "recruiter" ||
        profile.role === "admin"
      ) {
        navigate("/recruiter-dashboard");
      } else {
        navigate("/candidate-dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">

      <div className="bg-circle circle1"></div>
      <div className="bg-circle circle2"></div>

      <div className="login-card">

        <div className="login-header">

          <h1>Welcome Back 👋</h1>

          <p>
            Login to continue your AI Recruitment journey.
          </p>

        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

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

            <label>Password</label>

            <div className="password-box">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>

          <div className="options">

            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <Link to="#">
              Forgot Password?
            </Link>

          </div>

          <button
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

        <div className="divider">
          OR
        </div>

        <div className="social-buttons">

          <button type="button">
            Google
          </button>

          <button type="button">
            GitHub
          </button>

        </div>

        <div className="bottom-text">

          Don't have an account?

          <Link to="/register">
            Register
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Login;