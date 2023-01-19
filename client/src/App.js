import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar';
import "./App.css"
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './components/screens/Home';
import Signin from './components/screens/Signin'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from './components/screens/CreatePost'
import UserProfile from './components/screens/UserProfile'
import { reducer, initialState } from './reducers/userReducers';
import SubscribedUserPost from './components/screens/SubscribesUserPosts'
import Reset  from './components/screens/reset';
import NewPassword from './components/screens/Newpassword'

import createBrowserHistory from 'history/createBrowserHistory';

export const UserContext = createContext()

const Routing=()=>{
  const history = createBrowserHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  }, [])
  

  return(
    <Switch>
    <Route exact path="/">
    <Home />
  </Route>
  <Route path="/signin">
    <Signin />
  </Route>
  <Route path="/signup">
    <Signup />
  </Route>
  <Route exact path="/profile">
    <Profile />
  </Route>
  <Route path="/create">
    <CreatePost />
  </Route>
  <Route path="/profile/:userid">
    <UserProfile />
  </Route>
  <Route path="/myfollowingpost">
    <SubscribedUserPost />
  </Route>
  <Route exact path="/reset">
    <Reset />
  </Route>
  <Route path="/reset/:token">
    <NewPassword />
  </Route>
  </Switch>
  )
}


function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;


// Send grid API Key

//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