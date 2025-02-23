import React, { useEffect, useState } from 'react'
import NavBar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const { singleCompany } = useSelector(store => store.company)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }

    } catch (error) {
      console.log(error);
      toast.error(res.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null
    })
  }, [singleCompany]);

  return (
    <motion.div
      initial={{ opacity: 1, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='min-h-screen flex flex-col bg-[#6A9C89]' // Apply background color to the whole page
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
          <div className='max-w-xl mx-auto bg-white my-10 p-8 shadow-lg rounded-lg'>
            <form onSubmit={SubmitHandler}>
              <div className='flex items-center gap-5 mb-4'>
                <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2  bg-[#cfd1d1] font-semibold">
                  <ArrowLeft />
                  <span className='text-[#000000] text-lg'>Back</span>
                </Button>
                <h1 className='font-bold text-2xl text-gray-700'>Company Setup</h1>
              </div>

              <div className='grid grid-cols-1 gap-6 font-semibold'>
                <div>
                  <Label className='text-gray-600 '>Company Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    className='border border-gray-300 p-3 rounded-lg'
                    placeholder='Enter company name'
                  />
                </div>
                <div>
                  <Label className='text-gray-600'>Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeEventHandler}
                    className='border border-gray-300 p-3 rounded-lg'
                    placeholder='Enter company description'
                  />
                </div>
                <div>
                  <Label className='text-gray-600'>Website</Label>
                  <Input
                    type="text"
                    name="website"
                    value={input.website}
                    onChange={changeEventHandler}
                    className='border border-gray-300 p-3 rounded-lg'
                    placeholder='Enter company website'
                  />
                </div>
                <div>
                  <Label className='text-gray-600'>Location</Label>
                  <Input
                    type="text"
                    name="location"
                    value={input.location}
                    onChange={changeEventHandler}
                    className='border border-gray-300 p-3 rounded-lg'
                    placeholder='Enter company location'
                  />
                </div>
                <div>
                  <Label className='text-gray-600'>Logo</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={changeFileHandler}
                    className='border border-gray-300 p-2 rounded-lg'
                  />
                </div>
              </div>

              {
                loading ? (
                  <Button className='w-full mt-6 bg-indigo-500 text-white py-3 rounded-lg flex justify-center items-center'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg">
                    Update Company
                  </Button>
                )
              }
            </form>
          </div>
        </motion.div>
    </motion.div>
    
  )
}

export default CompanySetup
