import { useState } from "react";
import FeedbackContext from "./feedbackContext";

const FeedbackState = (props) => {
    const host = "http://localhost:5001";
    const feedbackInitial = [];
    const [feedback,setFeedback] = useState(feedbackInitial);

     //get a all  feedbacks
     const getFeedback = async () => {

        const response = await fetch(`${host}/api/feedbacks/fetchfeedbacks`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1YzZhNzc0YTM0OTY5MDEzN2RiZGE3In0sImlhdCI6MTczNDEwOTgxNX0.l-C9WifmHNcIT4BA4HIGrTqaPZUCliq4CtKkf4Ye0Xc'
            }
        });
        const json = await response.json()
            console.log(json)
            setFeedback(json)
        

    }


 //Addfeed
  const addFeedback =(title,desc, attachment,category,priorities)=>{

    const feedbacks ={
        "_id": "675db638d2csb1d4d707fff07",
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
      setFeedback(feedback.concat(feedbacks))

  }
  //delete feedbacks
const deleteFeedback =(id)=>{
    const newfeedback = feedback.filter((feed)=>{return feed._id !==id})
    setFeedback(newfeedback)
   

}
//edit feedbacks
const editFeedback =(id,title,desc,attachment,priorities,category)=>{
   for (let index = 0; index < feedback.length; index++) {
    const element = feedback[index];
    if(element._id === id){
        element.title = title;
        element.desc = desc;
        element.attachment = attachment;
        element.priorities = priorities;
        element.category = category;
    }
    
   }

}

return(
    <FeedbackContext.Provider value={{feedback,setFeedback,addFeedback,deleteFeedback,getFeedback}}>
         {props.children}
    </FeedbackContext.Provider>
)


}



export default FeedbackState;