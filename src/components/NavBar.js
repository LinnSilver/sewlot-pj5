import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";
import { Row } from "react-bootstrap";

/**
 * NavBar component that renders the navigation bar.
 */
const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  /**
   * Handles the sign out process.
   * Clears the user session and redirects to the sign-in page.
   */
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push("/signin");
    } catch (err) {
      //console.log(err);
    }
  };

  if (!currentUser) {
    return <Redirect to="/landing" />;
  }

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        exact
        to="/"
      >
        <i className="fas fa-home"></i>Home
      </NavLink>

      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/liked"
      >
        <i className="fas fa-heart"></i>Liked
      </NavLink>
      
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
      
      <NavLink
        className={`${styles.NavLink} ${styles.AvatarLink}`}
        activeClassName={styles.activeAvatar}
        to={`/profiles/${currentUser?.profile_id}`}
      >
        <img
          className={styles.AvatarImage}
          src={currentUser?.profile_image}
          alt="Profile"
        />
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <div className="container">
      <Navbar
        key={currentUser ? currentUser.id : "guest"}
        expanded={expanded}
        className={styles.NavBar}
        expand="md"
        fixed="top"
      >
        <div className="container">
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" className={styles.Logo} />
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle
            ref={ref}
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto text-left">
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
