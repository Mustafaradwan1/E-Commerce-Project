import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";

const SearchBar = () => {
  const [search,setsearch] = useState("")
  useEffect(()=>{

  }),[search]
  return <div className='flex-1 flex bg-gray-100 rounded-full overflow-hidden border-0'>
      <input type='text' onChange={(e)=>setsearch(e.target.value)}   value={search} placeholder='Search Products' className='rounded-full  px-5 w-full outline-none' />
      <Link href={{pathname:'search',query:{q:search}}} className='w-14 h-10 border-0 bg-gray-950 flex justify-center items-center'>
        <CiSearch onClick={()=>{
      setsearch('')
        }} className='text-gray-100 text-2xl cursor-pointer'/>
      </Link>
    </div>
}

export default SearchBar