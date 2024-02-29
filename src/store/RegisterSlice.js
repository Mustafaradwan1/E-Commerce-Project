import { createSlice } from "@reduxjs/toolkit";

const setRegisterInLocalStorage = (arr)=>{
    localStorage.setItem("Register",JSON.stringify(arr))
}
const setLoginInLocalStorage = (arr)=>{
    localStorage.setItem("Login",JSON.stringify(arr))
}
const initialState = {
    data : [],
    login : []
}

const RegisterSlice = createSlice({
    name:'register',
    initialState,
    reducers:{
        postData : (state,action)=>{
            state.data = action.payload
            setRegisterInLocalStorage(state.data)
        },
        LoginData : (state,action)=>{
            state.data = action.payload
            setLoginInLocalStorage(state.data)
        },
    }
  

    

})

export const  {postData,LoginData } = RegisterSlice.actions

export default RegisterSlice.reducer