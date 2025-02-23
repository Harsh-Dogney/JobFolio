import React, { useEffect, useState } from 'react'
import NavBar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchCompanyByText } from '@/redux/companySlice'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { searchJobByText } from '@/redux/jobSlice'
import { motion } from 'framer-motion'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{        
        dispatch(searchJobByText(input));
    },[input]);
    return (
        <motion.div
            initial={{ opacity: 1, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen bg-[#729286]' // Apply background color to the whole page
        >
        <div>
            <NavBar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className='w-fit text-base font-semibold'
                        placeholder='Filter by Name, role'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button className='text-lg hover:bg-gray-700' onClick={()=>navigate("/admin/jobs/create")}>New Job</Button>
                </div>
                <AdminJobsTable/>
            </div>
        </div>
        </motion.div>
    )
}

export default AdminJobs
