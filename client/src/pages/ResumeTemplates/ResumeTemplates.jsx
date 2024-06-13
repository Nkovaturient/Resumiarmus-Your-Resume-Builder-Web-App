import React from 'react'
import './ResumeTemplates.css'
import TemplatesList from '../../components/TemplatesList/TemplatesList'

const ResumeTemplates = () => {
  return (
    <div className='templates-section'>
      <div className="templates-header">
        <div className="templates-header-text">
        <h5>ATS RESUME TEMPLATES</h5>
        <h2>Professional resume templates optimized for ATS</h2>
        <p>Many candidates get rejected for using resume templates that are unreadable by applicant tracking systems (ATS) and resume screening software.</p>
        <p>Ensure you never get rejected by a computer again. Our professional Word and Google docs resume templates are vetted by recruiters and are optimized to pass ATS and recruitment software.</p>
        <button><a href="#templates-list">Browse 20+ resume templates</a></button>
        </div>
        <div className="templates-header-img">  </div>
      </div>

      <TemplatesList />
    </div>
  )
}

export default ResumeTemplates