"use client"
import Image from 'next/image'
import { HiOutlineShoppingCart } from "react-icons/hi";
import {removeItem, getAllCart, toggleCartQty } from "@/store/CartSlice"
import { useDispatch, useSelector } from "react-redux"
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';
import Link from 'next/link';

const Cart = () => {
  
  let num =0;
  const [active,setactive] = useState(true)
  const AllCart = useSelector(getAllCart)
  const dispatch = useDispatch()
  console.log(AllCart)
  if(AllCart !== null){
    for(let i = 0; AllCart.length  > i ;i++){
      num += AllCart[i].totalPrice 
    }
  }
  console.log(AllCart.length)
  if(AllCart.length === 0){
    localStorage.removeItem("cartLocal")
  }
  useEffect(()=>{
    setTimeout(() => {
      setactive(false)
    }, 1000);
  },[])
  return <>
      {active ? 
      <Loading/>
      : 
      <div className='container'>
      {AllCart.length > 0 ? 
      <div className=' lg:flex  gap-2 mt-5'>
      <div className='w-full mb-2 lg:w-[70%] bg-white rounded-sm   px-5 pb-5'>
        <div className='border-b border-gray-300 py-2'>Cart({AllCart.length})</div>
        {AllCart.map((item)=>(
          <div key={item.id} className='border-b border-gray-300 last:border-none mt-2 pb-2'>
            <div className='w-full '>
            <div className='sm:flex justify-between items-center '>
                <Link href={{pathname:"product",query:{_id:item?.id}}} className="flex items-center justify-center gap-2">
                  <Image src={item?.thumbnail} width={200} height={200} alt="img" className="w-20"  />
                  <div className=''>
                    <p>{item.title}</p>
                    <div className='flex gap-1 items-center text-red-800'>
                      <MdOutlineReportGmailerrorred/>
                      <span className='text-[12px]'>{item.stock} units left</span>
                    </div>
                  </div>
                </Link>
                <div className='text-end flex flex-row sm:flex-col items-center justify-between '>
                  <p>EGP {new Intl.NumberFormat().format(item.totalPrice)}</p>
                  <div className='flex items-center gap-1 mt-1'>
                    <p className='line-through text-gray-400'>EGP {new Intl.NumberFormat().format(item.price)}</p>
                    <span className='text-orange-500 p-1 rounded-sm bg-orange-100'>{new Intl.NumberFormat().format(item.discountPercentage)}%</span>
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center mt-5'>
                <button className='px-3 py-1 hover:bg-orange-100 text-orange-500 rounded-sm cursor-pointer ' onClick={()=>{
                  dispatch(removeItem(item.id))
                  }}>
                  <div className='flex items-center text-lg gap-2'>
                    <MdOutlineDelete/>
                    Remove
                  </div>
                </button>
                <div className='flex'>
                  <button className={`${item.quantity === 1 ? "bg-orange-200" : "bg-orange-400"} w-8 h-8 rounded-sm flex justify-center items-center  shadow-md text-gray-100`}><FiMinus onClick={()=>{dispatch(toggleCartQty({id:item.id,type:"DEC"}))}} /></button>
                  <button className='w-7 h-7 rounded-sm flex justify-center items-center '>{item.quantity}</button>
                  <button className='w-8 h-8 rounded-sm flex justify-center items-center bg-orange-400 shadow-md text-gray-100'><FaPlus onClick={()=>{dispatch(toggleCartQty({id:item.id,type:"INC"}))}} /></button>
                </div>
              </div>
            </div>
      
          </div>
        ))}
        
      </div>
      <div className='flex-1 '>
        <div className=' bg-white rounded-sm h-fit px-3 pb-3'>
          <div className='py-1 border-b border-gray-300'>
            <span className=''>CART SUMMARY</span>
          </div>
          <div className='p-1 border-b border-gray-300 flex justify-between'>
                <span className=''>subTotal</span>
                <span className=''>EGP {new Intl.NumberFormat().format(num)}</span>
              </div>
              <div className='p-1 border-b border-gray-300 flex justify-between'>
                <button className='w-full py-[10px] rounded-sm bg-orange-400 text-gray-100 text-sm'>CHECKOUT (EGP {new Intl.NumberFormat().format(num)})</button>
              </div>
        </div>
      </div>
      </div>
       : 
        <div className='bg-white w-full py-10 my-2 flex flex-col justify-center items-center gap-4'>
          <div className='text-[70px] p-2 rounded-full bg-gray-200'><HiOutlineShoppingCart/></div>
          <p>Your cart is empty!</p>
          <p>Browse our categories and discover our best deals!</p>
          <Link href={'/'} className='shadow-lg rounded-sm w-fit px-3 py-2 bg-orange-400 text-gray-100'>START SHOPPING</Link>
        </div> 
      }
    </div>
     }
  </>
}

export default Cart