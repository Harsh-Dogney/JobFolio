import React, { useState } from 'react';
import NavBar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const PostJobs = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
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
      <div className="flex items-center justify-center w-full my-10">
        <form onSubmit={submitHandler} className="p-8 max-w-4xl bg-white border border-gray-200 shadow-lg rounded-md font-semibold">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 my-1"
              />
            </div>
            <div>
              <Label>Experience</Label>
              <Input
                type="number"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 my-1"
              />
            </div>
            <div>
              <Label>No of Positions</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 my-1"
              />
            </div>
            {
              companies.length > 0 && (
                <div className="col-span-2">
                  <Label>Select Company</Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-indigo-500 my-1">
                      <SelectValue placeholder="Select a Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className='font-semibold'>
                        {
                          companies.map((company) => {
                            return (
                              <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                {company?.name}
                              </SelectItem>
                            );
                          })
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )
            }
          </div>
          {
            loading ? (
              <Button className="w-full mt-6 bg-indigo-500 text-white py-3 rounded-lg flex justify-center items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">
                Post New Job
              </Button>
            )
          }
          {
            companies.length === 0 && (
              <p className="text-center text-red-600 font-bold text-sm mt-4">
                Please register a company before posting a job.
              </p>
            )
          }
        </form>
      </div>
    </motion.div>
    </motion.div>
  );
};

export default PostJobs;
