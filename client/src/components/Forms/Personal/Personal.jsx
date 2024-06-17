import React, { useState } from 'react'
import {connect} from 'react-redux'
import { setPersonalDetails } from '../../../redux/actionControllers'
import './Personal.css'
import { useSnackbar } from 'notistack'

const Personal = (props) => {

    const {enqueueSnackbar}=useSnackbar;

    const regex = {
        email: '/^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/', //eslint-disable-line'
        name: '/^[A-Z][a-zA-Z]{1,}$/',
        website: '/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/', //eslint-disable-line
        phone: '/^\d{6,}$/',
    }

    const [errorText, setErrorText] = useState({
        email: '',
        firstName: '',
        lastName: '',
        website: '',
        phone: ''
    })

    const validateInput = (name, input) => {
        if (name === 'firstName' || name === 'lastName') {
            if (!input.match(regex.name))
                setErrorText({ ...errorText, [name]: 'Invalid Name; Length > 2' })
            else setErrorText({ ...errorText, [name]: 'Hm, Looks Good!' })
        }
        if (name === 'email') {
            if (!input.match(regex.email))
                setErrorText({ ...errorText, [name]: 'Invalid Email Id' })
            else setErrorText({ ...errorText, [name]: 'valid' })
        }
        if (name === 'phone') {
            if (!input.match(regex.phone))
                setErrorText({ ...errorText, [name]: 'Enter Valid Phone no.' })
            else setErrorText({ ...errorText, [name]: '' })
        }
        if (name === 'website') {
            if (!input.match(regex.website))
                setErrorText({ ...errorText, [name]: 'Enter a professional Link' })
            else setErrorText({ ...errorText, [name]: '' })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newDetails = { ...props.resume.personal, [name]: value }
        setPersonalDetails({ ...props.resume, personal: newDetails });
        props.resume.personal = newDetails;

        validateInput(name, value)
    }

    return (
        <>
         <div className="personal-content">
            <div className="personal-head">
                <h1 className='flex-1 w-64'>Personal Information</h1>
            
            </div>
            <div className="personal-form">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id='firstName' 
                name='firstName'
                value={props.resume.personal.firstName}
                placeholder='Jennie'
                error={errorText.firstName}
                onChange={handleChange}
                required/>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName' name='lastName' placeholder='Doe'
                value={props.resume.personal.lastName}
                error={errorText.lastName}
                onChange={handleChange}
                required/>
                {
                    (errorText.firstName)? <div className="alert">{errorText.firstName}</div> : null
                }
                {
                    (errorText.lastName)? ' ' : <div className="alert">{errorText.lastName}</div> 
                }
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email'
                 placeholder='jennieDoe@yahoo.in'
                value={props.resume.personal.email}
                autoComplete='email'
                error={errorText.email}
                onChange={handleChange}
                required />
                {
                    (errorText.email)? '' : <div className="alert">{errorText.email}</div>
                }
                <label htmlFor="phone">Phone No.</label>
                <input  type='tel' id='phone' name='phone' placeholder='9214985406'
                value={props.resume.personal.phone}
                autoComplete='tel'
                error={errorText.phone}
                onChange={handleChange}
                required/>
                {
                    (errorText.phone)? '' : <div className="alert">{errorText.phone}</div>
                }
                <label htmlFor="website">Professional Profile/Website URL/Link</label>
                <input type="url" id='website' name='website' placeholder='jennieDoe.dev' 
                value={props.resume.personal.website}
                autoComplete='website'
                error={errorText.website}
                onChange={handleChange}
                required />
                {
                    (errorText.website)? '' : <div className="alert">{errorText.website}</div>
                }
            </div>
         </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
        resume: state.resume.data,
    }
}

const mapDispatchToProps = dispatch => ({
    setPersonalDetails: (props) => { dispatch(setPersonalDetails(props)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Personal);