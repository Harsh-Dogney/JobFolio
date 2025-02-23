import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const category = [
    "Front-end Developer",
    "Backend Developer",
    "FullStack Developer",
    "Graphic Designer",
    "Data Science",
];

const CategoryCarasoul = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate();

    const searchJobHandler = (query)=>{
        dispatch(setSearchedQuery(query));
        navigate("/browse");
      }
    return (
        <div className='bg-[#6A9C89]'>
            <Carousel className='w-full max-w-3xl mx-auto py-10 '>
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3 ">
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className='rounded-full bg-[#e6e4e4]'>{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    );
};

export default CategoryCarasoul;
