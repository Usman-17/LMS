import { createContext, useEffect, useState } from 'react'
import { dummyCourses } from '../assets/assets.js'
import humanizenDuration from "humanize-duration"

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [allCourses, setAllCourses] = useState([])

    // Fetch All Courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }

    // Function to calculate average rating of course
    const calculateRatings = (course) => {
        if (course.courseRatings.length === 0) {
            return 0
        }
        let totalRating = 0
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating
        })
        return totalRating / course.courseRatings.length
    }

    // Function to calculate the course chapter time
    const calculateChapterTime = (chapter) => {
        let time = 0
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration)
        return humanizenDuration(time * 60 * 1000, {
            units: ["h", "m"]
        })
    }

    // Function to calculate the Course Duration
    const calculateCourseDuration = (course) => {
        let time = 0
        course.courseContent.map((chapter) => chapter.chapterContent.map((lecture) => time += lecture.lectureDuration))

        return humanizenDuration(time * 60 * 1000, {
            units: ["h", "m"]
        })
    }



    // Function to calculate the Number of Lectures in the Course
    const calculateNoOfLectures = (course) => {
        let totalLectures = 0;
        if (!course?.courseContent) return totalLectures;

        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }
        });

        return totalLectures;
    };


    useEffect(() => {
        fetchAllCourses()
    }, []);

    const value = {
        allCourses,
        calculateRatings,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
