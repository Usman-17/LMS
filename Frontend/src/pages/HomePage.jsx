import React from 'react'
import Hero from '../components/Hero'
import Companies from '../components/Companies'
import CourseSection from '../components/CourseSection'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero />
      <Companies />
      <CourseSection />
    </div>
  )
}

export default HomePage