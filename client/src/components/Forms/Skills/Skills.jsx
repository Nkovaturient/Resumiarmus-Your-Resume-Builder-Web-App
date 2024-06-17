import React from 'react'
import FormSection from '../../common/FormSection/FormSection';
import './Skills.css'

export default function Skills({ resume }) {

  const skill = {
      skillName: '',
      keywords: ['']
  };

  return (
      <>
        <div className="skills">
          <h6>Skills</h6>
          <FormSection input={skill} name="Skill" section="skills" resume={resume} />
        </div>
          
      </>
  );
}