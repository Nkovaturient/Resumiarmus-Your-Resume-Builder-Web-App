import { faDeleteLeft, faFileEdit, faRankingStar, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchData, setData, deleteData } from '../../redux/actionControllers';
import { connect } from 'react-redux';
import './Dashboard.css'
import {  useSnackbar } from 'notistack';

const Dashboard = (props) => {
 const navigate=useNavigate();
 const {enqueueSnackbar}=useSnackbar();

  useEffect(() => {
      props.fetchData(props.token, function () {
          // navigate("/builder")
      })
  }, []) //eslint-disable-line

  const handleEdit = (index) => {
      props.setData(index, function () {
        enqueueSnackbar("you are editing details for this resume", {variant: 'info'})
          navigate("/builder", index)
      })
  };

  const callDelete = async (index) => {
      await props.deleteData(props.token, props.resume.data[index])
      enqueueSnackbar("Deleted successfully", {variant: 'success'})
  }

  const handleDelete = (index) => {
      callDelete(index)
          .then(() => {
              props.fetchData(props.token, function () {
                  //history.push("/builder")  
                  
              })
          })
          .catch((err) => {
            console.log('saved error', err);
            enqueueSnackbar("Couldnt delete the resume. Try after some time!", {variant: 'error'})
          })
  }

  return (
    <>
    <div className="main">
      <div className="savedResume">
        <h1>Saved Resumes<FontAwesomeIcon icon={faSave} /></h1>
        <div className="container">
          {
            (props.resume.data.length) && props.resume.data.map((item, id) => {
            return  <div className="data-box" key={id}>
                <div className="data-card">
                  
                  <div className="card-content">
                  <h5>{item.title}</h5>
                  </div>
                  
                  <div className="card-actions">
                    <button className='btn' onClick={() => {handleEdit(id)}}>Edit <FontAwesomeIcon icon={faFileEdit}/></button>
                    <button className='btn' onClick={() => {handleDelete(id)}}>Delete <FontAwesomeIcon icon={faDeleteLeft}/></button>
                  </div>
                  
                </div>
              </div>
            })
          }
        </div>
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
  setData: (props, callback) => { dispatch(setData(props, callback)) },
  deleteData: (token, resume) => { dispatch(deleteData(token, resume)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);