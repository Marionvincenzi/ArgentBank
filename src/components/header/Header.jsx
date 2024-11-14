import React from 'react'
import logo from "../../img/argentBankLogo.webp";
import { NavLink } from 'react-router-dom';
import {useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import "../../styles/components/Header.css"

const Header = () => {
 const dispatch = useDispatch();
 const user = useSelector((state) => state.auth.user);
 const profile = useSelector((state) => state.profile.profile);

 const handleLogout = (e) => {
  e.preventDefault();
  dispatch(logout());
 };

 return (
  <nav className='main-nav'>
    <NavLink className='main-nav-logo' to="/">
    <img className='main-nav-logo-image' src={logo} alt='Argent Bank Logo' />
    <h1 className='sr-only'>Argent Bank</h1>
    </NavLink>
    <div className='main-nav-right'>
      {user && profile ? (
        <>
        <NavLink to="/action" className="main-nav-item">
        <i className='fa fa-user-circle'></i>
        {profile.userName}
        </NavLink>
        <a href='/' onClick={handleLogout} className='main-nav-item'>
        <i className='fa fa-sign-out'></i>
        Sign Out
        </a>
        </>
      ) : (
        <NavLink className="main-nav-item" to="/login">
          <i className='fa fa-user-circle'></i>
          Sign In
        </NavLink>
      )}
    </div>
  </nav>
 )
}

export default Header