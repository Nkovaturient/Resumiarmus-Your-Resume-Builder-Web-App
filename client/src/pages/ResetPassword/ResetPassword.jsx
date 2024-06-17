import React, { useState } from 'react'
import './ResetPassword.css'
import { config } from '../../config/config';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockKeyhole, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
// import jwt  from 'jsonwebtoken';

export default function ResetPassword() {
  // const classes = useStyles();
  // const history = useHistory();
  
  const query = useQuery();
  const navigate= useNavigate();
  const {id}= useParams();
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
    //token=http://localhost:5600/cvi/dashboard/token=${token}
      let token = query.get("token");
      return token;
  }

  const verifyToken = (token) => {
      jwt.verify(getToken(), 'resume', function (err, decoded) {
      });
  }



  const goto = (res) => {
      //console.log("result:",res);

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
          let response = await fetch(`http://localhost:${config.VITE_API_URL}/cvi/password/reset`, {
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

      const token = getToken();
      const payload = jwt.decode(token);
      const userEmail = payload.email;

      const user = {
          password: values.password || undefined,
          email: userEmail || undefined,
          token: token || undefined
      }

      if (verifyToken()) {
          create(user).then((data) => {
              if (data.error) {
                  setValues({ ...values, error: data.error })
              } else {
                  setValues({ ...values, error: '', open: true })
              }
          })
      } else {
        enqueueSnackbar('Invalid token', { variant: 'error' });
          setTimeout(() => {
              navigate("/login");
          }, 2000);
      }


  }

  return (
    <div className="main">
    <div className="paper">
      <div className="avatar">
        <FontAwesomeIcon icon={faUnlockKeyhole}/> <span>Reset Password</span>
      </div>
      <form action="">
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password"
                  value={values.password}
                  autoComplete='password'
                  onChange={handleChange('password')}
                  />
                  <label htmlFor="confirmPassword">Password</label>
      <input type="password" name="confirmPassword" id="confirmPassword"
                  value={values.confirmPassword}
                  autoComplete='confirmPassword'
                  onChange={handleChange('confirmPassword')}
                  />
                  <button type='submit' onClick={clickSubmit}>Reset <FontAwesomeIcon icon={faRefresh}/></button>
      </form>
    </div>
  </div>

  )
}