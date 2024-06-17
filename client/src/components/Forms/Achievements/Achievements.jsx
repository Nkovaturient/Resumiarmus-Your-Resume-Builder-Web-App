import React from 'react'
import FormSection from '../../common/FormSection/FormSection'
import './Achievements.css'

export default function Achievements({resume}) {

  const achievement = {
    title: '',
    date: '',
    organisation: '',
    description: ['']
};

  return (
    <>
    <div id='achievements'>
      <h6>Achievement Details</h6>
      <FormSection input={achievement} name='Achievement' section='achivements' resume={resume} />
    </div>
    </>
    
  )
}

 