import React, { useContext, useState } from "react";
import feedbackContext from "../context/feedbacks/feedbackContext";

const AddFeedback = (props) =>{
    const context =useContext(feedbackContext);
    const {addfeedback}= context;
    const [feedback,setFeedback] = useState({title:"", desc:"", attachment:"", category:"", priorities:""});
    const handleClick =(e)=>{
        e.preventDefault();
        addfeedback(feedback.title, feedback.desc, feedback.attachment, feedback.category, feedback.priorities);
        setFeedback({title:"", desc:"", attachment:"", category:"", priorities:""});
        props.showAlert("Feedbacks added Successfully","success")
    };
    const handleOnchange = (e)=>{
        setFeedback({...feedback,[e.target.name]:e.target.value})
    };
    return(
        <div className="container">
      <h2>Add Feedbacks</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            minLength={5} required
            value={feedback.title}
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="desc"
            minLength={5} required
            value={feedback.desc}
            name="desc"
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="attachment" className="form-label">
           attachment
          </label>
          <input
            type="text"
            className="form-control"
            id="attachment"
            minLength={5} required
            value={feedback.attachment}
            name="attachment"
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
           category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            minLength={5} required
            value={feedback.category}
            name="category"
            onChange={handleOnchange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="priorities" className="form-label">
           priorities
          </label>
          <input
            type="text"
            className="form-control"
            id="priorities"
            minLength={5} required
            value={feedback.priorities}
            name="priorities"
            onChange={handleOnchange}
          />
        </div>

        <button type="submit" disabled={feedback.title.length<5 || feedback.desc.length<5 } className="btn btn-primary" onClick={handleClick}>
          Add FeedBack
        </button>
      </form>
    </div>

    );

};


export default AddFeedback;