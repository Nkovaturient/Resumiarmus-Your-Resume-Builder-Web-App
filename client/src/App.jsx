import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ResumeTemplates from './pages/ResumeTemplates/ResumeTemplates';
import BuildResume from './pages/BuildResume/BuildResume';
import Template1 from './components/Templates/Template1/Template1';
import Template2 from './components/Templates/Template2/Template2';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup'
import { connect } from 'react-redux';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import { logInSuccess, logOutSuccess } from './redux/actionControllers';
import Logout from './pages/Logout/Logout';


const App = (props) => {
    const[form, setForm]=useState('personal');
    const storedJwt=localStorage.getItem('token');

    useEffect(()=>{
        if(storedJwt)
            props.logInSuccess(storedJwt)
    }, [])

    return (
        <>
        <div className="app">
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />}  />
                <Route path="/password/forgot" element={<ForgotPassword/>} />
                <Route path="/password/reset" element={<ResetPassword/>}  />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path= '/resume-templates' element={<ResumeTemplates />} />
                <Route path='/builder' element={<BuildResume setForm={setForm} form={form} />} />
                <Route path='/template1' element={<Template1 />} />
                <Route path='/template2' element={<Template2 />} />
            </Routes>
            </div>
            <Footer/>
                
          
            </> 
    )
}
const mapStateToProps= state => {
    return{
        resume : state.resume,
        token: state.resume.token
}
}

const mapDispatchToProps= dispatch => ({
    logInSuccess: (props, callback) => { dispatch(logInSuccess(props)) },
    logOutSuccess: (props, callback) => { dispatch(logOutSuccess(props))},
});

export default connect(mapStateToProps, mapDispatchToProps)(App);