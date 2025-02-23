import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl cursor-pointer hover:bg-[#eee8d7] bg-[#e9e1c6] transition-transform duration-300 hover:scale-105 origin-center'>
            <div>
                <h1 className='font-medium text-2xl text-black'>{job?.company?.name}</h1>
                <p className='text-xl text-gray-700'>India</p>
            </div>
            <div>
                <h1 className='font-semibold text-xl my-2'>{job?.title}</h1>
                <p className='text-xl text-gray-800'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 '>
                <Badge className={'text-[#1d4ee8] font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#f83002] font-bold'} variant="ghost"> {job?.jobType}</Badge>
                <Badge className={'text-[#7209B7] font-bold'} variant="ghost"> {job?.salary} LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards