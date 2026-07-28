import "./Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">

          <h2>
            AI<span>Hire</span>
          </h2>

          <p>
            AIHire is an intelligent recruitment platform that connects
            talented candidates with top companies using Artificial
            Intelligence.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="#">Home</a>
          <a href="#">Jobs</a>
          <a href="#">Companies</a>
          <a href="#">About</a>

        </div>

        <div className="footer-links">

          <h3>Services</h3>

          <a href="#">AI Recommendation</a>
          <a href="#">Resume Analysis</a>
          <a href="#">Recruitment</a>
          <a href="#">Analytics</a>

        </div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>Ahmedabad, Gujarat</p>

          <p>support@aihire.com</p>

          <p>+91 9876543210</p>

          <div className="socials">

            <FaFacebook />

            <FaInstagram />

            <FaLinkedin />

            <FaGithub />

          </div>

        </div>

      </div>

      <div className="copyright">

        © 2026 AIHire. All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;