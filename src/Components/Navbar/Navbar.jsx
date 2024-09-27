import React, { useState, useEffect, useRef } from "react";
import { CgSearch } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { BsCart } from "react-icons/bs";
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import "./navbar.css"
import { FaBars, FaCross, FaPowerOff } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {

  const move = useNavigate();
  const cu = useSelector((store) => store.userSection.cu);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true)

  function toggleNav() {
    setOpen(!open)
  }


  function Logout() {
    dispatch({
      type: "LOGOUT_USER",
    });
    move("/login");
  }


  return <>
    <nav className="navbar navbar-expand-lg navbar-expand-md" style={{ backgroundColor: "#F2F0F1" }}>
      <div className="container-fluid px-lg-5 px-sm-2">
        <a className="navbar-brand" href="/">
          <img src="/logo.png" alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {open ? <FaBars /> : <RxCross2 />}
        </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Shop
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/review">
                Reviews
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact Us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/faqs">
                Faq's
              </NavLink>
            </li>
          </ul>
          <div className="navbar_right d-flex no-wrap gap-0 fs-3">
            <NavLink
              className="nav-link d-block d-sm-none"
              to={`/cart/${cu._id}`}
            ><CgSearch />
            </NavLink>
            {cu.role != "admin" &&
              <NavLink
                className="nav-link"
                to={`/cart/${cu._id}`}
              ><BsCart />
              </NavLink>
            }
            {cu.role === "admin" &&
              <NavLink
                className="nav-link"
                onClick={Logout}>
                <FaPowerOff />
              </NavLink>
            }
            {cu._id &&
              <>
                <NavLink
                  className="nav-link"
                  to={cu?.role === "admin" ? `/admin-dashboard` : `/user-profile/${cu._id}`}
                ><CgProfile />
                </NavLink>
              </>
            }
            {!cu._id &&
              <NavLink
                className="nav-link"
                to="/login"
              >
                <CgProfile />
              </NavLink>
            }
          </div>
        </div>
      </div>
    </nav>


  </>
}

export default Navbar