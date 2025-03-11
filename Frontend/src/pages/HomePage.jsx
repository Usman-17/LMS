import React from 'react'
import Hero from '../components/Hero'
import Companies from '../components/Companies'
import CourseSection from '../components/CourseSection'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'

const HomePage = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero />
      <Companies />
      <CourseSection />
      <Testimonials />
      <CallToAction />
    </div>
  )
}

export default HomePage