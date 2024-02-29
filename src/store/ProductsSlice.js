import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    AllProducts : [],
    ProductsStatus:null,
    ProductsSingle : [],
    ProductsSingleStatus:null,
}
const ProductsSlice = createSlice({
    name:'Products',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.AllProducts = action.payload,
            state.ProductsStatus = "success"
        })
        .addCase(fetchProducts.pending,(state)=>{
            state.ProductsStatus = "loading"
        })
        .addCase(fetchProducts.rejected,(state)=>{
            state.ProductsStatus = "failed"
        })
        .addCase(fetchSingleProduct.fulfilled,(state,action)=>{
            state.ProductsSingle = action.payload,
            state.ProductsSingleStatus = "success"
        })
        .addCase(fetchSingleProduct.pending,(state)=>{
            state.ProductsSingleStatus = "loading"
        })
        .addCase(fetchSingleProduct.rejected,(state)=>{
            state.ProductsSingleStatus = "failed"
        })

    } 
})
export const fetchProducts = createAsyncThunk('Products/fetch', async(limit)=>{
    const response = await fetch(`https://dummyjson.com/products?limit=${limit}`)
    const data = await response.json()
    return data.products
})
export const fetchSingleProduct = createAsyncThunk('SingleProduct/fetch', async(id)=>{
    const response = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await response.json()
    return data
})

export const getProducts = (state)=> state.Products.AllProducts
export const getSingleProduct = (state)=> state.Products.ProductsSingle
export default ProductsSlice.reducer