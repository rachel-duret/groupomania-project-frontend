import React, {useState, useContext} from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import logo from '../images/icon.png';
import {AuthContext} from '../helpers/AuthContext'


function Login() {
    let history = useHistory()

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setAuthState} = useContext(AuthContext);

    const login = ()=>{
        const data = { username: username, email: email, password: password};
        axios.post('http://localhost:8000/auth/login', data)
        .then((response)=>{
            console.log(response);
        
            if (response.data.error){ 
               alert(response.data.error)
            }
            else{ 
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    username:response.data.username,
                    id:response.data.id,
                    status:true
                });
                history.push("/");
            }
          
        });
    };
    
    return (
        <div className="loginContainer">
            <div className= "loginCantainerLeft">
                <label htmlFor="loginUsername">Username</label>
                <input type="text" 
                id="loginUsername"
                placeholder="Username"
                onChange = {(event)=>{
                    setUsername(event.target.value);
                }}
                />
                <label htmlFor="loginEmail">Email</label>
                <input type="email" 
                id="loginEmail"
                placeholder="Email"
                onChange = {(event)=>{
                    setEmail(event.target.value);
                }}
                />
                <label htmlFor="loginPassword">Password</label>
                <input type="password"
                id="loginPassword"
                placeholder="Password"
                onChange = {(event)=>{
                    setPassword(event.target.value);
                }}
                />
                <button onClick={login}>Login</button>
            </div>
            <div className= "loginCantainerRight">
                <img src ={logo} alt="Logo" className="logo"/>
            </div>
           
        </div>
    )
}

export default Login
