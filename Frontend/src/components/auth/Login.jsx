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
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LogIn = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message || "Login successful!");
      } else {
        toast.error(res.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <motion.div
            initial={{ opacity: 1, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen bg-[#6A9C89]' // Apply background color to the whole page
        >
    <div className="min-h-screen ">
      <NavBar />
      <motion.div
                                            initial={{opacity:0, x:100}}
                                            animate={{opacity:1,x:0}}
                                            exit={{opacity:0,x:-100}}
                                            transition={{duration:0.3}}>
      <div className="flex items-center justify-center px-4 ">
        <form onSubmit={submitHandler} className="w-full max-w-lg bg-[#e5e9e8]  border-gray-200 shadow-md rounded-md p-8 my-10 space-y-6">
          <h1 className="font-bold text-2xl text-center text-gray-800 mb-5">Login</h1>
          
          <div >
            <Label className='text-base font-medium'>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className="mt-1 block w-full rounded-md text-base  border-gray-300 focus:ring-blue-500 "
            />
          </div>

          <div>
            <Label className='text-base font-medium'>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="Enter your password"
              className="mt-1 block w-full text-base rounded-md border-gray-300 focus:ring-blue-500 "
            />
          </div>

          <div className="flex items-center justify-between my-4">
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className='text-base font-medium' htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label className='text-base font-medium'htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {
            loading ? (
              <Button className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-blue-700 text-base hover:bg-blue-900 text-white py-2 rounded-md">
                Login
              </Button>
            )
          }

          <div className="text-center text-base font-medium">
            <span>Don't Have an Account? </span>
            <Link to="/signup">
              <Button className="bg-[#305a53] hover:bg-[#0f3630] text-base text-white ml-2 py-1 px-3 rounded-md">
                Signup
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

export default LogIn;
