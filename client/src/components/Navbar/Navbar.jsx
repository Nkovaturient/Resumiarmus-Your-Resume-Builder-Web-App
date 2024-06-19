import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faWandMagic, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

const Navbar = (props) => {

  const[menu, setMenu]= useState('home');
 const [menuOpen, setMenuOpen] = useState(false);

const toggleMenu = () => {
    setMenuOpen(!menuOpen);
};


  return (
    <>
    <div className='navbar text-3xl text-blue-700'>
    <h4 className='logo'>Resumi<span>armus</span></h4>

    <button className="toggle-button" onClick={toggleMenu}><FontAwesomeIcon icon={faBars}/></button>

    <ul className={`navbar-menu ${menuOpen ? 'show' : ''}`}>  
      <Link to='/' onMouseOver={ ()=> setMenu("home")} className={menu === "home" ? "active" : ""}  >Home</Link>
      <a href='#features' onMouseOver={ ()=> setMenu("features")} className={menu === "features" ? "active" : ""}>Features</a>
      <Link to='/resume-templates' onMouseOver={ ()=> setMenu("explore-templates")} className={menu === "explore-templates" ? "active" : ""}>Explore Templates</Link>
      <a href='#footer' onMouseOver={ ()=> setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
    
    
    {
     (props.token) ? (
       <div className="navbar-right">
      <Link to='/dashboard'>Dashboard</Link>
      <Link to='/logout'>LogOut</Link>
    </div>
    ) : (
      <div className="navbar-right">
        <button><i className="fa-solid fa-user-tie"></i><Link to='/signup'>Sign Up</Link></button>
        <button><i className="fa-solid fa-user-tie"></i><Link to='/login'>LogIn</Link></button>
    </div>
    )
    }
    </ul>
    
    </div>
    <hr />
    </>
  )
}

const mapStateToProps = state => {
  return {
      resume: state.resume,
      token: state.resume.token
  }
}

export default connect(mapStateToProps)(Navbar);

// export default Navbar
// if(props.token){
//   const token = localStorage.getItem('token');
// var base64Url = token.split('.')[1];
// var base64 = base64Url.replace('-', '+').replace('_', '/');
// const user = JSON.parse(window.atob(base64));
// console.log(user);

// }