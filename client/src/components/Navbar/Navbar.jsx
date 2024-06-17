import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagic, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { logOutSuccess } from '../../redux/actionControllers';

const Navbar = () => {

  const[menu, setMenu]= useState('home');

  return (
    <>
    <div className='navbar text-3xl text-blue-700'>
    <h4 className='logo'>Resumi<span>armus</span></h4>
    <ul className="navbar-menu">  
      <Link to='/' onMouseOver={ ()=> setMenu("home")} className={menu === "home" ? "active" : ""}  >Home</Link>
      <a href='#features' onMouseOver={ ()=> setMenu("features")} className={menu === "features" ? "active" : ""}>Features</a>
      <Link to='/resume-templates' onMouseOver={ ()=> setMenu("explore-templates")} className={menu === "explore-templates" ? "active" : ""}>Explore Templates</Link>
      <a href='#footer' onMouseOver={ ()=> setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
    </ul>

    
    {
      (logOutSuccess) 
      ? (
        <div className="navbar-right">
        <button><i className="fa-solid fa-user-tie"></i><Link to='/signup'>Sign Up</Link></button>
        <button><i className="fa-solid fa-user-tie"></i><Link to='/login'>LogIn</Link></button>
    </div>
      )
      : (
        <div className="navbar-right">
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/logout'>LogOut</Link>
        </div>
      )

    }
    </div>
    <hr />
    </>
  )
}

export default Navbar