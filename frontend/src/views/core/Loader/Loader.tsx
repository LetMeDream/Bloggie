import React from 'react'
import './Loader.css'

const Loader = () => {
  return (
    <div className='fixed top-0 z-[999] h-[100vh] w-full flex justify-center items-center bg-white opacity-100'>
      <span
        className='loader'  
      >

      </span>
    </div>
  )
}

export default Loader