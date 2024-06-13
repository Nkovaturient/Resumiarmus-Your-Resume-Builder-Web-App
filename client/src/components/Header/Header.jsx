import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-content">
            <p>Boost your career chasing</p>
            <h3>Land your dream job with already made <span>Eye catchy Resumes.</span></h3>
            <p>Create awesome job-tailored resumes with one of our template in just few seconds.</p>
            <button><Link to={'/cvi/dashboard/resume-templates'}>Create Resume for free</Link></button>
        </div>
        <div className="header-img">
            <img src='../../../public/header.jpg' alt="header" />
        </div>
        </div>
  )
}

export default Header