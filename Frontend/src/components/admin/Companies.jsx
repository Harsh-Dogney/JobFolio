import React, { useEffect, useState } from 'react'
import NavBar from '../shared/Navbar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { searchCompanyByText } from '@/redux/companySlice'
import { motion } from 'framer-motion'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(searchCompanyByText(input));
    },[input]);
    return (
        <motion.div
            initial={{ opacity: 1, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen bg-[#6A9C89]' // Apply background color to the whole page
        >
        <div>
            <NavBar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className='w-fit text-base font-semibold'
                        placeholder='Filter by Name'
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={()=>navigate("/admin/companies/create")} className='hover:bg-[#16423C] text-white hover:text-gray-100 bg-black  text-lg'>New Company</Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
        </motion.div>
    )
}

export default Companies
