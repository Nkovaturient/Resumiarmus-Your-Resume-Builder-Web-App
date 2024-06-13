import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const[menu, setMenu]= useState('home');

  return (
    <>
    <div className='navbar text-3xl text-blue-700'>
    <h4 className='logo'>Resumi<span>armus</span></h4>
    <ul className="navbar-menu">  {/**now smooth scroll in index.css in root css */}
      <Link to='/' onMouseOver={ ()=> setMenu("home")} className={menu === "home" ? "active" : ""}  >Home</Link>
      <a href='#features' onMouseOver={ ()=> setMenu("features")} className={menu === "features" ? "active" : ""}>Features</a>
      <Link to='/cvi/dashboard/resume-templates' onMouseOver={ ()=> setMenu("explore-templates")} className={menu === "explore-templates" ? "active" : ""}>Explore Templates</Link>
      <a href='#footer' onMouseOver={ ()=> setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
    </ul>
    <div className="navbar-right">
      <button><i class="fa-solid fa-language"></i> English</button>
      {/* <div className="navbar-search-icon">
        search
      </div> */}
      <button><i class="fa-solid fa-user-tie"></i> Sign In</button>
    </div>
    </div>
    <hr />
    </>
  )
}

export default Navbar