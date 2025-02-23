import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Perform the search or display the result
      dispatch(setSearchedQuery(query));
      navigate("/browse");
      // You can set a state or make an API call here
      // Example: fetchJobs(query);
    }
  };
  return (
   
    <div className='text-center rounded-sm'>
      <div className='flex flex-col gap-5 py-16 bg-[#6A9C89]'>
        <span className='mx-auto px-4 py-1 rounded-full  font-bold text-[#2A2A2A] text-2xl '>A place for Job Hunt</span>
        <h1 className='text-6xl font-bold transition-transform duration-300 hover:scale-110' >Search, Apply & <br />Get Your <span className='text-[#2A2A2A]'>Dream Jobs</span></h1>
        <p className='text-2xl text-[#333333] mx-10 '>A platform that connects job seekers and recruiters, making the hiring process easy and efficient. Find your dream job or top talent today!</p>
        <div className='flex w-[40%] shadow-lg border my-6 border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto bg-[#F0EDE5] transition-transform duration-300 hover:scale-110'>
          <input  type="text"
           placeholder='Find your dream jobs'
           onChange={(e)=>setQuery(e.target.value)}
           onKeyDown={handleKeyPress} // Detect Enter key press
            className='outline-none border-none w-full font-medium bg-[#F0EDE5]' />
          <Button onClick={searchJobHandler} className='rounded-r-full bg-[#2A2A2A]'>
            <Search className='h-5 w-5' />
          </Button>
          
        </div>
      </div>

    </div>
    
  )
}

export default HeroSection