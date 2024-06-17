import React, { useState } from 'react'
import './FormSection.css'
import FormInput from '../FormInput/FormInput'


const FormSection = (props) => {
    const blankSection = props.input;
    console.log('prop resume=', props.resume[props.section]);
    const [section, setSection] = useState(props.resume[props.section]);
    // console.log('section=', [...section])
    const addSection = () => {
        setSection([...section, { ...blankSection }]);
        props.resume[props.section] = section;
    };

    const update = (updatedSection) => {
        setSection(updatedSection)
        props.resume[props.section] = updatedSection;
    }

  return (
    <>
    {
        section.map((val, idx) => {
            return (
                <div className="form-section" key={`section-${idx}`}>
                    <hr />
                    <FormInput id={idx} section={[...section]} update={update} input={props.input}
                    name={props.section} resume={props.resume}
                    />
                </div>
            )
        })
    }
    <button onClick={addSection} className='btn'>Add {props.name}</button>
    </>
  )
}

export default FormSection