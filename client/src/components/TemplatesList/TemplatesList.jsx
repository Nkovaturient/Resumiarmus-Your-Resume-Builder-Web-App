import React from 'react'
import './TemplatesList.css'
import Templates from '../Templates/Templates'
import { assets } from '../../assets/assets'

const TemplatesList = () => {
  return (
    <div className='templates-list' id='templates-list'>
      <Templates img={assets.template1} />
      <Templates img={assets.template2} />
      <Templates img={assets.template3}/>
      <Templates img={assets.template4}/>
      <Templates img={assets.template5}/>
      <Templates img={assets.template6}/>
      <Templates img={assets.template7}/>
      <Templates img={assets.template8}/>
      <Templates img={assets.template9}/>
      </div>
  )
}

export default TemplatesList