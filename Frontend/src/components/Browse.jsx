import React, { useEffect } from 'react'
import NavBar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';


// const randomJaobs = [1,2,3,4];
const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [])
    return (
        <motion.div
            initial={{ opacity: 1, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen bg-[#C4DAD2]'

        >
            <div className=''>
                <NavBar />
                <div className='max-w-7xl mx-auto my-10'>
                    <h1 className='font-bold text-xl'>Search Results ({allJobs.length})</h1>
                    <div className='grid grid-cols-3 gap-4 mt-5'>
                        {
                            allJobs.map((job) => {
                                return (
                                    <motion.div
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        key={job?._id}>
                                        <Job key={job._id} job={job} /></motion.div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Browse