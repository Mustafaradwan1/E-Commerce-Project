import React from 'react'

const Loading = () => {
  return <div className='absolute z-[99999] top-0 left-0  w-full h-[100vh] bg-gray-700 '>
    <div className="wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="shadows"></div>
        <div className="shadows"></div>
        <div className="shadows"></div>
        <span>Loading</span>
    </div>
  </div>
  
}

export default Loading