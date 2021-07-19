import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import logo from '../images/icon.png';


function Signup() {
    let history = useHistory()
    const initialValues ={ // 
        username:"",
        email:"",
        password:"",
    };

    const validationSchema = yup.object().shape({
        username: yup.string().min(3).max(20).required(),
        email: yup.string().email().required(),
        password: yup.string().min(6).max(25).required(),
    })

    const onSubmit =(data)=>{ //send a request to check signup data, if there has not error then create a account, 
        axios.post("http://localhost:8000/auth/signup",data)
        .then((response)=>{
            console.log(response);
            history.push('/');    
        })
        .catch((error) => {
            alert(error + ", User already exist !")
        })
    };

   
    return (
        <div className="loginContainer">
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="signupCantainerLeft">                  
                    <label htmlFor="username">Username:</label>
                    <ErrorMessage name="username" component="span" />
                    <Field 
                    id="username" 
                    name="username" 
                    placeholder="(Ex. Rachel...)"
                    />
                    <label htmlFor="email">Email:</label>
                    <ErrorMessage name="email" component="span" />
                    <Field 
                    id="email" 
                    name="email" 
                    placeholder="(Ex. Rachel1984@gmail.com....)"
                    />
                    <label htmlFor="password">password</label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Put your password 6-25..."
                    />
                    <button type="submit" className="signupBtn">Signup</button>
                </Form>
            </Formik>
            <div className="signupContainerRight">
            <img src ={logo} alt="Logo" className="logo"/>
            </div>
        </div>
    )
}

export default Signup
