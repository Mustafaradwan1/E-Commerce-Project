import { getAllCart } from '@/store/CartSlice'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const ShoppingCart = () => {
    const local = localStorage.getItem("Login") 
    const AllCart = useSelector(getAllCart)
  return <div>
    <Link href={"Cart"} className='hover:shadow-lg group hover:shadow-teal-500 transition relative ml-5 bg-gray-200 h-10 w-10 rounded-full flex justify-center items-center cursor-pointer text-gray-900 z-50'>
        <FaShoppingCart className='text-1xl' />
        <span className='absolute -top-1 -right-1 bg-teal-500 rounded-full w-5 h-5 flex justify-center items-center '>{local ? <div>{AllCart !== null ? `${AllCart.length}` : "0"}</div> : "0" }</span>
    </Link>
  </div>
  
}

export default ShoppingCart