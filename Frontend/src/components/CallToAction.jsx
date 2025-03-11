import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const CallToAction = () => {
    return (
        <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
            <h2 className='text-xl md:text-4xl font-semibold text-gray-800'>Learn anything, anytime, anywhere</h2>

            <p className='text-xs md:text-base text-gray-500'>Unlock limitless learning opportunities at your convenience.  Whether you're at home or on the go, gain  <br />knowledge anytime, anywhere, and take your skills to the next level.
            </p>

            <div className='flex items-center gap-6 font-medium mt-4'>
                <Link to="/course-list">
                    <button className='cursor-pointer px-10 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700'>Get Started</button>
                </Link>
                <button className='flex items-center gap-2'>Learn More <img src={assets.arrow_icon} alt="arrow" /></button>
            </div>
        </div>
    )
}

export default CallToAction