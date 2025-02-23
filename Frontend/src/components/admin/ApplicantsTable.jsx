import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { motion } from 'framer-motion';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  // State to control the open state of the popover for each applicant row
  const [openPopover, setOpenPopover] = useState(null);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
      if (res.data.success) {
        toast.success(res.data.message);
        // Close the popover after status is updated
        setOpenPopover(null);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 bg-white rounded-md shadow-lg border-gray-700">
        <Table className="w-full border-collapse">
          <TableCaption className="text-lg font-semibold mb-4">A list of your recent applied Applicants</TableCaption>
          <TableHeader className="hover:bg-gray-100">
            <TableRow>
              <TableHead className="p-4 text-lg font-semibold text-black">Full Name</TableHead>
              <TableHead className="p-4 text-lg font-semibold text-black">Email</TableHead>
              <TableHead className="p-4 text-lg font-semibold text-black">Contact</TableHead>
              <TableHead className="p-4 text-lg font-semibold text-black">Resume</TableHead>
              <TableHead className="p-4 text-lg font-semibold text-black">Date</TableHead>
              <TableHead className="p-4 text-lg font-semibold text-black">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants && applicants?.applications?.map((item, index) => (
              <TableRow key={item._id} className="hover:bg-gray-50">
                <TableCell className="p-4 text-base">{item?.applicant?.fullname}</TableCell>
                <TableCell className="p-4 text-base">{item?.applicant?.email}</TableCell>
                <TableCell className="p-4 text-base">{item?.applicant?.phoneNumber}</TableCell>
                <TableCell className="p-4 text-base">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="hover:text-blue-600 text-base cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-gray-500">NA</span>
                  )}
                </TableCell>
                <TableCell className="p-4 text-base">{item?.applicant.createdAt.split('T')[0]}</TableCell>
                <TableCell className="p-4 cursor-pointer">
                  <Popover
                    open={openPopover === item._id}  // Open if the current row is clicked
                    onOpenChange={(open) => setOpenPopover(open ? item._id : null)}  // Toggle popover state
                  >
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer hover:text-gray-600 transition-all" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2 border border-gray-200 rounded-lg shadow-lg bg-white">
                      {shortlistingStatus.map((status, statusIndex) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={statusIndex}
                          className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-md"
                        >
                          <span className="text-base font-medium">{status}</span>
                        </div>
                      ))}
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

export default ApplicantsTable;
