"use client"
import Fragrannces from "./Fragrannces"
import Laptops from "./Laptops"
import Products from "./Products"
import SmartPhone from "./SmartPhone"
import Loading from "../Loading/Loading"
import { useEffect, useState } from "react"

const AllProducts = () => {
  const [active,setactive] = useState(true)
    useEffect(()=>{
      setTimeout(() => {
        setactive(false)
      }, 1000);
    },[])
  return <div className='py-10 '>
    <div className='container'>
     {active  ? <Loading/> : 
  <div>
  <SmartPhone/>
  <Laptops/>
  <Fragrannces/>
  <Products/>
 </div> 
     }
    </div>
  </div>
  
}

export default AllProducts