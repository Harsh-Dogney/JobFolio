import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8]
const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
    return (
        <div className='bg-[#C4DAD2] rounded-sm py-10'>
        <div className='max-w-7xl mx-auto '>
            <h1  className='text-4xl font-bold hover:text-[#16423C] '>Latest & Top<span className='text-[#16423C] hover:text-[#1A1A1A]'>Job Openings</span></h1>
            <div className='grid grid-cols-3 gap-5 my-5 '>
                {
                    allJobs.length <= 0 ? <span className='text-gray-800'>No Jobs Available at Present</span> : allJobs?.slice(0,6).map((job) => <LatestJobCards  key={job._id} job={job} />)
                }
            </div>
        </div>
        </div>
    )
}

export default LatestJobs