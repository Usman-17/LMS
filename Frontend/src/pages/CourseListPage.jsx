import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { AppContext } from '../context/AppContext'
import CourseCard from '../components/CourseCard'
import { assets } from '../assets/assets'

const CourseListPage = () => {
    const { allCourses } = useContext(AppContext)
    const { input } = useParams()
    const [filteredCourse, setFilteredCourse] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        if (allCourses && allCourses.length > 0) {
            const tempCourses = allCourses.slice()
            input ?
                setFilteredCourse(
                    tempCourses.filter(
                        item => item.courseTitle.toLowerCase().includes(input.toLowerCase()))) : setFilteredCourse(tempCourses)
        }


    }, [allCourses, input])


    return (
        <>
            <div className='relative px-8 md:px-36 pt-20 text-left'>
                <div className='flex flex-col md:flex-row gap-6 items-start justify-between w-full'>

                    <div className='flex flex-col'>
                        <h1 className="text-4xl font-semibold text-gray-800">Course List</h1>

                        <p className="text-gray-500">
                            <Link to="/" className="text-blue-600 hover:underline">
                                Home
                            </Link>
                            <span> / </span>
                            <span>Course List</span>
                        </p>
                    </div>

                    {/* SearchBar */}
                    <SearchBar data={input} />
                </div>

                {input && <div className='inline-flex items-center gap-4 px-4 py-1 border mt-8 -mb-8 text-gray-400'>
                    <p>{input}</p>
                    <img src={assets.cross_icon} alt="cross" className='cursor-pointer' onClick={() => navigate("/course-list")} />
                </div>}

                {/* Course Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-16 gap-3 px-2 md:p-0">
                    {filteredCourse.map((course, i) => <CourseCard key={i} course={course} />)}
                </div>
            </div>
        </>
    )
}

export default CourseListPage

