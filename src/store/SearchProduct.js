import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState = {
    SearchProductData : [],
    SearchProductsStatus:null,
}
const SearchProduct = createSlice({
    name:'search',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchSearchProduct.pending,(state)=>{
            state.SearchProductsStatus = "loading"
        })
        .addCase(fetchSearchProduct.fulfilled,(state,action)=>{
            state.SearchProductData = action.payload,
            state.SearchProductsStatus = "success"
        })
        .addCase(fetchSearchProduct.rejected,(state)=>{
            state.SearchProductsStatus = "failed"
        })
    } 
})
export const fetchSearchProduct = createAsyncThunk('search/fetch', async(name)=>{
    const response = await fetch(`https://dummyjson.com/products/search?q=${name}`)
    const data = await response.json()
    return data.products
})

export const getSearchProduct = (state)=> state.search.SearchProductData
export default SearchProduct.reducer