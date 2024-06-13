import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ResumeTemplates from './pages/ResumeTemplates/ResumeTemplates';



const App = () => {
    return (
        <>
        <div className="app">
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path= '/cvi/dashboard/resume-templates' element={<ResumeTemplates />} />

            </Routes>
            </div>
            <Footer/>
                
          
            </> 
    )
}

export default App;