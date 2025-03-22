import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets';
import Loader from '../../components/Loader';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [dashboardData]);

  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className="space-y-5">
        <div className="flex flex-wrap gap-10 items-center">

          {/* 1-Total Enrollments */}
          <div className="flex items-center gap-3 shadow-black border border-blue-500 p-4 w-68 rounded-md">
            <img src={assets.patients_icon} alt="user" />
            <div>
              <p className="text-2xl font-medium text-gray-600">{dashboardData?.enrolledStudentsData.length}</p>
              <p className="text-base text-gray-500">Total Enrollments</p>
            </div>
          </div>

          {/* 2-Total Courses */}
          <div className="flex items-center gap-3 shadow-black border border-blue-500 p-4 w-68 rounded-md">
            <img src={assets.appointments_icon} alt="patient-icon" />
            <div>
              <p className="text-2xl font-medium text-gray-600">{dashboardData?.totalCourses}</p>
              <p className="text-base text-gray-500">Total Courses</p>
            </div>
          </div>

          {/* 3-Total Earning */}
          <div className="flex items-center gap-3 shadow-black border border-blue-500 p-4 w-68 rounded-md">
            <img src={assets.earning_icon} alt="earning" />
            <div>
              <p className="text-2xl font-medium text-gray-600">Rs. {dashboardData?.totalEarnings}</p>
              <p className="text-base text-gray-500">Total Earnings</p>
            </div>
          </div>

        </div>

        {/* Lastes Enrollments Table */}
        <div>
          <h2 className="pb-4 text-lg font-medium">Lastes Enrollments</h2>
          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
            <table className='table-fixed md:table-auto w-full overflow-hidden'>
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>Sr No.</th>
                  <th className="px-4 py-3 font-semibold">Student Name</th>
                  <th className="px-4 py-3 font-semibold">Course Title</th>
                </tr>
              </thead>

              <tbody className='text-sm text-gray-500'>
                {dashboardData?.enrolledStudentsData.map((student, i) => (
                  <tr className='border-b border-gray-500/20' key={i}>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{i + 1}</td>
                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                      <img src={student.student.imageUrl} alt="user profile" className='w-9 h-9 rounded-full' />
                      <span className='truncate'>{student.student.name}</span>
                    </td>
                    <td className="truncate px-4 py-3">{student.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  ) : <Loader />;
}

export default DashboardPage