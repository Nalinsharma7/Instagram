import React,{useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import createBrowserHistory from 'history/createBrowserHistory';

const NavBar = () => {
    const history = useHistory()
    const {state,dispatch} = useContext(UserContext)
    const RenderList = () => {
        console.log(state)
        if(state) {
            return [
                <li><Link onClick={() => {window.location.href="/profile"}}>Profile</Link></li>,
                <li><Link onClick={() => {window.location.href="/create"}}>Create Post</Link></li>,
                <li>
                    <button className="btn #c62828 red darken-3"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: "CLEAR" })
                            history.push('/signin')
                            document.location.reload()
                    }}>
                        LOGOUT
                    </button>
                </li>
            ]
        }else {
            return [
                
                <li><Link onClick={() => {window.location.href="/signin"}}>SignIn</Link></li>,
                <li><Link onClick={() => { window.location.href = "/signup" }}>SignUp</Link></li>,
                
            ]
        }
    }


    return (
    <nav>
        <div className="nav-wrapper white">
        <Link to={state?"/":"/signin"} onClick={() => {document.location.reload()}} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right">
                {RenderList()}
                    {/* <li><Link onClick={() => {window.location.href="/signin"}}>SignIn</Link></li>
            <li><Link onClick={() => {window.location.href="/signup"}}>SignUp</Link></li>
            <li><Link onClick={() => {window.location.href="/profile"}}>Profile</Link></li>
            <li><Link onClick={() => {window.location.href="/create"}}>Create Post</Link></li> */}
        </ul>
        </div>
        </nav>
)}

export default NavBar