import React, { useContext, useEffect, useRef, useState } from "react";
import feedbackContext from "../context/feedbacks/feedbackContext";
import Feedbackitem from "./Feedbackitem";
import AddFeedback from "./Addfeedback";
import { useNavigate } from "react-router-dom";



const Feedbacks = (props) => {
    let navigate=useNavigate();
    const context = useContext(feedbackContext);
    const [feedback,setFeedback]=useState({ id: "",etitle:"", edesc:"", eattachment:"", ecategory:"", epriorities:""})
    const {feedbacks,getFeedback,editFeedback}= context

useEffect(()=>{
    if(localStorage.getItem("token")){
        getFeedback();

    }else{
        navigate("/login")
    }
},[]);
const ref = useRef(null);
const refClose = useRef(null);
const updateFeedback = (currentFeedback)=>{
    ref.current.click();
    setFeedback({
        id: currentFeedback._id || "",
        etitle:currentFeedback.title || "", 
        edesc:currentFeedback.desc || "", 
        eattachment:currentFeedback.attachment || "", 
        ecategory:currentFeedback.category || "", 
        epriorities:currentFeedback.priorities || ""

    });
};
// const { addFeedback } = context;
const handleClick = (e) => {
    editFeedback(feedback.id, feedback.etitle, feedback.edesc, feedback.eattachment,feedback.ecategory,feedback.epriorities);
    // e.preventDefault();
    refClose.current.click();
    props.showAlert("Details are Successfully Updated", "success");
  };
  const handleOnchange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };


  return (
<>
<AddFeedback showAlert={props.showAlert} />

<button
  ref={ref}
  // refClose={ref}
  type="button"
  className="btn btn-primary d-none"
  data-bs-toggle="modal"
  data-bs-target="#exampleModal"
>
  modal
</button>

<div
  className="modal fade"
  id="exampleModal"
  tabIndex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">
          Edit Feedbacks
        </h1>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body">
        <div className="container">
          <form>
            <div className="mb-3">
              <label htmlFor="etitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                value={feedback.etitle}
                id="etitle"
                name="etitle"
                minLength={5}
                required
                onChange={handleOnchange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="edesc" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                value={feedback.edesc}
                id="edesc"
                name="edesc"
                minLength={5}
                required
                onChange={handleOnchange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">
              attachment
              </label>
              <input
                type="text"
                className="form-control"
                value={feedback.eattachment}
                id="eattachment"
                name="eattachment"
                minLength={5}
                required
                onChange={handleOnchange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">
             category
              </label>
              <input
                type="text"
                className="form-control"
                value={feedback.ecategory}
                id="ecategory"
                name="ecategory"
                minLength={5}
                required
                onChange={handleOnchange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="etag" className="form-label">
              priorities
              </label>
              <input
                type="text"
                className="form-control"
                value={feedback.epriorities}
                id="epriorities"
                name="eattaeprioritieschment"
                minLength={5}
                required
                onChange={handleOnchange}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          ref={refClose}
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          disabled={feedback.etitle.length < 5 || feedback.edesc.length < 5}
          onClick={handleClick}
          className="btn btn-primary"
        >
          Update Feedback
        </button>
      </div>
    </div>
  </div>
</div>

<div className="container row">
  <h2>Your Feedback</h2>
  <div className="container">
    {feedbacks.length === 0 && "feedbacks Not Founds"}
  </div>
  {feedbacks.map((feedback) => {
    return (
      <Feedbackitem
        key={feedback._id}
        Feedbackitem={updateFeedback}
        showAlert={props.showAlert}
        feedback={feedback}
      />
    );
  })}
</div>
</>
  )
}

export default Feedbacks;
