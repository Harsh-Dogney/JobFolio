import React, { useState } from 'react';
import NavBar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { motion } from 'framer-motion';

const CreateCompany = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve JWT token if needed

      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log('Error from register new company: ', error.response ? error.response.data : error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen flex flex-col bg-[#C4DAD2]' // Apply background color to the whole page
    >
        <NavBar />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          className='flex-grow' 
        // className='min-h-screen bg-[#C4DAD2]'
        >
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-8">
          <h1 className="font-bold text-3xl mb-2">Your Company Name</h1>
          <p className="text-gray-600 font-semibold">What will be your company name? You can change this later.</p>
        </div>
        <div>
          <Label className="text-lg font-semibold">Company Name</Label>
          <Input
            type="text"
            className="my-3 border border-gray-300 p-3 rounded-md w-full focus:ring-2 focus:ring-indigo-500 font-semibold"
            placeholder="JobHunt, Microsoft, etc..."
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 mt-8 ">
          <Button variant="outline" onClick={() => navigate('/admin/companies')} className="px-6 py-3 border border-gray-400 text-gray-600 hover:bg-gray-200 font-semibold">
            Cancel
          </Button>
          <Button onClick={registerNewCompany} className="px-6 py-3 font-semibold bg-indigo-600 text-white hover:bg-indigo-900">
            Continue
          </Button>
        </div>
      </div>
      </motion.div>
      </motion.div>  );
};

export default CreateCompany;
