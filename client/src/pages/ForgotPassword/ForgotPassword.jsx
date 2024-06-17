import React, { useState } from 'react'
import './ForgotPassword.css'
import { config } from '../../config/config';
import { faUnlockKeyhole, faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';


export default function ForgotPassword() {
  // const classes = useStyles();
  // const history = useHistory();
//   const alert = useAlert();
  const navigate= useNavigate();
  
  const {enqueueSnackbar}= useSnackbar();

  const [values, setValues] = useState({
      email: '',
      open: false,
      error: ''
  })

  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value })
  }

  const goto = (res) => {
      //console.log("result:",res);

      if (res.status === 200) {

        enqueueSnackbar('Please check your mail for password reset link', { variant: 'success' });
        enqueueSnackbar('Redirecting you to login page', { variant: 'info' });
          setTimeout(() => {
              navigate("/login");
          }, 2000);

      } else {
        enqueueSnackbar('Invalid Email', { variant: 'error' });
      }
  }



  const create = async (user) => {
      try {
          let response = await fetch(`http://localhost:${config.VITE_API_URL}/cvi/password/forgot`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
          })
          goto(response);

          return response
      } catch (err) {
          console.log(err)
      }
  }

  const clickSubmit = (event) => {
      event.preventDefault();
      const user = {
          email: values.email || undefined,
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
          <FontAwesomeIcon icon={faUnlockKeyhole}/> <span>Forgot Password?</span>
        </div>
        <form action="">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email"
                    value={values.email}
                    autoComplete='email'
                    autoFocus
                    onChange={handleChange('email')}
                    />
                    <button type='submit' onClick={clickSubmit}>Reset Password  <FontAwesomeIcon icon={faUnlockKeyhole}/></button>
        </form>
      </div>
    </div>
  )
}