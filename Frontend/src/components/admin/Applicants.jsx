import React, { useEffect } from 'react'
import NavBar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import store from '@/redux/store'
import { motion } from 'framer-motion'

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {applicants} = useSelector(store=>store.application)
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.log(error)
      }
    }
    fetchApplicants();
  }, [])
  return (
    <motion.div
            initial={{ opacity: 1, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            // className='min-h-screen bg-[#6A9C89]' // Apply background color to the whole page
        >
    <div>
      <NavBar />
      <div className='max-w-7xl mx-auto my-14'>
        <h1 className='font-bold text-xl my-5'>Applicants: {applicants?.applications?.length}</h1>
        <ApplicantsTable />
      </div>
    </div>
    </motion.div>
  )
}

export default Applicants