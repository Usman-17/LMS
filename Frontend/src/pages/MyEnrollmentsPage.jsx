import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Line } from "rc-progress"

const MyEnrollmentsPage = () => {
  const navigate = useNavigate()
  const { enrolledCourses, calculateCourseDuration } = useContext(AppContext)

  const [progessArray, setProgessArray] = useState([
    { lectureCompleted: 0, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 3 },
    { lectureCompleted: 4, totalLectures: 6 },
    { lectureCompleted: 2, totalLectures: 5 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 5, totalLectures: 5 },
  ])

  return (
    <>
      <div className='px-8 md:px-36 py-10'>
        <h1 className='text-2xl font-semibold'>My Enrollments</h1>
        <table className='md:table-auto table-fixed w-full overflow-hidden border border-gray-200 mt-10'>
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
            <tr>
              <th className='px-4 py-3 font-semibold truncate'>Course</th>
              <th className='px-4 py-3 font-semibold truncate'>Duration</th>
              <th className='px-4 py-3 font-semibold truncate'>Completed</th>
              <th className='px-4 py-3 font-semibold truncate'>Status</th>
            </tr>
          </thead>

          <tbody className='text-gray-700'>
            {enrolledCourses?.map((course, i) => (
              <tr key={i} className='border-b border-gray-500/20'>

                <td className='md:px-4 pl-2 py-3 flex items-center space-x-3'>
                  <img src={course.courseThumbnail} alt="thumbnail" className='w-14 sm:w-24 md:w-28' />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>

                    <Line strokeWidth={2}
                      className='bg-gray-300 rounded-full'
                      percent={progessArray[i] ? (progessArray[i].lectureCompleted * 100) / progessArray[i].totalLectures : 0} />
                  </div>
                </td>

                <td className='px-4 py-3 max-sm:hidden'>
                  {calculateCourseDuration(course)}
                </td>

                <td className='px-4 py-3 max-sm:hidden'>
                  {progessArray[i] && `${progessArray[i].lectureCompleted} / ${progessArray[i].totalLectures}`} <span>Lectures</span>
                </td>

                <td className='px-4 py-3 max-sm:text-right'>
                  <button
                    onClick={() => navigate("/player/" + course._id)}
                    className={`px-3 sm:px-6 py-1.5 max-sm:text-xs text-white rounded-full cursor-pointer ${progessArray[i]?.lectureCompleted === progessArray[i]?.totalLectures
                      ? "bg-green-600"
                      : "bg-blue-600"
                      }`}
                  >

                    {progessArray[i]?.lectureCompleted === progessArray[i]?.totalLectures
                      ? "Completed"
                      : "On Going"}
                  </button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MyEnrollmentsPage