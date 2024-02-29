import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const initialState = {
    CategoryProductData : [],
    CategoryProductsStatus:null,
}
const CategoryProduct = createSlice({
    name:'category',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder

        .addCase(fetchProductCategory.pending,(state,action)=>{
            state.CategoryProductsStatus = "loading"
        })
        .addCase(fetchProductCategory.fulfilled,(state,action)=>{
            state.CategoryProductData = action.payload,
            state.CategoryProductsStatus = "success"
        })
        .addCase(fetchProductCategory.rejected,(state,action)=>{
            state.CategoryProductsStatus = "failed"
        })

    } 
})
export const fetchProductCategory = createAsyncThunk('Category/fetch', async(name)=>{
    const response = await fetch(`https://dummyjson.com/products/category/${name}`)
    const data = await response.json()
    return data.products
})

export const getCategoryProduct = (state)=> state.category.CategoryProductData
export default CategoryProduct.reducer