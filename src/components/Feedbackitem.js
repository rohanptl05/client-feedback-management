import React, { useContext} from 'react'
import feedbackContext from "../context/feedbacks/feedbackContext";

const Feedbackitem = (props) => {
    const context = useContext(feedbackContext);
   const {deleteFeedback} = context;
    const { feedback,updateFeedback} = props;
  return (
    <div className="col-md-3 mx-1 row">
    <div className="card my-2">
      <div className="card-body">
        {/* <h5 className="card-title"> {feedback._id}</h5> */}
        <h5 className="card-title"> {feedback.title}</h5>
        <p className="card-text">{feedback.desc} </p>
        <p className="card-text">{feedback.status} </p>
        <p className="card-text">{feedback.attachment} </p>
        <p className="card-text">{feedback.date} </p>
        <p className="card-text">{feedback.priorities} </p>
        <p className="card-text">{feedback.response} </p>
        <p className="card-text">{feedback.category} </p>
        <p className="card-text">{feedback.resolvedDate} </p>
        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateFeedback(feedback)}}> edit</i>
        <i className="fa-sharp-duotone fa-solid fa-trash mx-2" onClick={()=>{deleteFeedback(feedback._id)}} > delete</i>
        
      </div>
    </div>
  </div>
  )
}

export default Feedbackitem;
