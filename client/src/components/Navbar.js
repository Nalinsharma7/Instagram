import React from "react";
import { Link } from "react-router-dom";

const NavBar = ()=> {
    return (
    <nav>
        <div className="nav-wrapper white">
        <Link onClick={() => {window.location.href="/"}} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right">
            <li><Link onClick={() => {window.location.href="/signin"}}>SignIn</Link></li>
            <li><Link onClick={() => {window.location.href="/signup"}}>SignUp</Link></li>
            <li><Link onClick={() => {window.location.href="/profile"}}>Profile</Link></li>
            <li><Link onClick={() => {window.location.href="/create"}}>Create Post</Link></li>
        </ul>
        </div>
        </nav>
)}

export default NavBar