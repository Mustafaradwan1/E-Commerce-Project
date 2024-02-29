"use client"
import Image from 'next/image'
import logo from '../../../public/logo.png'
import Sidebar from './Sidebar'
import { FaBarsStaggered } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux'
import { setSidebarOn } from '@/store/SidebarSlice'

import SearchBar from './SearchBar'
import Link from 'next/link'
import {motion} from 'framer-motion'
import ShoppingCart from './ShoppingCart'
import NavTop from './NavTop'
import { useEffect, useState } from 'react'
const Navbar = () => {
  const [animation,setanimation] = useState(true)

  const dispatch = useDispatch()
  useEffect(()=>{
    setTimeout(()=>{
      setanimation(false)
    },1000)
  },[])
  return <>
  {animation ? "" : 
    <div className='h-auto  sticky top-0 z-40 bg-gray-900 border-b-gray-200 border-b-[1px] w-full'>
    <div className="container  h-full px-3">
    <motion.div
    initial={{opacity:0,y:-30}}
    animate={{opacity:1,y:0}}>
      <NavTop/>
    </motion.div>
      <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{duration:0.5}}
      className='flex items-center justify-between'>
        <motion.div
           initial={{opacity:0,x:-50}}
           animate={{opacity:1,x:0}}
           transition={{duration:0.7}}
          className='flex items-center overflow-hidden'>
          <FaBarsStaggered className='cursor-pointer text-gray-200 text-2xl' onClick={()=>dispatch(setSidebarOn())
          } />
          <Link href={'/'}>
            <Image src={logo} alt='Logo-Img' className='logo w-16 sm:w-20' />
          </Link>
        </motion.div>
        <div className='hidden sm:block flex-1'><SearchBar/></div>
        <motion.div
                initial={{opacity:0,x:50}}
                animate={{opacity:1,x:0}}
                transition={{duration:0.7}}>
          <ShoppingCart/>
        </motion.div>
      </motion.div>
    </div>
  </div>
  }
  <Sidebar/>
  </>
}

export default Navbar