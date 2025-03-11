import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext.jsx'

const CourseCard = ({ course }) => {

    const { calculateRatings } = useContext(AppContext)
    return (
        <Link to={"/course/" + course._id} onClick={() => scrollTo(0, 0)} className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg hover:border-gray-400/30 transform'>
            <img src={course.courseThumbnail} alt="Thumbnail" className='w-full' />
            <div className='p-3 text-left'>
                <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
                <p className='text-gray-500'>{course.educator.name}</p>

                {/* Rating */}
                <div className='flex items-center space-x-2'>
                    <p>{calculateRatings(course)}</p>
                    <div className='flex '>
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src={i < Math.floor(calculateRatings(course)) ? assets.star : assets.star_blank} alt='Rating' className='flex items-center w-3.5 h-3.5' />
                        )
                        )}
                    </div>
                    <p className='text-gray-500'>{course.courseRatings.length}</p>
                </div>

                {/* Price */}
                <p className='text-base font-semibold text-gray-800'>Rs.{(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
            </div>
        </Link>
    )
}

export default CourseCard