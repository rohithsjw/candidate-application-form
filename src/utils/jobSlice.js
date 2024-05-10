import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:'jobs',
    initialState: {
        jobsData: [],
        filteredJobs:[],
        scrollToggle:false
    },
    reducers: {
        addToJobs: function(state,action){
            state.jobsData.push(...action.payload);
        },

        addToFilteredJobs:function(state,action){
            state.filteredJobs = action.payload;
        },

        toggleScroll: function(state){
            state.scrollToggle = !state.scrollToggle;
        }
    }
});

export const {addToJobs,addToFilteredJobs,toggleScroll} = jobSlice.actions;
export default jobSlice.reducer;