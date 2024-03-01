import { createSlice } from "@reduxjs/toolkit";
const fetchDataInLocalStorage = ()=>{
    if(localStorage.getItem("cartLocal")){
        return JSON.parse(localStorage.getItem("cartLocal"))
    }else{
        return []
    }
}

const setCartInLocalStorage = (data)=>{
    localStorage.setItem("cartLocal",JSON.stringify(data))
}
const initialState = {
    CartData : fetchDataInLocalStorage(),
    itemCount :0,
    totalAmount : 0,
    isCartMessageOn:false,
}
const CartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart : (state,action) =>{
            const isItemInCart = state.CartData.find(item => item.id === action.payload.id);
            if(isItemInCart){
                const tempCart = state.CartData.map((item) => {
                    if(item.id === action.payload.id){
                        let temp = item.quantity + action.payload.quantity;
                        let TempTotalPrice = temp * item.discountPrice;
                        console.log(item.price)
                        return {
                            ...item, quantity:temp ,totalPrice:TempTotalPrice 
                        }
                    }else{
                        return item
                    }
                });
                state.CartData = tempCart;
                setCartInLocalStorage(state.CartData);
            }else{
                state.CartData.push(action.payload)
                setCartInLocalStorage(state.CartData)
            }
        },
        setCartMessageOn : (state)=>{
            state.isCartMessageOn= true
        },
        setCartMessageOff : (state)=>{
            state.isCartMessageOn= false
        },
        clearCard : (state)=>{
            state.CartData = []
            setCartInLocalStorage(state.CartData)
        },
        removeItem : (state,action)=>{
            const tempCart = state.CartData.filter((item)=>item.id !== action.payload);
            state.CartData = tempCart;
            setCartInLocalStorage(state.CartData)
        },
        getCartTotal : (state) => {
            state.totalAmount = state.CartData.reduce((cartTotal,cartItem)=>{
                return cartTotal += cartItem.totalPrice
            },0)
            state.itemCount = state.CartData.length
        },
        toggleCartQty : (state,action)=>{
            const tempCart = state.CartData.map((item)=>{
                if(item.id === action.payload.id){
                    let tempQty = item.quantity
                    let tempTotalPrice = item.totalPrice
                    if(action.payload.type === "INC"){
                        tempQty++
                        if(tempQty >= item.stock) tempQty = item.stock;
                        tempTotalPrice = tempQty * item.discountPrice
                    }
                    if(action.payload.type === "DEC"){
                        tempQty--
                        if(tempQty < 1) tempQty = 1;
                        tempTotalPrice = tempQty * item.discountPrice
                    }
                    return {...item ,quantity:tempQty, totalPrice:tempTotalPrice }
                }else{
                    return item;
                }
            })
            state.CartData = tempCart;
            setCartInLocalStorage(state.CartData)
        },
    },
})

export const getAllCart = (state)=> state.cart.CartData
export const getCartStatus = (state)=> state.cart.isCartMessageOn
export const getItemCount= (state)=> state.cart.itemCount
export const {addToCart,setCartMessageOn,setCartMessageOff,toggleCartQty,clearCard,getCartTotal,removeItem} = CartSlice.actions
export default CartSlice.reducer