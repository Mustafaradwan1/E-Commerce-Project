import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const initialState = {
    data : [],
    status:null,
}
const CategoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchCategories.pending,(state,action)=>{
            state.status = "loading"
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.data = action.payload,
            state.status = "success"
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.status = "failed"
        })
    } 
})
export const fetchCategories = createAsyncThunk('Categories/fetch', async()=>{
    const response = await fetch(`https://dummyjson.com/products/categories`)
    const data = await response.json()
    return data
})

export const getCategories = (state)=> state.categories.data
export default CategoriesSlice.reducer