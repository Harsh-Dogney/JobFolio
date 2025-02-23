import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    if (!allAppliedJobs) {
        return <div className="text-center py-4">Loading applied jobs...</div>;
    }

    return (
        <div className='font-semibold'>
            <Table>
                <TableCaption>A list of jobs you have applied</TableCaption>
                <TableHeader>
                    <TableRow >
                        <TableHead className='font-bold text-black'>Date</TableHead>
                        <TableHead className='font-bold text-black'>Job Title</TableHead>
                        <TableHead className='font-bold text-black'>Company</TableHead>
                        <TableHead className='font-bold text-center text-black'>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0 ? 
                        <span>You haven't applied to any job yet</span> : 
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id}>
                                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                <TableCell>{appliedJob?.job?.title || "N/A"}</TableCell>
                                <TableCell>{appliedJob?.job?.company?.name || "N/A"}</TableCell>
                                <TableCell className="text-center">
                                    <Badge className={`${appliedJob?.status == "rejected" ? 'bg-red-500 text-black font-medium' : appliedJob.status == "pending" ? 'bg-gray-500 text-black font-medium' : 'bg-green-500 text-black font-medium'}`}>{appliedJob?.status.toUpperCase()}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable;
