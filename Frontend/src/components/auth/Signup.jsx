import React, { useEffect, useState } from 'react';
import NavBar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios'; // Ensure axios is imported
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true,
      });

      if (res && res.data) {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/login");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error in API call:", error);
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/")
    }
  });

  return (
    <motion.div
            initial={{ opacity: 1, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen bg-[#6A9C89]' // Apply background color to the whole page
        >
    <div>
      <NavBar />
      <motion.div
                                            initial={{opacity:0, x:100}}
                                            animate={{opacity:1,x:0}}
                                            exit={{opacity:0,x:-100}}
                                            transition={{duration:0.3}}>
      <div className='flex items-center justify-center   '>
        <form onSubmit={submitHandler} className='w-full max-w-lg bg-white border border-gray-200 shadow-md rounded-lg p-6 my-4'>
          <h1 className='font-bold text-2xl text-center text-black mb-6'>Sign up</h1>
          <div className='mb-4'>
            <Label className="mb-2 block font-medium text-base">Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your fullname"
              className="w-full border border-gray-300 text-base rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className='mb-4'>
            <Label className="mb-2 block font-medium text-base">Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="w-full border border-gray-300 text-base rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className='mb-4'>
            <Label className="mb-2 block font-medium text-base">Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 text-base rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className='mb-4'>
            <Label className="mb-2 block font-medium text-base">Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="w-full border border-gray-300 text-base rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className='className="flex items-center justify-between my-4'>
            <RadioGroup  className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="ml-2 font-medium text-base">Student</Label>
              </div>
              <div className="flex items-center">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className="ml-2 font-medium text-base">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          <div className='mb-6'>
            <Label className="block mb-2 font-medium text-base">Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer w-full border text-base border-gray-300 rounded-md p-2"
            />
          </div>
          {
            loading ? 
              <Button className='w-full flex justify-center items-center p-3 bg-blue-500 text-white rounded-md'>
                <Loader2 className='mr-2 h-5 w-5 animate-spin' />Please wait
              </Button>
              : 
              <Button type="submit" className="w-full p-3 text-base bg-[#305a53]  text-white rounded-md  hover:bg-[#0f3630]">
                Sign up
              </Button>
          }
          <div className="text-center text-base font-medium my-4">
            <span>Already Have an Account? </span>
            <Link to="/login">
              <Button className="bg-blue-500 hover:bg-blue-600 text-base text-white ml-2 py-1 px-3 rounded-md">
                Login
              </Button>
            </Link>
          </div>
        </form>
      </div>
      </motion.div>
    </div>
    </motion.div>
  );
}

export default Signup;
