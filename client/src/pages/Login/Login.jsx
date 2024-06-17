import React, { useState } from 'react'
import './Login.css'
import { faLock, faLockOpen, faUserLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { loginCheck } from '../../redux/actionControllers';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


const Login = (props) => {
    // const history = useHistory()
    const navigate= useNavigate();
    const {enqueueSnackbar}=useSnackbar();

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const regex = {
        email: '^([a-z0-9_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$', //eslint-disable-line
        password: '(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,})$'
    }

    const [errorText, setErrorText] = useState({
        email: '',
        password: ''
    })

    const validateInput = (name, input) => {
        if (name === 'email') {
            if (!input.match(regex.email))
                setErrorText({ ...errorText, [name]: 'Invalid Email Id' })
            else setErrorText({ ...errorText, [name]: '' })
        }
        if (name === 'password') {
            if (!input.match(regex.password))
                setErrorText({ ...errorText, [name]: 'Password must be Alphanumeric, Min. Length 6' })
            else setErrorText({ ...errorText, [name]: '' })
        }
    }


    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        validateInput(name, event.target.value)
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        props.loginCheck(user, function (token) {
            localStorage.setItem('token', token);
            enqueueSnackbar(" Welcome wiz! Ready to arm yourself with Resumiarmus?", { variant: 'success'});
            navigate("/")
        })
    }
  return (
    <div className="main">
        <div className="main-img">
            <img src="" alt="loginImage" />
        </div>
        <div className="main-item">
            <div className="paper">
                <div className="avatar">
                    <FontAwesomeIcon icon={faUserLock} /> <span>Sign In</span>
                </div>
                <form action="">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"
                    value={values.email}
                    error={errorText.email}
                    autoComplete='email'
                    autoFocus
                    onChange={handleChange('email')}
                    />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password"
                    value={values.password}
                    error={errorText.password}
                    autoComplete='current-password'
                    onChange={handleChange('password')}
                    />
                    { (errorText.email)? <div className="alert">{errorText.email}</div> : '' }
                    { (errorText.password)? <div className="alert">{errorText.password}</div> : '' }
                    { (props.error)? <div className="alert">{props.error}</div> : '' }

                    <input type="checkbox" name="remember" id="remember" value='remember' />
                    <label htmlFor="remember">Remember me</label>
                    <button onClick={clickSubmit} disabled={(errorText.password) || (errorText.email)? true : ''}>Log In</button>

                    <div className="forgot-input">
                        <Link to='/password/forgot'>Forgot Password?</Link>
                    </div>
                    <div className="signup-input">
                        <Link to='/signup'>New wizard here? Lets Sign you in</Link>
                    </div>
                    </form>

            </div>
        </div>
    </div>
  )
}

const mapStateToProps = state => {
    return {
        resume: state.resume,
        token: state.resume.token,
        error: state.resume.error,
    }
}

const mapDispatchToProps = dispatch => ({
    loginCheck: (props, callback) => { dispatch(loginCheck(props, callback)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);