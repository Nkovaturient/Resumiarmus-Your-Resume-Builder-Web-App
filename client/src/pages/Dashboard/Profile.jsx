import React, { useEffect, useState } from 'react'
import { fetchData, updateUser } from '../../redux/actionControllers'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faUserEdit } from '@fortawesome/free-solid-svg-icons'

const Dashboard = (props) => {
  
  const token = localStorage.getItem('token');
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  const user = JSON.parse(window.atob(base64));
  //console.log(user)

  const [values, setValues] = useState({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
  })

  useEffect(() => {
      props.fetchData(props.token, function () {
          //history.push("/builder")
      })
  }, []) //eslint-disable-line

  const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = (event) => {
      event.preventDefault();
      const user = {
          firstName: values.firstName || undefined,
          lastName: values.lastName || undefined,
          email: values.email || undefined,
      }
      //console.log(user, props.token)
      props.updateUser(user, props.token)
  }

  return (
    <>
    <div className="main">
      <div className="profile">
        <h1 className='title'>Personal Details <FontAwesomeIcon icon={faUser}/></h1>
        <form action="">
        <label htmlFor="firstName">First Name</label>
            <input type="text" name='firstName' id='firstName'
             onChange={handleChange('firstName')}
             value={values.firstName}
              />
              <label htmlFor="lastName">Last Name</label>
            <input type="text" name='lastName' id='lastName'
             onChange={handleChange('lastName')}
             value={values.lastName}
              />
              <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"
                    value={values.email}
                    autoComplete='email'
                    onChange={handleChange('email')}
                    />

                    <button className='submit' onClick={clickSubmit}>Update Details <FontAwesomeIcon icon={faUserEdit}/></button>
        </form>
      </div>
    </div>
    </>

  )
}

const mapStateToProps = state => {
  return {
      resume: state.resume,
      token: state.resume.token
  }
}

const mapDispatchToProps = dispatch => ({
  fetchData: (props, callback) => { dispatch(fetchData(props, callback)) },
  updateUser: (user, token) => { dispatch(updateUser(user, token)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);