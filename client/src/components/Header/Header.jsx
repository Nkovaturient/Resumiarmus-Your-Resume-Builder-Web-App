import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWandMagic, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-content">
            <p>Boost your career chasing</p>
            <h3>Land your dream job with already made <span>Eye catchy Resumes.</span></h3>
            <p>Create awesome job-tailored resumes with one of our template in just few seconds.</p>
            <Link className='btn' to={'/resume-templates'}>Create Resume for free <FontAwesomeIcon icon={faWandMagicSparkles}/></Link>
        </div>
        <div className="header-img">
            <img src={assets.heroImage} alt="heroImage" />
        </div>
        </div>
  )
}

export default Header