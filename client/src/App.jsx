import React from 'react';
import { Router, Routes } from 'react-router-dom';



const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Routes  />
            </Router>
                
          
        </Provider>
    )
}

export default App;