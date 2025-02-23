import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
        // className='min-h-screen bg-[#C4DAD2]'
        >
    
    <div className="p-6  rounded-md shadow-lg bg-gray-100">
      <Table className="w-full border-collapse">
        <TableCaption className=" text-lg font-semibold mb-4 ">A list of your recent posted jobs</TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead  className='font-semibold text-lg text-black'>Company Name</TableHead>
            <TableHead  className='font-semibold text-lg text-black'>Role</TableHead>
            <TableHead  className='font-semibold text-lg text-black'>Date</TableHead>
            <TableHead  className='font-semibold text-lg text-black'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-100">
          {filterJobs?.map((job, index) => (
            <TableRow key={index} className="hover:bg-gray-300">
              <TableCell className="p-4 font-semibold">{job?.company?.name}</TableCell>
              <TableCell className="p-4 font-semibold">{job?.title}</TableCell>
              <TableCell className="p-4 font-semibold">{job.createdAt.split('T')[0]}</TableCell>
              <TableCell className="p-4 ">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer hover:text-gray-600 transition-all" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32 p-2 border border-gray-200 rounded-lg shadow-lg bg-white">
                    <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-md">
                      <Edit2 className="w-4 text-gray-500" />
                      <span className="text-base font-medium">Edit</span>
                    </div>
                    <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-md mt-2">
                      <Eye className="w-4 text-gray-500" />
                      <span className="text-base font-medium">Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
    </motion.div>
  );
};

export default AdminJobsTable;
