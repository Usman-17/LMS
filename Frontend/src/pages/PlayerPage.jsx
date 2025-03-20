import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Rating from '../components/Rating'

const PlayerPage = () => {
    const { id } = useParams()
    const { enrolledCourses, calculateChapterTime } = useContext(AppContext)

    const [courseData, setCourseData] = useState(null)
    const [openDropDown, setOpenDropDown] = useState({})
    const [playerData, setPlayerData] = useState(null)


    // Fetch the course data based on the ID
    useEffect(() => {
        const course = enrolledCourses.find((course) => course._id === id);
        setCourseData(course || null);
    }, [id, enrolledCourses]);


    // Toggle dropdown for course chapters
    const toggleSection = (index) => {
        setOpenDropDown((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <>
            <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36 h-screen' >

                {/* Left Side - Course Structure */}
                <div className='pt-8 text-gray-800'>
                    <h2 className='text-xl font-semibold'>Course Structure</h2>

                    <div className="pt-5">
                        {courseData?.courseContent?.map((chapter, i) => (
                            <div key={i} className='border border-gray-300 bg-white mb-2 rounded'>

                                {/* Chapter Title */}
                                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(i)}>

                                    <div className='flex items-center gap-2'>
                                        <img className={`transform transition-transform ${openDropDown[i] ? "rotate-180" : ""}`} src={assets.down_arrow_icon} alt="arrow" />

                                        <p className='font-medium text-sm md:text-base'>{chapter.chapterTitle}</p>
                                    </div>

                                    <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                                </div>

                                {/* Chapter Content */}
                                <div className={`overflow-hidden transition-all duration-300 ${openDropDown[i] ? "max-h-96" : "max-h-0"}`}>

                                    <ul className='list-disc pl-4 md:pl-10 pr-4 py-2 text-gray-600 border-t border-gray-300'>

                                        {chapter.chapterContent.map((lecture, index) => (
                                            <li key={index} className='flex items-start gap-2 py-1'>

                                                <img src={false ? assets.blue_tick_icon : assets.play_icon} alt="play icon" className='w-4 h-4 mt-0.5' />

                                                <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-sm'>
                                                    <p>{lecture.lectureTitle}</p>

                                                    <div className='flex gap-2 items-center'>

                                                        {lecture.lectureUrl && (
                                                            <p onClick={() => setPlayerData({
                                                                ...lecture, chapter: i + 1, lecture: index + 1
                                                            })}
                                                                className='text-blue-500 cursor-pointer'>Watch</p>
                                                        )
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

                    {/* Course Rating */}
                    <div className='flex items-center gap-2 py-3 mt-10'>
                        <h1 className='text-xl font-bold'>Rate this Course:</h1>
                        <Rating initialRating={0} />
                    </div>
                </div>

                {/* Right Side - Video Player */}
                <div className='md:mt-10'>
                    {playerData ? (
                        <>
                            <YouTube
                                videoId={playerData?.lectureUrl.split("/").pop()}
                                iframeClassName='w-full aspect-video' />

                            <div className='flex justify-between items-center mt-1'>
                                <p>{playerData?.chapter}.{playerData?.lecture} {playerData?.lectureTitle}</p>

                                <button className='text-blue-600 cursor-pointer'>
                                    {false ? "Completed" : "Mark Complete"}
                                </button>
                            </div>
                        </>
                    ) : <img src={courseData?.courseThumbnail} alt="thumbnail" />}

                </div>
            </div >
        </>
    )
}

export default PlayerPage