import React from 'react'
import './Features.css'

const Features = () => {
  return (
    <div className='features' id='features'>
        <h4>Features</h4>
        <div className="features-content">
            <h5>20+ Templates</h5>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere animi, natus illum corrupti cupiditate nobis libero nesciunt. Doloremque perspiciatis, omnis numquam rerum dolor vero cupiditate laudantium sequi reiciendis ducimus voluptatem.</p> 
        </div>
        <div className="features-template-card">
            <div className="card" id='card1'></div>
            <div className="card" id='card2'></div>
            <div className="card" id='card3'></div>
            <div className="card" id='card4'></div>
            <div className="card" id='card5'></div>
            <div className="card" id='card6'>
            <h5>Resume Templates</h5>
              <p>We've compiled a list of both free and premium ATS resume templates that you can use for your resume. A handful of these templates are free with no strings attached, while the rest can be individually purchased. All templates are editable in Google Docs and downloadable to use offline in Word. Even if you don't download one, we'd encourage you to browse the samples to get inspiration on how to describe your achievements.</p>
            </div>
        </div>
    </div>
  )
}

export default Features