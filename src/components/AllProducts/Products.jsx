import React from 'react'
import { getProducts,fetchProducts } from '@/store/ProductsSlice'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {motion} from 'framer-motion'
const Products = () => {
    const  [num,setnum] = useState(15)
    const  [curr,setcurr] = useState(0)
    const productsData = useSelector(getProducts)
    const dispatch = useDispatch()
    const randomProducts = [];
    if(productsData.length > 0){
      for(let i in productsData){
        let randomIndex = Math.floor(Math.random() * productsData.length)
        while (randomProducts.includes(productsData[randomIndex])) {
          randomIndex = Math.floor(Math.random() * productsData.length)
        }
        randomProducts[i] = productsData[randomIndex]
      }
    }
    useEffect(()=>{
      dispatch(fetchProducts(45))
    },[dispatch])
  return <div>
           <motion.div
              initial={{opacity:0,y:100}}
              whileInView={{opacity:1,y:0}}
              transition={{duration:0.5}}
        className=''>
        <h2 className='bg-white mb-16 productHead  relative shadow-lg rounded-br rounded-tr   py-3 px-5 w-full m-auto'>SEE OUR PRODUCTS</h2>
          {productsData.length === 0 ? <span>loading</span> : 
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
            {randomProducts.slice(curr,num).map((item,ind)=>(
              <div key={item.id} className='relative shadow'>
              <Link href={{pathname:'/product',query:{_id:item?.id}}}  className=''>
                <span className='absolute category z-10 top-5 left-0 bg-orange-500 p-2  w-40 text-gray-100'>{item.category}</span>
                <div className='w-full h-64'>
                  <Image src={item?.thumbnail} width={400} height={200 } quality={90} className='w-full h-full '  alt='' />
                </div> 
                <div className='px-5 py-3 text-center'>
                <p className='text-gray-950 font-bold'>Brand: <span className='text-gray-700 font-normal'>{item.brand}</span></p>
                 <p className='text-gray-700'>{item.title}</p>
                 <div className='flex justify-center gap-3'>
                  <span className='line-through text-gray-400'>${item.price}</span>
                  <span className='font-bold underline'>${((item.price) - (item.price * (item.discountPercentage /100) )).toFixed()}</span>
                  <span className='text-teal-500'>({(item.discountPercentage).toFixed()}%off)</span>
                 </div>
                </div>
              </Link>
              </div>
          ))}
            </div>
          }
          <div className='flex gap-3 mt-5 justify-center'>
            <span className={`${num === 15 ? "bg-teal-500 hover:shadow-teal-500 text-gray-100" : "bg-gray-300 text-gray-900 hover:shadow-black/25"} flex justify-center items-center w-7 h-7 rounded-full cursor-pointer hover:shadow-lg `}
            onClick={()=>{
              setnum(15)
              setcurr(0)
              }}>1</span>
            <span className={`${num === 30 ? "bg-teal-500 hover:shadow-teal-500  text-gray-100" : "bg-gray-300 text-gray-950 hover:shadow-black/25"} w-7 flex justify-center items-center h-7 rounded-full   cursor-pointer hover:shadow-lg `} onClick={()=>{
            setnum(30)
            setcurr(15)
            }}>2</span>
            <span className={`${num === 45 ? "bg-teal-500 hover:shadow-teal-500  text-gray-100" : "bg-gray-300 text-gray-950 hover:shadow-black/25"} w-7 flex justify-center items-center h-7 rounded-full   cursor-pointer hover:shadow-lg`}
            onClick={()=>{
              setnum(45)
              setcurr(30)
              }}>3</span>
          </div>
        </motion.div>
  </div>
  
}

export default Products