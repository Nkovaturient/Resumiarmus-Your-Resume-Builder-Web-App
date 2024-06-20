 import React from 'react'
 import './Footer.css'
import { assets } from '../../assets/assets'
 
 const Footer = () => {
   return (
     <div className='footer' id='footer'>
       <div className="footer-content">
            <div className="footer-content-left">
                {/* <img src='' alt="logo" /> */}
                <h4 className='logo'>Resumi<span>armus</span></h4>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit eveniet mollitia dolor, accusantium exercitationem reiciendis magni. Doloremque praesentium ut, veniam mollitia ea dolorum qui atque consequuntur pariatur vitae laboriosam quod!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="fb" />
                    <img src={assets.linkedin_icon} alt="linked" />
                    <img src={assets.twitter_icon} alt="twitter" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li>About Us</li>
                    <li><a href="#features">Features</a></li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1 254641254</li>
                    <li>rubykim369101@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Copyright 2024 &copy; Resumiarmus.com - All Rights Reserved.</p>
        </div>
   )
 }
 
 export default Footer