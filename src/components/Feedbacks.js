import React, { useContext, useEffect, useRef, useState } from "react";
import feedbackContext from "../context/feedbacks/feedbackContext";
import Feedbackitem from "./Feedbackitem";
import AddFeedback from "./AddFeedback";
// import { useNavigate } from "react-router-dom";



const Feedbacks = (props) => {
  // let navigate = useNavigate();
  const context = useContext(feedbackContext);
  const { feedback, getFeedback, editFeedback } = context;
  const [feeds, setFeeds] = useState({ id: "", etitle: "", edesc: "", eattachment: "", epriorities: "", ecategory: "" })
  useEffect(() => {
    if (localStorage.getItem("token")) {

      getFeedback();
    }
  }, [ getFeedback])
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateFeedback = (currentFeedback) => {
    ref.current.click();
    setFeeds({
      id: currentFeedback._id || "",
      etitle: currentFeedback.title || "",
      edesc: currentFeedback.desc || "",
      eattachment: currentFeedback.attachment || "",
      epriorities: currentFeedback.priorities || "",
      ecategory: currentFeedback.category || "",
    });
  }
  const handleClick = (e) => {
    editFeedback(feeds.id, feeds.etitle, feeds.edesc, feeds.eattachment, feeds.epriorities, feeds.ecategory);
    // e.preventDefault();
    refClose.current.click();
    props.showAlert("Details are Successfully Updated", "success");

  };
  const handleOnchange = (e) => {
    setFeeds({ ...feeds, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddFeedback showAlert={props.showAlert} />


      {/* start */}
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
                Edit Notes
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
                      value={feeds.etitle}
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
                      value={feeds.edesc}
                      id="edesc"
                      name="edesc"
                      minLength={5}
                      required
                      onChange={handleOnchange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edesc" className="form-label">
                      Attachment
                    </label>
                    <input
                      type="file"
                      className="form-control"

                      id="eattachment"
                      name="eattachment"

                      required
                      onChange={handleOnchange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edesc" className="form-label">
                      catagory
                    </label>
                    <select
                      className="form-control"
                      value={feeds.ecategory}
                      id="ecategory"
                      name="ecategory"
                      required
                      onChange={handleOnchange}
                    >
                      <option value="">Select a category</option>
                      <option value="Bug">Bug</option>
                      <option value="Feature Request">Feature Request</option>
                      <option value="Complaint">Complaint</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edesc" className="form-label">
                      priorities
                    </label>
                    <select
                      className="form-control"
                      value={feeds.epriorities}
                      id="epriorities"
                      name="epriorities"
                      required
                      onChange={handleOnchange}
                    >
                      <option value="">Select a priority</option>
                      <option value="Low">Low</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
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
                disabled={feeds.etitle.length < 5 || feeds.edesc.length < 5}
                onClick={handleClick}
                className="btn btn-primary"
              >
                Update Feedbacks
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* end */}
      <div className="container row">
        <h2>Your Feedback</h2>
        <div className="container row ">
          {feedback.map((feedback) => {
            return <Feedbackitem key={feedback._id} feedback={feedback} updateFeedback={updateFeedback} />
          })}
        </div>

      </div>
    </>
  )
}

export default Feedbacks;
