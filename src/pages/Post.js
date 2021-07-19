import React, {useEffect, useState, useContext} from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext'
import Moment from 'react-moment';
import DeleteIcon from '@material-ui/icons/Delete';
import icon from '../images/icon-left-font-monochrome-black.svg';





function Post() {
  let history = useHistory()
  let {id} = useParams();  
  const [postObject, setPostObject] = useState({});
  const  [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const {authState} = useContext(AuthContext);
  

  useEffect(()=>{
    axios.get(`https://groupomania-project-api.herokuapp.com/posts/byId/${id}`)
      .then((response)=>{
        setPostObject(response.data);
        console.log(response);
      },);

      axios.get(`https://groupomania-project-api.herokuapp.com/comments/${id}`)
      .then((response)=>{
        setComments(response.data);
      });
  }, []);
  
  const addComment = ()=>{

  
    axios.post('https://groupomania-project-api.herokuapp.com/comments', {
      commentBody:newComment ,
       PostId:id
      },
      {
        headers:{
          accessToken: localStorage.getItem("accessToken"),
          
        }
      }
      )
    .then((response)=>{
    
      if (response.data.error){
      alert("Login Please !");
      history.push('/login');  
      }else{
        const commentToAdd = {
          commentBody:newComment,
          username: response.data.username,
          id: response.data.id,
          createdAt: response.data.createdAt
        };
        setComments([...comments, commentToAdd]);
        setNewComment('');// will clear the last comment in the input  
      }  
    })
  }

/////////      fonction for delete one post
  const deleteOnePost = (id) => {
    console.log(id);
    axios.delete(`https://groupomania-project-api.herokuapp.com/posts/byId/${id}`, {
      headers:{
        accessToken: localStorage.getItem("accessToken"),      
      },
    })
    .then((response) => {
      console.log(response);
      setPostObject({});
       history.push('/');  
    })

  }


  ////////      fonction for delete one comment    ///////////////
  const deleteComment = (id) =>{ 
  
    axios.delete(`https://groupomania-project-api.herokuapp.com/comments/${id}`,{
      headers:{
        accessToken: localStorage.getItem("accessToken"),      
      },
    })
    .then(()=>{
     setComments(
       comments.filter((val) => {
       console.log(val);
         return val.id !==id;
         
       })
     )
    })

  }


  return (
    
     <div className="postPageContainer">
       <img src ={icon} alt="Logo icon" className="logo"/>
       {/* ************************ */}
       <div className="postPage">
         <div className="leftSide">
            <div className="title"> {postObject.title}</div>
            <div className="body"> {postObject.postText}</div>
            <div className="footer">
              <p>
              {postObject.username}
              </p>
              {
                  authState.username ===postObject.username 
                  &&
                (<DeleteIcon className="deleteBtn" onClick={() => {
                  deleteOnePost(postObject.id)
                }} />)
              }
             
            </div>
         </div>
         {/* ******************************************************CommentSide *************************/}
         <div className="rightSide">
           <div className="addCommentContainer">
               <label htmlFor="comment">Comment</label>
               <input 
               id="comment"
               type="text" 
               placeholder="Write your Comment..." 
               value={newComment}
               onChange ={(event)=>{
                 setNewComment(event.target.value)
               }}/>
               <button onClick={addComment}>Add Comment</button>
             </div>
             {/* *************************************show all the comments */}
             <div className="listOfComments">
             {comments.map((comment, key)=>{
               return <div key={key} className="comment">
                 <div className="commentBody"> {comment.commentBody}
                 </div>
                 <div className="commentFooter">
                   <p>Username: {comment.username}</p>
                   <p>Date: <Moment format="YYYY/MM/DD hh:mm:ss">
                     {comment.createdAt}
                     </Moment>
                   </p>             
                   { 
                   authState.username ===comment.username 
                   && 
                   (<DeleteIcon className="deleteBtn" onClick={() =>   {
                     deleteComment(comment.id);
                   }} />)
                   }
  
                 </div>                                 
                </div>
             })}
           </div>
                
         </div>
       </div>          
     </div>
  )
}


export default Post
