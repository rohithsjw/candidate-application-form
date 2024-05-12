import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        role: [],
        location:[],
        experience:[],
        salary:[],
        company:[]
    },
    reducers: {
        addToFilters: function(state,action){
            if(action.payload.type =="company"){
                state[action.payload.type] = action.payload.value;
            }else{
                state[action.payload.type].push(action.payload.value);
            }     
               
        },
        removeFromFilters: function(state,action){
            state[action.payload.type] = state[action.payload.type].filter(elem=> action.payload.value !==elem );
        },

        clearFilter: function(state,action){
            state[action.payload[0].type].length = 0;
        }

    }
});

export const {addToFilters,removeFromFilters,clearFilter} = filterSlice.actions;
export default filterSlice.reducer;