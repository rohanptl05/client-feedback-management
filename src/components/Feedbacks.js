import React, { useContext, useEffect, useRef, useState } from "react";
import feedbackContext from "../context/feedbacks/feedbackContext";
import Feedbackitem from "./Feedbackitem";
import AddFeedback from "./AddFeedback";
import { useNavigate } from "react-router-dom";



const Feedbacks = (props) => {
  const context = useContext(feedbackContext)
  const {feedback}= context
  

  return (
    <>
      <AddFeedback showAlert={props.showAlert} />

      <div className="container row">
        <h2>Your Feedback</h2>
        <div className="container row ">
          {feedback.map((feedback)=>{
            return <Feedbackitem feedback={feedback}/>
          })}
        </div>
       
      </div>
    </>
  )
}

export default Feedbacks;
