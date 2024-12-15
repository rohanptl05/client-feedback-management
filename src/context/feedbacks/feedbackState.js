import { useState } from "react";
import FeedbackContext from "./feedbackContext";

const FeedbackState = (props) => {
    // const host = "http://localhost:6000";
    // const feedbackInitial = [];
    // const [feedbacks, setfeedbacks] = useState(feedbackInitial);

    //  //get a all  feedbacks
    //  const getAllFeedback = async () => {

    //     const response = await fetch(`${host}/api/feedbacks/allfetchfeedbacks`, {
    //         method: 'GET',
    //         headers: {
    //             'content-type': 'application/json',
    //             'auth-token': localStorage.getItem('token')
    //         }
    //     });
    //     const json = await response.json();
    //     console.log(json)
    //     setfeedbacks(json)

    // }

const feed =[
    {
      "_id": "675db627d2c0b1d4707fff01",
      "user": "675c6a774a349690137dbda7",
      "title": "title",
      "desc": "this is a test",
      "status": "Pending",
      "attachment": "photo.com",
      "priorities": "High",
      "response": null,
      "resolvedDate": null,
      "category": "Complaint",
      "date": "2024-12-14T16:45:27.266Z",
      "__v": 0
    },
    {
      "_id": "675db62ad2c0b1d4707fff03",
      "user": "675c6a774a349690137dbda7",
      "title": "title1",
      "desc": "this is a test",
      "status": "Pending",
      "attachment": "photo.com",
      "priorities": "High",
      "response": null,
      "resolvedDate": null,
      "category": "Complaint",
      "date": "2024-12-14T16:45:30.955Z",
      "__v": 0
    },
    {
      "_id": "675db631d2c0b1d4707fff05",
      "user": "675c6a774a349690137dbda7",
      "title": "title2",
      "desc": "this is a test",
      "status": "Pending",
      "attachment": "photo.com",
      "priorities": "High",
      "response": null,
      "resolvedDate": null,
      "category": "Complaint",
      "date": "2024-12-14T16:45:37.766Z",
      "__v": 0
    },
    {
      "_id": "675db638d2c0b1d4707fff07",
      "user": "675c6a774a349690137dbda7",
      "title": "title2",
      "desc": "this is a testhg6",
      "status": "Pending",
      "attachment": "photo.com",
      "priorities": "High",
      "response": null,
      "resolvedDate": null,
      "category": "Complaint",
      "date": "2024-12-14T16:45:44.910Z",
      "__v": 0
    }
  ]
 const [feedback,setFeedback]=useState(feed)

 //Addfeed
  const addFeedback =(title,
    desc,
    attachment,
    category,
    priorities)=>{
    const feed ={
        "_id": "675db638d2csb1d4707fff07",
        "user": "675c6a774a349690137dbda7",
        "title": title,
        "desc": desc,
        "status": "Pending",
        "attachment": attachment,
        "priorities": priorities,
        "response": null,
        "resolvedDate": null,
        "category": category,
        "date": "2024-12-14T16:45:44.910Z",
        "__v": 0
      }
      setFeedback(feedback.concat(feed))

  }

return(
    <FeedbackContext.Provider value={{feedback,setFeedback,addFeedback}}>
         {props.children}
    </FeedbackContext.Provider>
)


}



export default FeedbackState;