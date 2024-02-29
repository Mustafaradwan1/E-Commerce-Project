"use client"
import React, { useState } from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link';
import { LoginData } from '@/store/RegisterSlice';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import logo from '../../../public/logo.png'
const Page = () => {
  const [focusemail,setfocusemail] = useState(false)
  const [focusPass,setfocusPass] = useState(false)
  const [Error,setError] = useState("")
  const [More,setMore] = useState(false)
  const dispatch = useDispatch()
  const handle =  (values)=>{
    let val = JSON.parse(localStorage.getItem("Register"))
    if(values.name === val.name && values.password === val.password){
      dispatch(LoginData(values))
      location.href = '/'
    }else{
      setError("the name or password not valid")
    }
}
  let validation = yup.object({
    name:yup.string().required('name is required').min(3,'min length is 3').max(10,'max length is 10'),
    password:yup.string().required('passowrd is required').matches(/^[a-z0-9]{5,10}$/,'password must be minlength is 5 and maxlength is 10'),
  })
  let formik = useFormik({
    initialValues:{
      name:'',
      password:"",
    },
    validationSchema:validation,
    onSubmit:handle,
  })

  return <div className=''>
  <div className='h-auto sticky top-0 z-40 bg-gray-950 shadow shadow-teal-900 w-full'>
        <Link href={'/'}>
            <Image src={logo} alt='Logo-Img' className='logo w-20 sm:w-24 ' />
        </Link>
  </div>
    <div className="container w-full min-h-[100vh] flex justify-center relative items-center z-10">
      <div className='login rounded-sm shadow w-[80%] sm:w-[65%] md:w-[60%] lg:w-[45%] h-auto bg-white py-10 px-5'>
        <h2 className='font-bold text-center text-2xl'>LOG IN</h2>
        <form onSubmit={formik.handleSubmit} className='mt-10 '>
          <div className=' mb-5'>
            <div className='relative'>
            <label className={`${focusemail ? "-top-3  text-gray-950 transition-" : "top-1/2  -translate-y-1/2 text-gray-500"} absolute left-5 bg-white`} htmlFor='name'>UserName</label>
            <input type='text'  id='name'  name='name' className='py-2 px-5  rounded-sm w-full outline-none  border-gray-500 border bg-transparent' onFocus={()=>{setfocusemail(true)}} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
            </div>
            {formik.errors.name && formik.touched.name ? <div className='text-red-500'>{formik.errors.name}*</div>: null}
          </div>
          <div className=' mb-5'>
          <div className='relative mb-10'>
            <label className={`${focusPass ? "-top-3  text-gray-950 transition-" : "top-1/2  -translate-y-1/2 text-gray-500"} absolute left-5 bg-white`} htmlFor='password'>Password</label>
            <input type='password'  id='password'  name='password' className='py-2 px-5  rounded-sm w-full outline-none border-gray-500 border' onFocus={()=>{setfocusPass(true)}} onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
          </div>
          {formik.errors.password && formik.touched.password ? <div className='text-red-500'>{formik.errors.password}*</div>: null}
          </div>
          <div>
            <p className='text-red-500'>{Error}</p>
          </div>
          <p className='flex justify-between mt-3'>
              <span>forget password</span>
              <Link  href={`Register`} className='cursor-pointer underline'>sign up now</Link>
            </p>
          <div className='flex justify-start gap-3 mt-10'>
           <div className="checkbox-wrapper-3">
              <input type="checkbox" id="cbx-3" />
              <label htmlFor="cbx-3" className="toggle"><span></span></label>
            </div>
            <label className='flex flex-col sm:flex-row'>Keep me logged in. <span onClick={()=>setMore(!More)} className='underline cursor-pointer relative'>More info {More && <span className='More-info bg-gray-200 shadow'>By choosing to remain logged in, you will be asked to enter your password far less often. Please only select this option on devices only you have access to.</span>}</span></label>
          </div>
          <div className='mt-5'>
            <button type='submit' className='flex relative items-center gap-5 text-sm bg-gray-950 text-gray-100 hover:text-gray-400 transition btn-login cursor-pointer py-3 px-5 rounded-sm' >
              LOG IN 
              <FaLongArrowAltRight/>
            </button>
          </div>
          <div className='mt-5 grid grid-col-1 sm:grid-cols-2 gap-3'>
            <button className='flex  items-center justify-between gap-5 text-sm border border-gray-600 hover:text-gray-400 transition cursor-pointer py-3 px-5 rounded-sm'>
              FACEBOOK 
              <FaFacebook className='text-xl' />
            </button>
            <button className='flex  items-center justify-between gap-5 text-sm border border-gray-600  hover:text-gray-400 transition cursor-pointer py-3 px-5 rounded-sm'>
              GOOGLE 
              <FaGoogle className='text-xl' />
            </button>
          </div>
          <p className='mt-5'>I have read and accepted <span className='underline'>Store Terms & Conditions</span> and the <span className='underline'>Store Privacy Notice</span></p>
        </form>
      </div>
    </div>
    
  </div>
}

export default Page