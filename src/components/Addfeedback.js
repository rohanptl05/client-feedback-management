import React, { useContext, useState } from "react";
import feedbackContext from "../context/feedbacks/feedbackContext";

const AddFeedback = props => {
const context = useContext(feedbackContext);
const { addFeedback } = context;

const [feedback, setFeedback] = useState({
title: "",
desc: "",
attachment: "",
category: "",
priorities: ""
});

const handleClick = (e) => {
  e.preventDefault();
  addFeedback(feedback.title,feedback.desc,feedback.attachment,feedback.category,feedback.priorities)

// setFeedback({
// title: "",
// desc: "",
// attachment: "",
// category: "",
// priorities: ""
// });
props.showAlert("Feedback added successfully", "success");
};

const handleOnChange = e => {
setFeedback({ ...feedback, [e.target.name]: e.target.value });
};

return (
<div className="container">
  <h2>Add Feedback</h2>
  <form>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">
        Title
      </label>
      <input type="text" className="form-control" id="title" name="title" minLength={5} required value={feedback.title}
        onChange={handleOnChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="desc" className="form-label">
        Description
      </label>
      <textarea className="form-control" id="desc" minLength={5} required value={feedback.desc} name="desc"
        onChange={handleOnChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="attachment" className="form-label">
        Attachment
      </label>
      <input type="file" className="form-control" id="attachment" name="attachment" onChange={handleOnChange}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="category" className="form-label">
        Category
      </label>
      <input type="text" className="form-control" id="category" minLength={5} required value={feedback.category}
        name="category" onChange={handleOnChange} />
    </div>
    <div className="mb-3">
      <label htmlFor="priorities" className="form-label">
        Priorities
      </label>
      <input type="text" className="form-control" id="priorities" minLength={5} required value={feedback.priorities}
        name="priorities" onChange={handleOnChange} />
    </div>
    <button type="submit" disabled={feedback.title.length < 5 || feedback.desc.length < 5} className="btn btn-primary"
      onClick={handleClick}>
      Add Feedback
    </button>
  </form>
</div>
);
};

export default AddFeedback;