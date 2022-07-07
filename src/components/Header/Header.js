import React from "react";

const Header = ({ theme }) => {
  return (
    <div>
      <nav
        className={
          theme
            ? "navbar navbar-expand-lg navbar-dark bg-dark"
            : "navbar navbar-expand-lg navbar-light bg-light"
        }
      >
        <div className="container-fluid ">
          <a className="navbar-brand" href="#">
            Navbar
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>

              {/* <AddNewUser /> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
