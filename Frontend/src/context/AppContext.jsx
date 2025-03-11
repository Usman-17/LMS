import { createContext, useEffect, useState } from 'react'
import { dummyCourses } from '../assets/assets.js'

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

    useEffect(() => {
        fetchAllCourses()
    }, []);

    const value = {
        allCourses,
        calculateRatings
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
