import {  combineReducers, applyMiddleware } from 'redux';
import reducer from './reducer'
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
// import {ConfigureStore} from '@reduxjs/toolkit'
import { legacy_createStore as createStore } from '@reduxjs/toolkit';

export const ConfigureStore = () => {

    let middleware = [];
    if (import.meta.env.MODE === 'development') {
        middleware = [...middleware, thunk, logger];
    } else {
        middleware = [...middleware, thunk];
    }
    // let middleware = [thunk];
    // if (import.meta.env.MODE === 'development') {
    //     middleware.push(logger);
    //   }
    
    //   const store = configureStore({
    //     reducer: {
    //       resume: resumeReducer,
    //     },
    //     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    //   });

    const store = createStore(
        combineReducers({
            resume: reducer,
        }),
        applyMiddleware(...middleware)
    );

    return store;
}

