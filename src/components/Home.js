import React from 'react'
import Feedbacks from './Feedbacks';

const Home = (props) => {
  const{showAlert}=props
  return (
    <>
      <Feedbacks showAlert={showAlert}/>
    </>
  )
}

export default Home;
