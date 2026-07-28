import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container" style={{ paddingTop: "150px", color: "white", textAlign: "center" }}>
      <h1 style={{ fontSize: "5rem", marginBottom: "20px" }}>404</h1>
      <h2>Page Not Found</h2>
      <p style={{ margin: "20px 0" }}>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" style={{ padding: "10px 20px", background: "linear-gradient(90deg, #00f2fe, #4facfe)", color: "white", textDecoration: "none", borderRadius: "5px" }}>Go Home</Link>
    </div>
  );
}

export default NotFound;
