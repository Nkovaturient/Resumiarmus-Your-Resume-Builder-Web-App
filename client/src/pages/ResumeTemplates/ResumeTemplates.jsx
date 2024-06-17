import React from 'react'
import './ResumeTemplates.css'
import TemplatesList from '../../components/TemplatesList/TemplatesList'
import { Link } from 'react-router-dom'


const ResumeTemplates = () => {
  return (
    <div className='templates-section'>
      <div className="templates-header">
        <div className="templates-header-text">
        <h5>ATS RESUME TEMPLATES</h5>
        <h2>Professional resume templates optimized for ATS</h2>
        <p>Many candidates get rejected for using resume templates that are unreadable by applicant tracking systems (ATS) and resume screening software.</p>
        <p>Ensure you never get rejected by a computer again. Our professional Word and Google docs resume templates are vetted by recruiters and are optimized to pass ATS and recruitment software.</p>
        <button className='btn'><a href="#templates-list">Browse 20+ resume templates</a></button>
        <button className='resume-btn'><Link to='/builder'>Build your resume for free.</Link></button>
        </div>
        <div className="templates-header-img">  </div>
      </div>
     <div className="create-templates" id='features'>
     <div className="create-templates-img">  </div>
     <div className="create-templates-text">
      <h3>Generate your professional resume in just minutes</h3>
      <ul>
        <li>Choose your resume template or style from our libraries</li>
        <li>Fill the required details. </li>
        <li>Download it and you are good to go!</li>
      </ul>
      <button className='resume-btn'><Link to='/builder'>Build your resume for free.</Link></button>
      </div>
     </div>
      <TemplatesList />
    </div>
  )
}

export default ResumeTemplates