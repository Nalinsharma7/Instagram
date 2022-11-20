import React from "react";
import { Link } from "react-router-dom";

const NavBar = ()=> {
    return (
    <nav>
        <div class="nav-wrapper white">
        <Link onClick={() => {window.location.href="/"}} class="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" class="right">
            <li><Link onClick={() => {window.location.href="/signin"}}>SignIn</Link></li>
            <li><Link onClick={() => {window.location.href="/signup"}}>SignUp</Link></li>
            <li><Link onClick={() => {window.location.href="/profile"}}>Profile</Link></li>
        </ul>
        </div>
        </nav>
)}

export default NavBar