 import React, { useState } from 'react'
 import Profile from './Profile';
import './Dashboard.css';
import { connect } from 'react-redux';
import SavedResumes from './savedResumes.jsx';

 const Dashboard = (props) => {

  const [content, setContent] = useState(0);

  const handleChange = ( newValue) => {
      console.log(newValue)
      setContent(newValue);
  };

  function getContent(id) {
      switch (id) {
          case 0:
              return <Profile />;
          case 1:
              return <SavedResumes/> ;
          default:
              throw new Error('Unknown');
      }
  }

  return (
      <>
          <div className='menu'>
              <div>
                  <button onClick={()=> handleChange(0)} className='label btn'>Profile</button>
                  <button onClick={()=> handleChange(1)} className='label btn' disabled={(Array.isArray(props.resume.data)) ? '' : true} >Saved Resumes</button>
              </div>
          </div>
          <hr className='line'></hr>
          {getContent(content)}
      </>
  )

}


const mapStateToProps = state => {
  return {
      resume: state.resume,
  }
}

export default connect(mapStateToProps)(Dashboard);