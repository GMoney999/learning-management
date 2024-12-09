"use client" // Since we are using next router

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion  } from 'framer-motion'

import { useGetCoursesQuery } from '@/state/api'
import Loading from '@/components/Loading';


const Search = () => {
    // Get parameters from URL
    const searchParams = useSearchParams();
    // Get id of specific course from parameters (if it exists)
    const id = searchParams.get("id");
    // Get all courses from backend
    const { data: courses, isLoading, isError} = useGetCoursesQuery({});
    // Create a state for selected course
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    // We want to change pages when different courses are clicked
    const router = useRouter();

    // If courseId exists (if user clicked on specific course), select that one as selected course
    // If not (user clicked on the search button), set the first course as the selected option
    useEffect(() => {
        if (courses) {
            if (id) {
                // Find the specific course that matches the id (if it exists)
                const course = courses.find((c) => c.courseId === id);
                // If a course matches the id, show it.
                // If not, show first course
                setSelectedCourse(course || courses[0]);
            } else {
                setSelectedCourse(courses[0]);
            }
        }
    }, [courses, id])

    if (isLoading) return <Loading />;
    if (isError || !courses) return <div>Failed to fetch courses</div>;


    return (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration: 0.5}}
          className="search"
        >
            <h1 className="search__title">List of available courses</h1>
            <h2 className="search__subtitle">{courses.length} courses available</h2>
        </motion.div>
    )
}

export default Search
