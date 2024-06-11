import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider } from '@material-ui/styles';
import MainRouter from './MainRouter';
// import theme from './theme';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/ConfigureStore.jsx';

const store = ConfigureStore();

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                
                    <MainRouter />
                
            </BrowserRouter>
        </Provider>
    )
}

export default App;