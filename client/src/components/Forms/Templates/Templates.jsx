import React, { useState } from 'react'
import { setTitle, updateResumeData, postData } from '../../../redux/actionControllers';
import { connect } from 'react-redux';
import customTemplates from '../../Templates/CustomTemplates'
import { useNavigate } from 'react-router-dom';
import './Templates.css'
import { enqueueSnackbar } from 'notistack';


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
        const update = 'update';
        enqueueSnackbar(`updated your resume on ${template}! click to generate`, {variant: 'info'});
        console.log(`updated resume on ${template}`);
        // navigate(`/${template}`, update)
    }
    const handlePreview=(template) => {
        props.resume.template = template
        props.resume.data.template = template
        enqueueSnackbar("Here is your Resume Preview", {variant: 'success'})
        navigate(`/${template}`)
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
             placeholder='enter a unique Resume Title like - resumeFrontend then choose 1 template'
              />
        </div>
        { (errorText)? <p>{errorText}</p> : ''}
        {
           customTemplates.map((template, index)=>{
            return <div className="item-btn" key={index}>
                <button className='btn' onClick={() => handleClick(template)}>{template}</button>
                {/* <button className='btn preview-btn' onClick={()=> handlePreview(template)}>Preview</button> */}
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
    postData: (token, resume, props) => { dispatch(postData(token, resume, props)) },
    updateResumeData: (props) => { dispatch(updateResumeData(props)) },

})

export default connect(mapStateToProps, mapDispatchToProps)(Templates)