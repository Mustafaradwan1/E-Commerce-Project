import { createSlice } from "@reduxjs/toolkit";
const fetchRegisterInLocalStorage = ()=>{
    let RegisterData = localStorage.getItem("Register")
    if(RegisterData){
        return JSON.parse(localStorage.getItem("Register"))
    }else{
        return []
    }
}
const setRegisterInLocalStorage = (arr)=>{
    localStorage.setItem("Register",JSON.stringify(arr))
}

const fetchLogoutInLocalStorage = ()=>{
    let login = localStorage.getItem("Login")
    if(login){
        return JSON.parse(localStorage.getItem("Login"))
    }else{
        return []
    }
}
const setLoginInLocalStorage = (arr)=>{
    localStorage.setItem("Login",JSON.stringify(arr))
}

const initialState = {
    data : fetchRegisterInLocalStorage(),
    login : fetchLogoutInLocalStorage()
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