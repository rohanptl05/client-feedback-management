import React,{useContext} from 'react'
import Feedbacks from './Feedbacks';
import feedbackContext from '../context/feedbacks/feedbackContext';

const Home = (props) => {
  const{showAlert}=props
 
  return (
    <>
      <Feedbacks showAlert={showAlert}/>
    </>
  )
}

export default Home;
