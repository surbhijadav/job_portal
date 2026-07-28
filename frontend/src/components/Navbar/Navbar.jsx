import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const dashboardRoute =
    user?.role === "recruiter"
      ? "/recruiter-dashboard"
      : user?.role === "admin"
      ? "/admin-dashboard"
      : "/candidate-dashboard";

  return (
    <header className="navbar">
      <div className="logo">
        <NavLink to="/">
          AI<span>Hire</span>
        </NavLink>
      </div>

      <nav>
        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/jobs">Jobs</NavLink>
          </li>

          <li>
            <NavLink to="/companies">Companies</NavLink>
          </li>

          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>

      {!isAuthenticated ? (
        <div className="nav-buttons">
          <NavLink to="/login" className="login-btn">
            Login
          </NavLink>

          <NavLink to="/register" className="register-btn">
            Register
          </NavLink>
        </div>
      ) : (
        <div className="user-menu">

          <div className="user-avatar">
            {user?.full_name?.charAt(0).toUpperCase()}
          </div>

          <span className="user-name">
            {user?.full_name}
          </span>

          <NavLink
            to={dashboardRoute}
            className="dashboard-btn"
          >
            Dashboard
          </NavLink>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      )}
    </header>
  );
}

export default Navbar;