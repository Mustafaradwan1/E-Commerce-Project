"use client"
import { fetchSearchProduct, getSearchProduct } from '@/store/SearchProduct'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@/components/Loading/Loading'
import {motion} from 'framer-motion'
const Search = ({searchParams}) => {
  const [active,setactive] = useState(true)
    const {q} = searchParams
    const getSearchApi = useSelector(getSearchProduct)
    console.log(getSearchApi)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchSearchProduct(q))
        setTimeout(() => {
          setactive(false)
        }, 1000);
    },[dispatch,q])
  return <div className='py-10'>
    {active ? <Loading/> : 
    <div className="container">
      {getSearchApi != '' ? 
              <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'>
              {getSearchApi.map((item)=>(
                  <motion.div
                  initial={{opacity:0,y:30}}
                  animate={{opacity:1,y:0}}
                  transition={{duration:0.5}}
                  key={item.id} className='shadow relative'>
                  <Link href={{pathname:'/product',query:{_id:item?.id}}}  className=''>
                  <span className='absolute category z-20 top-5 left-0 bg-orange-500 p-2  w-40 text-gray-100'>{item.category}</span>
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
                  </motion.div>
              ))}
          </div> :
          <div>
          <span>no product from this search</span>  
          </div>}
    </div>
    }
  </div>
  
}

export default Search