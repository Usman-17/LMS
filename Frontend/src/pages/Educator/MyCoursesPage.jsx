import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Loader from "../../components/Loader";

const MyCoursesPage = () => {
  const { allCourses } = useContext(AppContext);

  if (!allCourses) return <Loader />;

  return (
    <div className="h-screen flex flex-col items-start justify-between md:p-8 md:mb-10 p-4 pt-8 pb-0">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium">My Courses</h2>
        <div className="md:table-auto table-fixed w-full overflow-hidden">
          <table className="w-full min-w-full border-collapse">
            <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">All Courses</th>
                <th className="px-4 py-3 font-semibold">Earnings</th>
                <th className="px-4 py-3 font-semibold">Students</th>
                <th className="px-4 py-3 font-semibold">Published On</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              {allCourses.map((course, i) => (
                <tr key={i} className="border-b border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <img
                      src={course.courseThumbnail}
                      alt="Course Thumbnail"
                      className="w-16"
                    />
                    <span className="truncate hidden md:block">
                      {course.courseTitle}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    Rs.{" "}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {course.enrolledStudents.length}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(course.createdAt).toLocaleDateString()}
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

export default MyCoursesPage;
