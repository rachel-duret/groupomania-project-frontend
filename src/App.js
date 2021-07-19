import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PageNotFound from './pages/PageNotFound'
import {AuthContext} from './helpers/AuthContext'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { createBrowserHistory } from "history";


function App() {
  let  history = createBrowserHistory();

  //首先设置authState 为没有
  const [authState, setAuthState] = useState({
    username:"",
    id:0,
    status:false
  });

  useEffect(() => {
    //检测本地存储是否有token， 有的话就把authState 变成true  send a request to check is there has a token in localstorage or not. 
    axios.get('https://groupomania-project-api.herokuapp.com/auth/info',
    {
      headers:{
        accessToken: localStorage.getItem("accessToken"),              
      },
    })
    .then((response) => {
    
      if(response.data.error){// if there is has not a token, then set auth status = false
        setAuthState({...authState, status:false});
      }else{
        setAuthState({
          username:response.data.username,
          id:response.data.id,
          status:true
        });
      }
    });  
  }, [])

  /* ************************************logout function *********************************/
  const logout = () =>{
    localStorage.removeItem("accessToken");
     setAuthState({
      username:"",
      id:0,
      status:false
     });
    history.push('/login');
    window.location.reload();

  }
  
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState}}>
      <Router>
          <div className="navbar">
            <div className="links">
              { !authState.status ? (
                <>
                  <Link to="/signup">Signup</Link>
                  <Link to="/login">Login</Link>
                </>
              ) : (
                <>
                  <Link to="/">Home Page</Link>
                  <Link to="/createpost">Create A Post</Link>
                </>
              )}           
            </div>
            <div className="loggedContainer">
              {authState.status && (<h1 className="username">{authState.username}</h1>)}
                  
                {authState.status && <button className="logoutBtn" onClick={logout}>Logout</button>} 
            </div>             
          </div>
          
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/post/:id" exact component={Post} />
            <Route path ="/signup" exact component={Signup} />
            <Route path = "/login" exact component={Login} />
            <Route path = "/profile/:id" exact component={Profile} />
            <Route path ="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>

        

      
    </div>
  );
}

export default App;
