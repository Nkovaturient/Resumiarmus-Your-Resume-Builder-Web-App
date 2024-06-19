import React, { useState } from 'react'
import './Description.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import './Description.css'


const Description = ({ sectionName, index, name, section }) => {
    
        //console.log(sectionName, index, name)
        const [lines, setLines] = useState(section[index][name]);
    
        const [errorText, setErrorText] = useState({})
    
        const validateInput = (id, input) => {
            if (input.length < 3)
                setErrorText({ ...errorText, [id]: 'Too Small Text' })
            else if (input.length > 100)
                setErrorText({ ...errorText, [id]: 'Too Large Text' })
            else setErrorText({ ...errorText, [id]: '' })
        }
    
        const addLine = () => {
            const updatedLines = [...lines, '']
            setLines(updatedLines);
            section[index][name] = lines;
        };
    
        const handleChange = (e) => {
            const { id, value } = e.target;
            validateInput(id, value)
            const updatedLines = lines
            updatedLines[id] = value
            setLines([...updatedLines]);
            section[index][name] = updatedLines;
        }
    
  return (
    <>
    {
        lines.map((text, idx)=>{
          return  <div className='box'>
                <input name={idx} id={idx} 
                value={text} 
                onChange={handleChange}
                placeholder={`Description Line ${idx + 1}`}
                />
                {
                    (errorText[idx])? <div className="alert">{errorText[idx]}</div> : " "
                }

            </div>
        })
    }

    <button className='btn' onClick={addLine}><FontAwesomeIcon icon={faAdd}/> </button>
    </>
  )
}

export default Description