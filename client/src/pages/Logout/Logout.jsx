import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faSignOut, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {  logout } from '../../redux/actionControllers';
import { connect } from 'react-redux';

const Logout = (props) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogOut = () => {

    const user = {
        email: 'taev29101@gmail.com',
        password: 'alexa123'
    }

    props.logout(user, function (token) {
        localStorage.getItem('token', token);
        enqueueSnackbar('Loggedout successfully', { variant: 'success'});
        navigate("/")
    })

  };
  
  return (
    <div className="deletebk-css">
    <div className='p-4'>
      <FontAwesomeIcon icon={faArrowAltCircleLeft} />
      <h1 className='text-3xl my-4'>LogOut <FontAwesomeIcon icon={faSignOut} /></h1>
      {loading ? <FontAwesomeIcon icon={faSpinner} /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to logout?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleLogOut}
        >
          Yes, Log me out
        </button>
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
    logout: (props, callback) => { dispatch(logout(props, callback))},
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);