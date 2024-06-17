import React from 'react'
import { assets } from '../../assets/assets'



const Templates = ({img}) => {
  return (
    <div className='template-section'>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={img} alt="template"/>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Professional Wizard</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#professional</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#job</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#modern</span>
          </div>
      </div>
    </div>

  )
}

export default Templates