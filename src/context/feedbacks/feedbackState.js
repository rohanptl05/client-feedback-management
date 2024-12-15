import { useState } from "react";
import feedbackContext from "./feedbackContext";

const FeedbackState = (props) => {
    const host = "http://localhost:6000";
    const feedbackInitial = [];
    const [feedbacks, setfeedbacks] = useState(feedbackInitial);

    //get a only users feedbacks
    const getFeedback = async () => {

        const response = await fetch(`${host}/api/feedbacks/fetchfeedbacks`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        setfeedbacks(json)

    }

     //get a all  feedbacks
     const getAllFeedback = async () => {

        const response = await fetch(`${host}/api/feedbacks/allfetchfeedbacks`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json)
        setfeedbacks(json)

    }

    // Add feedBacks 
    const addFeedback = async (title, desc, attachment, category, priorities) => {
        //cll api
        const response = await fetch(`${host}/api/feedbacks/addfeedbacks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, desc, attachment, category, priorities })
        });
        const feedback = await response.json();
        setfeedbacks(feedbacks.concat(feedback));
        console.log(feedback)


    }

//Edit feedbacks
const editFeedback = async (id,title, desc, attachment, category, priorities) =>{
    //cll api
    const response = await fetch(`${host}/api/feedbacks/updatefeedbacks/${id}`,{
        method:'PUT',
        headers:{
            'content-type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title, desc, attachment, category, priorities})
    });
     console.log(response)
    let newFeedbacks = JSON.parse(JSON.stringify(feedbacks))

    // logic to Edit clint us feedbacks
    for (let index = 0; index < newFeedbacks.length; index++) {
        const element = newFeedbacks[index];
        if(element._id === id){
           newFeedbacks[index].title = title;
           newFeedbacks[index].desc = desc;
           newFeedbacks[index].attachment = attachment;
           newFeedbacks[index].category = category;
           newFeedbacks[index].priorities = priorities;
           break;

        }
        setfeedbacks(newFeedbacks);
    }
};

//delete a feedbaks
const deletefeedbacks = async (id)=>{
    // call api
    const response = await fetch(`${host}/api/feedbacks/deletefeedbacks/${id}`,{
       method: 'DELETE' ,
       headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
       },
    });
    const json = await response.json();
    console.log(json);

    const newFeedbacks = feedbacks.filter((feedbacks) => { return feedbacks._id !== id})
    setfeedbacks(newFeedbacks)
}


return(
    <feedbackContext.Provider value={{feedbacks,getAllFeedback,getFeedback,deletefeedbacks,addFeedback,editFeedback}}>
         {props.children}
    </feedbackContext.Provider>
)


}



export default FeedbackState;