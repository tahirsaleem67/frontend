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
  const [open, setOpen] = useState(false);
  const sideNavRef = useRef(null); // To reference the side nav element

  const toggleNav = () => {
    setOpen(!open);
  };

  // Handle clicks outside the sidebar
  const handleClickOutside = (event) => {
    if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
      setOpen(false); // Close the sidebar if clicked outside
    }
  };

  useEffect(() => {
    if (open) {
      // Add event listener when sidebar is open
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove event listener when sidebar is closed
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener when the component unmounts or sidebar closes
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);
  function Logout() {
    dispatch({
      type: "LOGOUT_USER",
    });
    move("/login");
  }


  return <>
    {/* For large screen */}
    <div className="container-fluid px-5 py-2 navbar_display" style={{ backgroundColor: "#F2F0F1" }}>
      <div className="row">
        <div className="col-lg-2 col-sm-2 d-flex no-wrap align-items-center ">
          <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="" />
          </a>
        </div>
        <div className="col-lg-8 col-md-8 d-flex no-wrap align-items-center justify-content-center gap-5 fs-5">
          <div>
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </div>
          <div>
            <NavLink className="nav-link" to="/products">
              Shop
            </NavLink>
          </div>
          <div>
            <NavLink className="nav-link" to="/review">
              Reviews
            </NavLink>
          </div>
          <div>
            <NavLink className="nav-link" to="/contact">
              Contact Us
            </NavLink>
          </div>
          {/* <div>
              <NavLink className="nav-link" to="/faqs">
                Faq's
              </NavLink>
            </div> */}
        </div>
        <div className="col-lg-2 col-md-2  d-flex justify-content-end align-items-center">
          <div className="navbar_right d-flex no-wrap gap-0 fs-3">
            <NavLink
              className="nav-"
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
    </div>
    {/* Large screen end */}

    {/* For small screen */}

    <div className="container-fluid p-2 navbar_small" style={{ backgroundColor: "#F2F0F1" }}>
      <div className="row">
        <div className="col-2 d-flex justify-content-start align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNav}
          >
            {open ? <RxCross2 /> : <FaBars />}
          </button>
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <a className="navbar-brand" href="/">
            <img src="/logo.png" alt="" />
          </a>
        </div>
        <div className="col-4 small_nav_btn ">
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
    </div>

    {open && (
        <div ref={sideNavRef} className={`side_nav ${open ? 'side_nav_open' : ''}`}>
          <div className="d-flex flex-column gap-3">
            <div>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </div>
            <div>
              <NavLink className="nav-link" to="/products">
                Shop
              </NavLink>
            </div>
            <div>
              <NavLink className="nav-link" to="/review">
                Reviews
              </NavLink>
            </div>
            <div>
              <NavLink className="nav-link" to="/contact">
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>
      )}
    {/* Small screen end */}





  </>
}

export default Navbar