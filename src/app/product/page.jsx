"use client"
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleProduct, getSingleProduct, } from '@/store/ProductsSlice'
import Image from 'next/image'
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { addToCart, getCartStatus, setCartMessageOff, setCartMessageOn } from '@/store/CartSlice'
import Loading from '@/components/Loading/Loading'

const ProductPage = ({searchParams}) => {
  const [active,setactive] = useState(true)
  const isActive = useSelector(getCartStatus)
  const [select,setselect] = useState("")
  let [count,setcount] =  useState(1)
    const {_id} = searchParams
    const productsData = useSelector(getSingleProduct)
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchSingleProduct(_id))
        setTimeout(() => {
          dispatch(setCartMessageOff())
        }, 3000);
        setTimeout(() => {
          setactive(false)
        }, 1000);
    },[dispatch,_id,isActive])
    const addToCartData = (pro)=>{
      let discountPrice = (pro?.price) - (pro?.price * (pro?.discountPercentage /100))
      let totalPrice = count * discountPrice; 
      dispatch(addToCart({...pro, quantity:count , totalPrice, discountPrice}))
      dispatch(setCartMessageOn())
    }
  return <div className='py-10'>
    {active ? <Loading/> : 
      <div className="container">
        <div className='bg-white'>
          <div className='py-5 px-10'>
            <div className='relative'>
              <Image  src={select === "" ? productsData.thumbnail : productsData?.images[select]}  width="1000" height="200" quality={90} className='w-full h-[320px]'  alt='single-img' />
              <p className='absolute text-gray-100 top-5 left-0 py-2 px-5 bg-teal-500'>{productsData.brand}</p>
            </div>
            <div className='flex justify-center flex-wrap sm:flex-nowrap gap-3 mt-3'>
              {productsData?.images?.map((img,ind)=>(
                <div key={ind} className='mb-3 cursor-pointer shadow p-3'>
                  <Image onMouseOver={()=>{
                    setselect(ind)
                  }} onClick={()=>{
                    setselect(ind)
                  }}  width={2000} height={2000} quality={90}  src={img} className='w-32 h-20' alt='img' />
                </div>
              ))}
            </div>
          </div>
          <div className='px-5 lg:px-10 py-10'>
            <div>
              <p className='text-gray-950 font-bold mb-5 underline'> {productsData.title}</p>
              <p className='text-gray-500 mb-3'><span className='text-gray-950'>description :</span> {productsData.description}</p>
              <div className='flex'>
              <p className='text-teal-500 text-[14px] border-r-[3px] border-gray-300 pr-5 font-bold'>Rating : <span className='text-gray-500'> {productsData.rating}</span></p>
              <p className='text-teal-500 text-[14px] border-r-[3px] border-gray-300 px-5  font-bold'>category :  <span className='text-gray-500'>{productsData.category}</span></p>
              <p className='text-teal-500 text-[14px] px-5 font-bold'>brand : <span className='text-gray-500'> {productsData.brand}</span></p>
              </div>
              <div className='p-5'>
                <p className='text-gray-400 flex gap-3'><span className='line-through '> ${productsData?.price} </span> (inclusive of all taxes)</p>
                <p className='text-teal-500 mt-2 font-bold text-xl flex gap-2'>${(productsData.price - (productsData.price * (productsData.discountPercentage / 100))).toFixed()} <span className='bg-teal-500 h-fit py-[1px] px-2 text-sm font-normal rounded-md text-gray-100'>{Math.floor(productsData.discountPercentage)}% off</span></p>
              </div>
            </div>
            <span>{productsData.stock < 1 ? "stock in zero" : ""}</span>
            <div className='flex gap-2 items-center mb-5'>
              <span className='cursor-pointer w-7 h-6 flex justify-center items-center rounded-sm bg-gray-950 text-gray-100'
                onClick={()=> {
                if(count >=  1 && count < productsData.stock  ){
                  setcount(count + 1)
                  console.log(productsData.stock)
                }else{
                  return null
                }
              }}><FaPlus/></span>
              <span className='w-5 flex items-center justify-center'>{count}</span>
              <span className='cursor-pointer w-7 h-6 flex justify-center items-center rounded-sm bg-gray-950 text-gray-100'
              onClick={()=> {
                if(count <= 1){
                  return null
                }else{
                  setcount(count - 1)
                }
              }}><FiMinus/></span>
            </div>
            <div className='flex gap-3'>
            <button className='cursor-pointer bg-gray-950 text-gray-100 rounded-full py-2 px-5 active:scale-105 transition' onClick={()=>{
            if(localStorage.getItem("Login") !== null){
              addToCartData(productsData)
         
            }else{
              alert("please login")
            }
            }}>Add To Cart</button>
            </div>
          <div>
          </div>
          </div>
        </div>
      </div>
    }
      {isActive ? <div className='bg-teal-500 py-3 rounded-full w-96 text-center text-gray-100 fixed top-20 z-[9999] left-[50%] translate-x-[-50%]'>
        <p>product is added in card</p>
      </div> : ""}
    </div>
  
}

export default ProductPage