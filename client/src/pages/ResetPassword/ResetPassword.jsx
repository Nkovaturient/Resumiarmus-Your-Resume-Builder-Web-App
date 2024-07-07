// import { Buffer } from 'buffer';
import React, { useState } from 'react'
import './ResetPassword.css'
import { config } from '../../config/config';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockKeyhole, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken'

// const myBuffer=Buffer.from("bonjour", 'utf8');

export default function ResetPassword() {
  
  const query = useQuery(); 
  const navigate= useNavigate();
  const {enqueueSnackbar}= useSnackbar();

  const [values, setValues] = useState({
      email: '',
      password: '',
      confirmPassword: '',
      open: false,
      error: ''
  })

  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value })
  }


  function useQuery() {
      return new URLSearchParams(useLocation().search);
  }

 
    const getToken = () => {
        let token = query.get("token");
          return token;
      }

  //   const verifyToken = () => {
        
  //       try{
  //           const secret_key=config.VITE_SECRET_KEY;

  //       jwt.verify(getToken(), secret_key , function (err, decoded) {
  //         if(err) {
  //                 console.error('verification failed: ', err);
  //                 enqueueSnackbar(`${err.message}`, {variant: 'warning'})
  //               } else {
  //                 console.log("decoded jwt:", decoded);
  //               }
  //       });
  //   } catch(err){
  //           console.log('Error generating or verifying token:', err.message);
  //   }
  // }

    const clickSubmit = (event) => {
        event.preventDefault();
  try{

    const token = getToken();
    const payload = jwt.decode(token);
    const userEmail = payload.email;

    const user = {
        password: values.password || undefined,
        email: userEmail || undefined,
        token: token || undefined
    }

        create(user).then((data) => {
            if (data.error) {
              console.log('data==', data)
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, error: '', open: true })
            }
        }) 

  }catch(err){
    enqueueSnackbar(`${err.message}`, { variant: 'error' });

  } }

 
  const goto = (res) => {
      console.log("Reset result:",res);

      if (res.status === 200) {

        enqueueSnackbar('Password reset successfully', { variant: 'success' });
        enqueueSnackbar('Redirecting you to login page', { variant: 'info' });
          setTimeout(() => {
              navigate("/login");
          }, 2000);

      } else {
        enqueueSnackbar('Invalid token', { variant: 'error' });
      }
  }



  const create = async (user) => {
      try {
          let response = await fetch(`${config.VITE_APP_SERVER}/cvi/password/reset`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
          })
          goto(response);
          console.log('response==', response);
          return response
      } catch (err) {
          console.log('error in reset', err.message)
      }
  }

  
  return (
    <div className="main">
    <div className="paper">
      <div className="avatar">
        <FontAwesomeIcon icon={faUnlockKeyhole}/> <span>Reset Password</span>
      </div>
      <form action="">
      <label htmlFor="password">New Password</label>
      <input type="password" name="password" id="password"
                  value={values.password}
                  autoComplete='password'
                  onChange={handleChange('password')}
                  required
                  />
                  <label htmlFor="confirmPassword">Confirm New Password</label>
      <input type="password" name="confirmPassword" id="confirmPassword"
                  value={values.confirmPassword}
                  autoComplete='confirmPassword'
                  onChange={handleChange('confirmPassword')}
                  required
                  />
                  <button type='submit' onClick={clickSubmit}>Reset <FontAwesomeIcon icon={faRefresh}/></button>
      </form>
    </div>
  </div>

  )
}