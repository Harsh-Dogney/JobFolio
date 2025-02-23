import React, { useState } from 'react'
import NavBar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import { space } from 'postcss/lib/list'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'

// const skills = ["HTML", "CSS", "JavaScript", "React.js",]
const isResume = true;
const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    // console.log('User in Profile:', user);  // Verify user data
    // console.log('Resume URL:', user?.profile?.resume);
    // console.log('Resume Name:', user?.profile?.resumeOriginalName);

    return (
        <motion.div
      initial={{ opacity: 1, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#6A9C89] "
    >
        <div className='bg-[#6A9C89]'>
            <NavBar />
            <div className='max-w-4xl mx-auto bg-[#C4DAD2] border border-gray-200 rounded-2xl my-6 p-8'>
                <div className='flex justify-between'>

                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile"></AvatarImage>
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-xl'>{user?.fullname}</h1>
                            <p className='font-semibold'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right bg-[#F0EDE5]" variant="outline"><Pen/></Button>
                </div>
                <div >
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span className='font-semibold'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span className='font-semibold'>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-2'>
                    <h1 className='my-2 font-bold'>Skills</h1>
                    <div className='flex items-center gap-1 my-2 font-semibold'>
                        {
                            user?.profile?.skills.length != 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold ">Resume</Label>
                    {
                        isResume  ? (
                            <a
                                target='_blank'
                                href={user?.profile?.resume}
                                className=' w-full  hover:text-blue-600 cursor-pointer font-semibold'>
                                {user?.profile?.resumeOriginalName}

                            </a>
                        ) : (
                            <span>NA</span>
                        )

                    }
                </div>

            </div>
            <div className='max-w-4xl mx-auto bg-[#E9EFEC] rounded-2xl my-3 px-4 py-1'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <p className='m-0'>
                .
            </p>

        </div>
        </motion.div>
    )
}

export default Profile