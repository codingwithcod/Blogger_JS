import React from 'react'
import {TfiSearch} from 'react-icons/tfi'


const SearchBar = () => {
  return (
    <div className='hidden sm:flex rounded-full focus:ring-1 focus:ring-slate-900 relative bg-slate-200  w-[50%]    border border-gray-300'>
        <input 
        className=' outline-none w-full p-2 pl-10 focus:ring-0 rounded-l-full  text-gray-700  '
        type="text"
        placeholder='Search'
         />
      <div className='flex justify-center items-center absolute left-3 top-3 bg-white  mr-2'>
      <TfiSearch className='text-gray-400'/>
      </div>
         <div className='flex justify-center items-center px-5 rounded-full  bg-slate-200 cursor-pointer '>
      <TfiSearch className='text-gray-700 hover:drop-shadow-2xl '/>
      </div>
    </div>
  )
}

export default SearchBar