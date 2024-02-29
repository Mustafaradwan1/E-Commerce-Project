"use client"
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { postData } from '@/store/RegisterSlice'
import * as yup from 'yup'
import { useState } from 'react'

const Page = () => {
  const [FocusName,setFocusName] = useState(false)
  const [FocusEmail,setFocusEmail] = useState(false)
  const [FocusPass,setFocusPass] = useState(false)
  const [FocusRePass,setFocusRePass] = useState(false)
  const dispatch = useDispatch()
  const [focus,setfocus] = useState(false)
  let validation = yup.object({
    name:yup.string().required('name is required').min(3,'min length is 3').max(10,'max length is 10'),
    email:yup.string().required('email is required').email('email is invalid'),
    password:yup.string().required('passowrd is required').matches(/^[a-z0-9]{5,10}$/,'password must be minlength is 5 and maxlength is 10'),
    rePassword:yup.string().required('rePassword is required').oneOf([yup.ref('password')] ,'password and rePasword dosent match'),
  })

  const handle = (values)=>{
    dispatch(postData(values))
    location.href = '/Login'
  }
  let formik = useFormik({
    initialValues:{
      name:'',
      email:"",
      password:"",
      rePassword:"",
    },
    validationSchema:validation,
    onSubmit:handle,
  })
  return <div>
    <div className="container min-h-[100vh] flex items-center justify-center relative z-10">
      <form className='w-[85%] sm:w-[85%] md:w-[70%] lg:w-[40%] h-auto rounded-md bg-gray-50 py-10 px-5' onSubmit={formik.handleSubmit}>
        <h2 className='text-center font-bold text-2xl mb-10'>sign up</h2>
        <div className='mb-5'>
        <div className='relative '>
            <label className={`${FocusName ? "-top-3  text-gray-950 transition-" : "top-1/2  -translate-y-1/2 text-gray-500"} absolute left-5 bg-white`} htmlFor='name'>UserName</label>
            <input type='text'  id='name'  name='name' className={`${formik.errors.name && formik.touched.name ? "focus:border-red-500 focus:shadow-lg" : "focus:border-green-500 focus:shadow-lg"} py-2 px-5  rounded-sm w-full outline-none   border-gray-500 border bg-transparent`} onFocus={()=>{setFocusName(true)}} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
        </div>
        {formik.errors.name && formik.touched.name ? <div className='text-red-500'>{formik.errors.name}*</div>: null}
        </div>
        <div className='mb-5'>
        <div className='relative'>
            <label className={`${FocusPass ? "-top-3  text-gray-950 transition-" : "top-1/2  -translate-y-1/2 text-gray-500"} absolute left-5 bg-white`} htmlFor='email'>email</label>
            <input type='text'  id='email'  name='email' className={`${formik.errors.email && formik.touched.email ? "focus:border-red-500 focus:shadow-lg" : "focus:border-green-500 focus:shadow-lg"} py-2 px-5  rounded-sm w-full outline-none   border-gray-500 border bg-transparent`} onFocus={()=>{setFocusPass(true)}} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
        </div>
        {formik.errors.email && formik.touched.email ? <div className='text-red-500'>{formik.errors.email}*</div>: null}
        </div>
        <div className='mb-5'>
        <div className='relative'>
            <label className={`${FocusEmail ? "-top-3  text-gray-950 transition-" : "top-1/2  -translate-y-1/2 text-gray-500"} absolute left-5 bg-white`} htmlFor='password'>password</label>
            <input type='password'  id='password'  name='password' className={`${formik.errors.password && formik.touched.password ? "focus:border-red-500 focus:shadow-lg" : "focus:border-green-500 focus:shadow-lg"} py-2 px-5  rounded-sm w-full outline-none   border-gray-500 border bg-transparent`} onFocus={()=>{setFocusEmail(true)}} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
        </div>
        {formik.errors.password && formik.touched.password ? <div className='text-red-500'>{formik.errors.password}*</div>: null}
      </div>
        <div className='mb-5'>
        <div className='relative'>
            <label className={`${FocusRePass ? "-top-3  text-gray-950 transition-" : "top-1/2  -translate-y-1/2 text-gray-500"} absolute left-5 bg-white`} htmlFor='rePassword'>Confirm Password</label>
            <input type='Password'  id='rePassword'  name='rePassword' className={`${formik.errors.rePassword && formik.touched.rePassword ? "focus:border-red-500 focus:shadow-lg" : "focus:border-green-500 focus:shadow-lg"} py-2 px-5  rounded-sm w-full outline-none   border-gray-500 border bg-transparent`} onFocus={()=>{setFocusRePass(true)}} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} />
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ? <div className='text-red-500'>{formik.errors.rePassword}*</div>: null}
      </div>
        <button type='submit' className='py-3 px-5 rounded-sm bg-gray-800 text-gray-100'>submit</button>
      </form>
    </div>
    
  </div>
}

export default Page