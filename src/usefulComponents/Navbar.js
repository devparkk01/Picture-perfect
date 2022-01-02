import { Auth } from "aws-amplify";
import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { AppContext } from "../lib/contextLib";

const Navbar = (props) => {
  const { isAuthenticated, setIsAuthenticated , username } = useContext(AppContext);

  const handleLogout = () => {
    if (window.confirm("Are you sure ? ") === true) {
      Auth.signOut();
      setIsAuthenticated(false);
    }
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark static-top"
        style={{ backgroundColor: "#1A2238" }}
      >
        <div className="container">
          <Link className="navbar-brand" style={{ color: "#FF6A3D" }} to="/">
            PICTURE PERFECT
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {!isAuthenticated && (
                  <Link className="nav-link" aria-current="page" to="/login">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {isAuthenticated ? (
                  <Link
                    className="nav-link"
                    aria-current="page"
                    onClick={handleLogout}
                  >
                    Logout({username})
                  </Link>
                ) : (
                  <Link className="nav-link" aria-current="page" to="/signup">
                    Register
                  </Link>

                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
