import React from 'react'
import './Projects.css'
import FormSection from '../../common/FormSection/FormSection';


export default function Projects({ resume }) {

  const project = {
      projectName: '',
      keywords: '',
      projectLink: '',
      projectDescription: [''],
  };

  return (
      <>
      <div className="projects">
        <h6>Project Details</h6>
        <FormSection input={project} name="Project" section="projects" resume={resume} />
      </div>
          
      </>
  );
}