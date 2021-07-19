import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';
import icon from '../images/icon-left-font-monochrome-black.svg';
import {AuthContext} from '../helpers/AuthContext'

function Profile() {
    let history = useHistory();
    let {id }= useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/auth/profile/${id}`)// send a request to get user data
        .then((response) => {
            setUsername(response.data.username)
            //console.log(response)

        })
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/posts/byUserId/${id}`)// send a request to get all posts of this user
        .then((response) => {
            console.log(response);
            setListOfPosts(response.data);
        })
    },[]);

    
    return (
        <div className="App">
            <img src ={icon} alt="Logo icon" className="logo"/>
            <div className="userInfo">
                <h1 >Username:<label>{username}</label></h1>
            </div>
            {/* ***********************all the posts of this user********************************** */}
            <div className="listOfPosts">
                {listOfPosts.map((value, key) => {
                   
                 return <div key={key} className="post">
                        <div className="title">{value.title}</div>
                        <div className="body" onClick={() => {
                            history.push(`/post/${value.id}`)   
                        }}>
                            {value.postText}
                        </div>
                        <div className="footer">
                            <p className="username">{value.username}</p> 
                             <p>{value.Likes.length} Likes</p>
                        </div>                      
                    </div>
                })}
            </div>
           
        </div>
    )
}

export default Profile
