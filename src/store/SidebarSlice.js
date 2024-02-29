import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOn : false
}

const SidebarSlice = createSlice({
    name:'sidebar',
    initialState,
    reducers:{
        setSidebarOn : (state)=>{
            state.isSidebarOn = true
        },
        setSidebarOff : (state)=>{
            state.isSidebarOn = false
        }
    }
})
export const getSidebarStatus = (state)=> state.sidebar.isSidebarOn

export const {setSidebarOn,setSidebarOff} = SidebarSlice.actions;
export default SidebarSlice.reducer