import React from 'react'
import Hero from '../components/Hero'
import Companies from '../components/Companies'
import CourseSection from '../components/CourseSection'
import Testimonials from '../components/Testimonials'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero />
      <Companies />
      <CourseSection />
      <Testimonials />
    </div>
  )
}

export default HomePage