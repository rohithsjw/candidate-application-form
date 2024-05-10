import { configureStore } from "@reduxjs/toolkit";
import filterReducer from './filterSlice';
import jobReducer from './jobSlice';

const appStore = configureStore({
    reducer:{
        filters: filterReducer,
        jobs: jobReducer 
    }
});

export default appStore;