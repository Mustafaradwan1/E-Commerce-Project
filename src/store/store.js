import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "./SidebarSlice";
import CategoriesSlice from "./CategoriesSlice";
import ProductsSlice from "./ProductsSlice";
import CategoryProduct from "./CategoryProduct";
import SearchProduct from "./SearchProduct";
import CartSlice from "./CartSlice";
import RegisterSlice from "./RegisterSlice";



const store = configureStore({
    reducer:{
        sidebar:SidebarSlice,
        categories:CategoriesSlice,
        Products:ProductsSlice,
        category:CategoryProduct,
        search:SearchProduct,
        cart:CartSlice,
        register:RegisterSlice, 
    }
})
export default store