import React, { useEffect } from 'react'
import NavBar from './shared/Navbar.jsx'
import HeroSection from './HeroSection.jsx'
import CategoryCarousel from './CategoryCarousel.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './shared/Footer.jsx'
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx'
import { useSelector } from 'react-redux'
import store from '@/redux/store.js'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if(user?.role == 'recruiter'){
      navigate("/admin/companies");
    }
  },[]);


  return (
    <motion.div
      initial={{ opacity: 1, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#6A9C89] "
    >
    <div>
        <NavBar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJobs/>
        <Footer/>
    </div>
    </motion.div>
  )
}


export default Home