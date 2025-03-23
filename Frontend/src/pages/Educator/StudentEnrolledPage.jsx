import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";
import { dummyStudentEnrolled } from "../../assets/assets";

const StudentEnrolledPage = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  // Fetch All Courses
  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  if (!enrolledStudents) return <Loader />;

  console.log(enrolledStudents);

  return (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:mb-10 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">Student Enrolled</h2>
        <div className="md:table-auto table-fixed w-full overflow-hidden">
          {/* ----Table---- */}
          <table className="w-full min-w-full border-collapse">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">
                  Sr No.
                </th>
                <th className="px-4 py-3 font-semibold">Student Name</th>
                <th className="px-4 py-3 font-semibold">Course Title</th>
                <th className="px-4 py-3 font-semibold hidden sm:table-cell">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              {enrolledStudents.map((item, i) => (
                <tr key={i} className="border-b border-gray-500/20">
                  {/* 1 */}
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {i + 1}
                  </td>

                  {/* 2 */}
                  <td className="md:px-4 py-3 px-2 flex items-center space-x-3">
                    <img
                      src={item.student.imageUrl}
                      alt="Profile Image"
                      className="w-9 h-9 rounded-full"
                    />
                    <span className="truncate">{item.student.name}</span>
                  </td>

                  {/* 3 */}
                  <td className="px-4 py-3 truncate">{item.courseTitle}</td>

                  {/* 4 */}
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {new Date(item.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrolledPage;
