import Link from 'next/link'
import { fetchCategories, getCategories } from '@/store/CategoriesSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdCloseCircle } from "react-icons/io";
import { getSidebarStatus, setSidebarOff } from '@/store/SidebarSlice'
import SearchBar from './SearchBar'
const Sidebar = () => {
    const categories = useSelector(getCategories)
    const side = useSelector(getSidebarStatus)

    const dispatch = useDispatch()
   useEffect(()=>{
    dispatch(fetchCategories())
   },[dispatch])
  return <>
  {side &&  <div className='fixed overflow-y-scroll sidebar z-50  p-5 py-10 top-0 left-0 w-full sm:w-64 h-[100vh] bg-gray-50 shadow'>
    <div onClick={()=>dispatch(setSidebarOff())} className='text-2xl absolute top 0 right-5 cursor-pointer'>
      <IoMdCloseCircle/>
    </div>
    <h2 className='mb-7 font-bold'>All Categories</h2>
    <ul>
    {categories.map((item)=>(
      <li  key={item} className='mb-2 pb-2 border-b transition hover:translate-x-2 cursor-pointer'>
            <Link href={{pathname:'/category',query:{_id:item}}}   onClick={()=>dispatch(setSidebarOff()) }className='text-gray-500 transition first:text-gray-500 cursor-pointer hover:text-gray-950'>{item.replace("-"," ")}
           </Link> 
        </li>
    ))}
    <div className='block sm:hidden'>
    <SearchBar/>
    </div>
    </ul>

  </div>}

    </>
  
}

export default Sidebar