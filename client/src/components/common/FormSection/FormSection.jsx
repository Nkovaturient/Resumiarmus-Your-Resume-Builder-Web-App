import React, { useState } from 'react'
import './FormSection.css'
import FormInput from '../FormInput/FormInput'
import Template1 from '../../Templates/Template1/Template1';
import Template2 from '../../Templates/Template2/Template2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';


const FormSection = (props) => {
   
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [section, setSection] = useState(props.resume[props.section]);
    const blankSection = props.input;
    console.log('prop resume=', props.resume[props.section]);
    
    // console.log('section=', [...section])
    const addSection = () => {
        setSection([...section, { ...blankSection }]);
        props.resume[props.section] = section;
    };

    const update = (updatedSection) => {
        setSection(updatedSection)
        props.resume[props.section] = updatedSection;
    }

    const[isPreview, setIsPreview ]=useState(false);
    const handlePreview=()=>{
        setIsPreview(!isPreview);
    }

    const handleError=()=>{
        enqueueSnackbar('Required Details were missing. Kindly create a new resume', { variant: 'error' })
        navigate("/builder", props.resume[props.section]);
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
        })  //:  <button className="error" onClick={()=>handleError}>OOPS! nothing found here!</button>
    }
    <button onClick={addSection} className='btn'><FontAwesomeIcon icon={faAdd}/> {props.name}</button>
    <br />
    <hr />
    <>
    <button onClick={handlePreview}>Preview Template 1</button>
    {
        isPreview && <Template1 key={1} renderPreview={props.resume[props.section]} /> 
    }
    <button onClick={handlePreview}>Preview Template 2</button>
    {
        isPreview && <Template2 key={2} renderPreview={props.resume[props.section]} />
    }
    
    </>
    </>
  )
}

export default FormSection