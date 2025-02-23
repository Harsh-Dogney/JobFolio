import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
        // className='min-h-screen bg-[#C4DAD2]'
        >
            <div className='text-black text-2xl shadow-lg rounded-md border border-gray-500 bg-gray-300 p-6'>
                <Table>
                    <TableCaption className='text-lg'>A list of your recent registered Companies</TableCaption>
                    <TableHeader>
                        <TableRow >
                            <TableHead className='font-semibold text-lg text-black'>Logo</TableHead>
                            <TableHead className='font-semibold text-lg text-black'>Name</TableHead>
                            <TableHead className='font-semibold text-lg text-black'>Date</TableHead>
                            <TableHead className="text-right font-semibold text-lg text-black">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {
                            filterCompany?.map((company) => (
                                <tr className='hover:bg-gray-50 rounded-lg'>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={company.logo} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className=' text-sm font-semibold '>{company.name}</TableCell>
                                    <TableCell className='text-sm font-semibold '>{company.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>

                                </tr>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    )
};
export default CompaniesTable