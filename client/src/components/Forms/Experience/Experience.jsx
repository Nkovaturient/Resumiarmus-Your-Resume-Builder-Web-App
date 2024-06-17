import React from 'react'
import './Experience.css'
import FormSection from '../../common/FormSection/FormSection';

export default function Experience({resume}){
  const workEx = {
    title: "",
    organisation: "",
    startDate: "",
    endDate: "",
    description: [""]
};

return (
  <div className='experience' id='experience'>
    <h6>Experience</h6>
    <FormSection input={workEx} name="Experience" section="experience" resume={resume} />
    </div>
)
}

