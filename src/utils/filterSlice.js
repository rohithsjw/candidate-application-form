import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filters',
    initialState: {
        roles: [],
        location:[]
    },
    reducers: {
        addToFilters: function(state,action){
            if(action.payload.length > 0){
                state.roles = action.payload.map(val=> val.value);
            }else{
                state.roles =[];
            }
            
        }
    }
});

export const {addToFilters,removeFromFilters} = filterSlice.actions;
export default filterSlice.reducer;