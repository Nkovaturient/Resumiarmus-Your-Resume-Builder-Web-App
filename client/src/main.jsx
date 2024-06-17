import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {ConfigureStore} from './redux/ConfigureStore'
import { Provider } from 'react-redux';
import {SnackbarProvider} from 'notistack'

const store= ConfigureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>
   <BrowserRouter>
    <SnackbarProvider> {/*anchorOrigin={ {vertical: top, horizontal: center}} */}
    <App />
    </SnackbarProvider>
    </BrowserRouter>
    </Provider>
 
)
