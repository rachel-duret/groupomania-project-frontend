import React, { useContext } from 'react'
import axios from 'axios';
import{useEffect, useState} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import icon from '../images/icon-left-font-monochrome-black.svg';

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const {authState} = useContext(AuthContext);
    let history = useHistory();// its an object
    /* API get */
      useEffect(()=>{

        if ( !localStorage.getItem('accessToken')) {
          history.push('/login')
        } else{
          axios.get("https://groupomania-project-api.herokuapp.com/posts")
        .then((response)=>{
         //console.log(response.data);
          setListOfPosts(response.data)//后端添加include Likes， 所有现在ListOfPosts里面已经包含Likes的数据
         
         })
        }       
      }, []);

      const likePost = (postId) => {
        axios.post("https://groupomania-project-api.herokuapp.com/likes",
        {PostId: postId},
        {headers: 
          {
          accessToken: localStorage.getItem("accessToken"),
        }
       })
       .then((response) => {
         //console.log(response);      
         setListOfPosts(listOfPosts.map((post)=>{
           if (post.id=== postId) {
             if (response.data.liked){// 后端设置liked为true or false， 如果为真就改变Likes里面的数据。
              console.log(response.data.like)
              post.Likes.push(response.data.like)
              return {...post, Like: [post.Likes, 0]};
              
             }else{  // 如何为false就是代表取消like, 删除like数组里的最后一条记录
               const likeArray = post.Likes;
               console.log(likeArray);
               likeArray.pop(); 
               console.log(likeArray)
               return {...post, Like: likeArray };
             }
             
           }else{
             return post
           }
         }))
       })
      };

    return (
        <div className="App">
          <img src ={icon} alt="Logo icon" className="logo"/>
        {listOfPosts.map((value, key)=>{

          return <div key={key} className="post">
            <div className="title">{value.title}</div>
            <div className="body" 
            onClick={()=>{
              history.push(`/post/${value.id}`)/* link to post/:id page */
          }}>
            {value.postText}
            </div>

            <div className="footer">
              <p className="username">
                <Link to={`/profile/${value.UserId}`}>
                  {value.username}
                </Link>             
              </p>
              <div className="likeBtn">
              <ThumbUpIcon onClick={() => {
                likePost(value.id)
              }} />
                <p>{value.Likes.length}</p>
              </div>
              
             
              
            </div>
          </div>;
        })}
       </div>
    )
}

export default Home
