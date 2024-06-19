import React, { useState } from 'react'
import './FormInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Description from '../Description/Description';

// let _ = require('lodash');
import { _ } from 'lodash';

const FormInput = (props) => {
    

    const [errorText, setErrorText] = useState({})

    const [minSize, setMinSize] = useState(50)

    const validateInput = (id, name, input) => {
        if (name === 'gpa')
            if (input.length < 1)
                setErrorText({ ...errorText, [id]: 'Too Small Input' })
            else if (input.length > 5)
                setErrorText({ ...errorText, [id]: 'Too Large Input' })
            else setErrorText({ ...errorText, [id]: '' })
        else if (name === 'projectName')
            if (input.length < 3)
                setErrorText({ ...errorText, [id]: 'Too Small Input' })
            else if (input.length > 100)
                setErrorText({ ...errorText, [id]: 'Too Large Input' })
            else setErrorText({ ...errorText, [id]: '' })
        else if (name === 'keywords') {
            var keywords = input.split(',');
            setMinSize(4)
            keywords.forEach(keyword => {
                if (keyword.length < 4)
                    setMinSize(keyword.length)
            })
            if (minSize < 4)
                setErrorText({ ...errorText, [id]: 'Enter valid Keywords separated by a comma' })
            else setErrorText({ ...errorText, [id]: '' })
        }
        else {
            if (input.length < 3)
                setErrorText({ ...errorText, [id]: 'Enter valid Input' })
            else setErrorText({ ...errorText, [id]: '' })
        }
    }

    const handleChange = (e) => {
        const updatedSection = [...props.section];
        validateInput(e.target.id, e.target.name, e.target.value)
        var keywords = e.target.value.split(',');
        updatedSection[props.id][e.target.name] = (e.target.name === 'keywords') ? keywords : e.target.value;
        props.update(updatedSection);
    };

    const inputAttributes = (item) => {
        const name = {
            type: 'text',
            shrink: false
        }
        if (item === 'date' || item === 'startDate' || item === 'endDate') {
            name.type = 'date'
            name.shrink = true
        }

        return name;
    }

  return (
    <>
    <div className="box">
        {
            Object.entries(props.input).map((name, idx) => {
                return (
                    <div className="box-item" key={idx}>
                        { 
                        (name[0] === 'description' || name[0] === 'projectDescription') 
                        ? <Description sectionName={props.name} section={props.section} index={props.id} name={name[0]}/>
                        : <div className="form-control">
                            <label htmlFor="">
                            {
                                (name[0] === 'keywords') 
                                ? ( _.startCase(name[0]) + ' (separated by a `,`)')
                                : _.startCase(name[0])
                            }
                            </label>
                            <input name={name[0]} id={name + idx}
                            value={props.section[props.id][name[0]]}
                            onChange={handleChange}
                            type={inputAttributes(name[0].type)}
                            error={errorText[name + idx]}
                            className={
                                props.section[props.id][name[0]] ? 'shrink' : ''
                              }
                            />
                            <label htmlFor={name[0] + idx} className='textarea-label'>
                           
                            </label>
                            {(errorText[name + idx])
                            ? <div className="alert">{errorText[name + idx]}</div> : '' }
                        </div>
                    }
                    </div>
                )
            })
        }
    </div>
    </>
  )
}

export default FormInput

/* {
                                (name[0] === 'keywords') 
                                ? ( _.startCase(name[0]) + ' (separated by a  ` , `)')
                                : _.startCase(name[0])
                            } */