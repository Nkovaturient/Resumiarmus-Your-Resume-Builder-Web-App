import React, { useState } from 'react'
import './Signup.css'
import { config } from '../../config/config'
import { faUserLock, faLink, faAddressCard, faWandMagicSparkles, faHatWizard} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export default function Signup() {
  
    const navigate= useNavigate();
    const {enqueueSnackbar}=useSnackbar();

  const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      open: false,
      error: ''
  })

  const regex = {
      email: '^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$', //eslint-disable-line
      name: '^[A-Z][a-zA-Z]{1,}$',
      password: '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$'
  }

  const [errortext, setErrorText] = useState({
      email: '',
      lastName: '',
      firstName: '',
      password: ''
  })

  const validateInput = (name, input) => {
      if (name === 'firstName' || name === 'lastName') {
          if (!input.match(regex.name))
              setErrorText({ ...errortext, [name]: 'Invalid Name; Length > 2' })
          else setErrorText({ ...errortext, [name]: '' })
      }
      if (name === 'email') {
          if (!input.match(regex.email))
              setErrorText({ ...errortext, [name]: 'Invalid Email Id' })
          else setErrorText({ ...errortext, [name]: '' })
      }
      if (name === 'password') {
          if (!input.match(regex.password))
              setErrorText({ ...errortext, [name]: 'Password must be Alphanumeric, Min. Length 6' })
          else setErrorText({ ...errortext, [name]: '' })
      }
  }

  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value })
      validateInput(name, event.target.value)
  }

  const goto = (res, user) => {
      if (res.status === 200) {
        enqueueSnackbar("G'day Mate! Ready to wear your wizard Hat? LogIn", {variant: 'warning'})
          navigate("/login", user)
      }
  }

  const create = async (user) => {
      try {
          let response = await fetch(`http://localhost:${config.VITE_API_URL}/cvi/signup`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
          })
          let res = await response.json()
          console.log(res)
          goto(response, res.user)
          return response
      } catch (err) {
          console.log(err)
      }
  }

  const clickSubmit = (event) => {
      event.preventDefault();
      const user = {
          firstName: values.firstName || undefined,
          lastName: values.lastName || undefined,
          email: values.email || undefined,
          password: values.password || undefined
      }
      create(user).then((data) => {
          if (data.error) {
              setValues({ ...values, error: data.error })
          } else {
              setValues({ ...values, error: '', open: true })
          }
      })
  }

  return (
    <div className="main">
      <div className="paper">
        <div className="avatar">
          <FontAwesomeIcon icon={faUserLock} /> <span>Sign Up</span>
          </div>

          <form action="">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name='firstName' id='firstName'
             onChange={handleChange('firstName')}
             value={values.firstName}
             error={errortext.firstName}
             autoFocus
              />
              <label htmlFor="lastName">Last Name</label>
            <input type="text" name='lastName' id='lastName'
             onChange={handleChange('lastName')}
             value={values.lastName}
             error={errortext.lastName}
             autoFocus
              />
              <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"
                    value={values.email}
                    error={errortext.email}
                    autoComplete='email'
                    autoFocus
                    onChange={handleChange('email')}
                    />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"
                    value={values.password}
                    error={errortext.password}
                    autoComplete='current-password'
                    onChange={handleChange('password')}
                    />
                    { (errortext.firstName)? <div className="alert">{errortext.firstName}</div> : '' }
                    { (errortext.lastName)? <div className="alert">{errortext.lastName}</div> : '' }
                    { (errortext.email)? <div className="alert">{errortext.email}</div> : '' }
                    { (errortext.password)? <div className="alert">{errortext.password}</div> : '' }

                    <button className='submit' onClick={clickSubmit}>Register <FontAwesomeIcon icon={faWandMagicSparkles}/></button>
                    <div className="login-input">
                        <Link to='/login'>Already got a wizardHat? Log In <FontAwesomeIcon icon={faHatWizard}/> </Link>
                    </div>
          </form>
      </div>
    </div>
  )
}
