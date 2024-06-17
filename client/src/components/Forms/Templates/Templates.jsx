import React, { useState } from 'react'
import { setTitle, updateResumeData } from '../../../redux/actionControllers';
import { connect } from 'react-redux';
import customTemplates from '../../Templates/CustomTemplates'
import { useNavigate } from 'react-router-dom';
import './Templates.css'


const Templates = (props) => {
    const navigate=useNavigate();

    const [errorText, setErrorText] = useState('')

    const validateInput = (input) => {
        if (input.length < 3)
            setErrorText('Too Small Input')
        else setErrorText('')
    }

    const handleChange = (e) => {
        const { value } = e.target;
        validateInput(value)
        props.setTitle(value);

        const newData = { ...props.resume.data, title: value }
        props.updateResumeData(newData);
        props.resume.data = newData;
    }

    const handleClick = (template) => {
        props.resume.template = template
        props.resume.data.template = template
        const update = 'update'
        navigate(`/${template}`, update)
    }

  return (
    <>
    <h5>Choose Template</h5>
    <>
    <hr />
    <div className="container">
        <div className="item">
            <input type="text" name='title' id='title' 
             onChange={handleChange}
             value={props.resume.data.title}
              />
        </div>
        { (errorText)? <p>{errorText}</p> : ''}
        {
           customTemplates.map((template, index)=>{
            return <div className="item-btn" key={index}>
                <button onClick={() => handleClick(template)}>{template}</button>
            </div>
           }) 
        }
    </div>
    </>
    </>
  )
}

const mapStateToProps= state => {
    return {
        resume: state.resume,
    }
}

const mapDispatchToProps= dispatch=> ({
    setTitle: (props) => {dispatch(setTitle(props))},
    updateResumeData: (props) => { dispatch(updateResumeData(props)) },

})

export default connect(mapStateToProps, mapDispatchToProps)(Templates)