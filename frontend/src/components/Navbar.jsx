// frontend/src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../css/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar-logo">
          SureStep Business Advisors
        </Link>

        {/* Hamburger for mobile */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links */}
        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/services"
              className="nav-links"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className="nav-links"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/events"
              className="nav-links"
              onClick={() => setIsOpen(false)}
            >
              Events
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className="nav-links"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/ai-readiness"
              className="nav-links nav-cta"
              onClick={() => setIsOpen(false)}
            >
              Free AI Readiness Score
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
