import { getCategories } from '@/store/CategoriesSlice'
import { getProducts } from '@/store/ProductsSlice'
import Image from 'next/image'
import Link from 'next/link'
import {motion} from 'framer-motion'

import { useSelector } from 'react-redux'
const Laptops = () => {

    const productsData = useSelector(getProducts)
    let selectCat = useSelector(getCategories)
    let Filter = productsData.filter((item,ind)=>{
        if(item.category === selectCat[2]){
          return item
        }
      })
  return  <div>
                <motion.div
      initial={{opacity:0,y:100}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:0.5}}
    className='mb-10'>
        <h2 className='bg-white mb-16 productHead  relative shadow-lg rounded-br rounded-tr   py-3 px-5 w-full m-auto'>SEE OUR <span className="uppercase">{selectCat[0]}</span></h2>
          {Filter.length === 0 ? <span>loading</span> : 
            <div
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5'>
            {Filter.map((item,ind)=>(
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
        </motion.div>
  </div>
  
}

export default Laptops