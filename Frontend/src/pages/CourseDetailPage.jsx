import '../index.css'
import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import YouTube from "react-youtube"
import { useParams } from 'react-router-dom'
import humanizeDuration from "humanize-duration"
import { AppContext } from '../context/AppContext'
import Loader from '../components/Loader'

const CourseDetailPage = () => {
    const { id } = useParams()
    const [courseData, setCourseData] = useState(null)
    const [openDropDown, setOpenDropDown] = useState({})
    const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
    const [playerData, setPlayerData] = useState(null)

    const { allCourses, calculateRatings, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures } = useContext(AppContext)


    useEffect(() => {
        if (allCourses.length) {
            const findCourse = allCourses.find(course => course._id === id)
            setCourseData(findCourse)
        }
    }, [id, allCourses])


    const toggleSection = (i) => {
        setOpenDropDown(prev => ({ ...prev, [i]: !prev[i] }));
    };



    return courseData ? (
        <div className='flex flex-col-reverse lg:flex-row gap-10 relative items-start justify-between px-8 md:px-36 pt-20 md:pt-24 text-left'>

            <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/70 to-transparent h-[500px]"></div>


            {/* Left Side  */}
            <div className='max-w-xl z-10 text-gray-500'>
                {/* Title */}
                <h1 className='text-2xl md:text-4xl font-semibold text-gray-800'>{courseData?.courseTitle}</h1>

                {/* Description */}
                <div className='pt-4 text-sm md:text-base'
                    dangerouslySetInnerHTML={{ __html: courseData?.courseDescription.slice(0, 200) || "" }}
                />

                {/* Review & Ratings */}
                <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
                    <p>{calculateRatings(courseData)}</p>
                    <div className='flex '>
                        {[...Array(5)].map((_, i) => (
                            <img key={i} src={i < Math.floor(calculateRatings(courseData)) ? assets.star : assets.star_blank} alt='Rating' className='flex items-center w-3.5 h-3.5' />
                        )
                        )}
                    </div>

                    <p className='text-blue-600'>
                        ({courseData.courseRatings.length}
                        {courseData.courseRatings.length > 1 ? " ratings" : " rating"})
                    </p>

                    {/* EnrollMents */}
                    <p>
                        {courseData?.enrolledStudents.length}
                        {courseData?.enrolledStudents.length > 1 ? " students" : " student"}
                    </p>
                </div>

                <p className='text-sm'>Course by <span className='text-blue-600 underline'>UsmanDev</span></p>

                {/* Course Structure dropdown*/}
                <div className='pt-8 text-gray-800'>
                    <h2 className='text-xl font-semibold'>Course Structure</h2>

                    <div className="pt-5">
                        {courseData.courseContent.map((chapter, i) => (
                            <div key={i} className='border border-gray-300 bg-white mb-2 rounded'>
                                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(i)}>
                                    <div className='flex items-center gap-2'>
                                        <img className={`transform transition-transform ${openDropDown[i] ? "rotate-180" : ""}`} src={assets.down_arrow_icon} alt="arrow" />
                                        <p className='font-medium text-sm md:text-base'>{chapter.chapterTitle}</p>
                                    </div>

                                    <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                                </div>

                                <div className={`overflow-hidden transition-all duration-300 ${openDropDown[i] ? "max-h-96" : "max-h-0"}`}>
                                    <ul className='list-disc pl-4 md:pl-10 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                                        {chapter.chapterContent.map((lecture, i) => (
                                            <li key={i} className='flex items-start gap-2 py-1'>
                                                <img src={assets.play_icon} alt="play icon" className='w-4 h-4 mt-0.5' />
                                                <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-sm'>
                                                    <p>{lecture.lectureTitle}</p>
                                                    <div className='flex gap-2 items-center'>

                                                        {lecture.isPreviewFree && <p
                                                            onClick={() => setPlayerData({
                                                                videoId: lecture.lectureUrl.split('/').pop(),
                                                            })}
                                                            className='text-blue-500 cursor-pointer'>Preview</p>
                                                        }

                                                        <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Description */}
                <div className="py-20 text-sm md:text-base">
                    <h3 className="text-xl font-semibold text-gray-800">Course Description</h3>
                    <div className='pt-3 rich-text'
                        dangerouslySetInnerHTML={{ __html: courseData?.courseDescription || "" }}
                    />
                </div>
            </div>

            {/* Right Side  */}
            <div className='max-w-[424px] z-10 shadow-xl rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>
                {
                    playerData ? <YouTube videoId={playerData.videoId} opts={{ playerVars: { autoplay: 1 } }} iframeClassName='w-full aspect-video h-60' /> : <img src={courseData.courseThumbnail} alt="thumbnail" />
                }

                <div className='p-5'>
                    <div className='flex items-center gap-2'>
                        <img src={assets.time_clock_icon} alt="time left clock icon" className='w-3.5' />
                        <p className='text-red-500'><span className='font-medium'>5 days</span> left at this price!</p>
                    </div>

                    <div className='flex gap-3 items-center pt-2'>
                        <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>Rs. {(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}</p>

                        <p className='md:text-lg text-gray-500 line-through pt-1'>Rs. {courseData.coursePrice}</p>
                        <p className='md:text-lg text-gray-500 pt-1'>{courseData.discount}% off</p>
                    </div>

                    <div className='flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500'>

                        <div className='flex items-center gap-1'>
                            <img src={assets.star} alt="star" />
                            <p>{calculateRatings(courseData)}</p>
                        </div>

                        <div className="h-4 w-px bg-gray-500/40"></div>

                        <div className='flex items-center gap-1'>
                            <img src={assets.time_clock_icon} alt="time" />
                            <p>{calculateCourseDuration(courseData)}</p>
                        </div>

                        <div className="h-4 w-px bg-gray-500/40"></div>

                        <div className='flex items-center gap-1'>
                            <img src={assets.lesson_icon} alt="time" />
                            <p>{calculateNoOfLectures(courseData)} lessons</p>
                        </div>
                    </div>

                    <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium cursor-pointer hover:bg-blue-700'>{isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}</button>

                    <div className="pt-6">
                        <p className="md:text-xl text-lg font-medium text-gray-800">What's in the course?</p>
                        <ul className='ml-6 pt-2 text-sm md:text-default list-disc text-gray-500'>
                            <li>Lifetime access with free updates.</li>
                            <li>Step-by-step, hands-on project guidance.</li>
                            <li>Downloadable resources and source code.</li>
                            <li>Quizzes to test your knowledge.</li>
                            <li>Certificate of completion.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    ) : <Loader />
}

export default CourseDetailPage