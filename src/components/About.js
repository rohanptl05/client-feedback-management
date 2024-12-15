import React, { useContext } from 'react'
import feedbackContext  from '../context/feedbacks/feedbackContext'

const About = () => {
  const a = useContext(feedbackContext)
  return (
    <div>
    about{a.name} and class is {a.class}
    </div>
  )
}

export default About
