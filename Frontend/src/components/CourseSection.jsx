import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'

const CourseSection = () => {
    const { allCourses } = useContext(AppContext)
    return (
        <div className='py-16 px-8 md:px-40 '>
            <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
            <p className='text-sm md:text-base text-gray-500 mt-3'>Discover our top-rated courses across various categories. From coding and design <br /> to business and wellness, our courses are crafted to deliver results.
            </p>

            {/* Course Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 md:px-8 lg:px-12 my-10 md:py-16">
                {allCourses.slice(0, 4).map((course, i) => <CourseCard key={i} course={course} />)}
            </div>

            <Link to="/course-list" onClick={() => scrollTo(0, 0)} className='text-gray-500 border border-gray-500/30 px-10 py-3 rounded'>Show All Course</Link>
        </div >
    )
}

export default CourseSection