import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../helpers/AuthContext'
import icon from '../images/icon-left-font-monochrome-black.svg';



function CreatePost() {
    const {authState} = useContext(AuthContext);
    let history = useHistory()
    const initialValues ={
        title: "",
        postText:"",
        imageUrl:null
    };

    useEffect(() => {

        if ( !localStorage.getItem('accessToken')) {
            history.push('/login');
        }
    }, [])

    /* const setFiledValue = (files)=>{       
    } */

    const onSubmit =(data)=>{
        console.log(data);
        /* let data = new initialValues();
        data.append('imageUrl', values.imageUrl) */
        console.log(data);
        axios.post("https://groupomania-project-api.herokuapp.com/posts",data,{
            headers:{
                accessToken: localStorage.getItem("accessToken"),              
              }
        })
        .then((response)=>{
            if(response.data.error){// response.status
                console.log(response);
                alert("Login Please!");
                //history.push('/login'); 
            }else{
                history.push('/'); 
            }                   
        });
    };

    const validationSchema = yup.object().shape({
        title: yup.string().required('You must put a title!'),
        postText: yup.string().required(),
        imageUrl:yup.mixed(),
        
    })







    return (
        <div className="createPostPage">
            <img src ={icon} alt="Logo icon" className="logo"/>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                
                <Form className="formContainer">
                    <label htmlFor="inputCreatePostTitle">Title:</label>
                    <ErrorMessage name="title" component="span" />
                    <Field              
                    id="inputCreatePostTitle" 
                    name="title" 
                    placeholder="(Ex. Title...)"
                    />

                    <label htmlFor="inputCreatePostBody">Post:</label>
                    <ErrorMessage name="postText" component="span" />
                    <Field         
                    id="inputCreatePostBody" 
                    name="postText" 
                    placeholder="(Ex. Post...)"
                    />
                    {/* <input type="file" name="imageUrl" onChange={(event)=>{
                         setFiledValue( event.currentTarget.files[0])
                    }} /> */}                    
                    <button className="createBtn" type="submit">Create Post</button>
                    
                </Form>

            </Formik>
          
        </div>
    )
}

export default CreatePost
