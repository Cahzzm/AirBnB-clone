// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import * as sessionActions from '../../store/session';
import Demo from "./Demo";
import './Navigation.css'

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
      <button className="profile-dropdown-btn" onClick={openMenu}>
      <i className="fas fa-bars"></i><i id ="profile-icon" className="fas fa-user-circle" />
      </button>
      {showMenu && ( user ?
        (<ul className="profile-dropdown">
          <span>{user.username}</span>
          <span>{user.email}</span>
          <div className="line-one-spot-dropdown"></div>
          <button className='user-spots-btn'>
            <NavLink
              className='my-bookings-btn'
              to={`/my-bookings`}
            >
              My bookings
            </NavLink>
          </button>
            <button className="logout-dropdown-btn" onClick={logout}>Log Out</button>
        </ul>) :
        (<ul className="profile-dropdown">
            <button className="login-dropdown-btn" onClick={() => {
              setLogin(true)
              setShowModal(true)
            }}>Log In</button>
            <button className="signup-dropdown-btn" onClick={() => {
              setLogin(false)
              setShowModal(true)
            }}>Sign Up</button>
          <Demo />
        </ul>)
      )}
    </>
  );
}

export default ProfileButton;
