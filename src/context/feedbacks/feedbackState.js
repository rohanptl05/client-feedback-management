import { useState } from "react";
import FeedbackContext from "./feedbackContext";


const FeedbackState = (props) => {
    const host = "http://localhost:5000";
    const feedbackInitial = [];
    const [feedback,setFeedback] = useState(feedbackInitial);

     //get a all  feedbacks
     const getFeedback = async () => {

        const response = await fetch(`${host}/api/feedbacks/fetchfeedbacks`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const json = await response.json()
          
            setFeedback(json)
        

    }
 //Addfeed
  const addFeedback =async(title,desc, attachment,category,priorities)=>{

   const responce = await fetch(`${host}/api/feedbacks/addfeedbacks`,{
    method:'POST',
    headers:{
        'Content-type':'application/json',
        'auth-token':localStorage.getItem('token')

    },
    body:JSON.stringify({title,desc, attachment,category,priorities})
   })
      const feedbackss = await responce.json()
      setFeedback(feedback.concat(feedbackss))
  }
  
  
  
  
  
  //delete feedbacks
const deleteFeedback =async(id)=>{
    const responce = await fetch(`${host}/api/feedbacks/deletefeedbacks/${id}`,{
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
            'auth-token':localStorage.getItem('token')
        }
    })
    const newfeedback = feedback.filter((feed)=>{return feed._id !==id})
    setFeedback(newfeedback)
   

}
//edit feedbacks
const editFeedback = async(id,title,desc,attachment,priorities,category)=>{
    const responce = await fetch(`${host}/api/feedbacks/updatefeedbacks/${id}`,{
        method:'PUT',   
        headers:{
            'Content-type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({ title, desc,attachment,priorities,category })
    })
    const newfeedback = feedback.filter((feed)=>{return feed._id !==id})
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

const searchFeedback = async (filters) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`${host}/api/feedbacks/searchfeedback?${queryParams}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const newFeedback = await response.json();
      console.log(newFeedback);
      setFeedback(newFeedback); // Update feedback state
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };
  
 const allfetchfeedbacks = async () =>{
    const responce = await fetch(`${host}/api/feedbacks/allfetchfeedbacks`,{
        method:'GET',
        headers:{
            'Content-type':'application/json',
            'auth-token':localStorage.getItem('token')
        }   
        
    })
    const newfeedback = await responce.json()
    setFeedback(newfeedback)
    // console.log(newfeedback)
 }          

return(
    <FeedbackContext.Provider value={{feedback,setFeedback,addFeedback,deleteFeedback,getFeedback,editFeedback,searchFeedback}}>
         {props.children}
    </FeedbackContext.Provider>
)


}



export default FeedbackState;