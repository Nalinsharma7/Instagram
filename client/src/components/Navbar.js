import React,{useContext,useRef,useEffect,useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from 'materialize-css'

const NavBar = () => {
    const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
    const RenderList = () => {
        // console.log(state)
        if(state) {
            return [
                <li key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black"}}>search</i></li>,
                <li key="2"><Link onClick={() => {window.location.href="/profile"}}>Profile</Link></li>,
                <li key="3"><Link onClick={() => {window.location.href="/create"}}>Create Post</Link></li>,
                <li key="4"><Link onClick={() => {window.location.href="/myfollowingpost"}}>My following Post</Link></li>,
                <li key="5">
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
                
                <li key="6"><Link onClick={() => {window.location.href="/signin"}}>SignIn</Link></li>,
                <li key="7"><Link onClick={() => { window.location.href = "/signup" }}>SignUp</Link></li>,
                
            ]
        }
    }

    const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
        })
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
        <div id="modal1" class="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
        </nav>
)}

export default NavBar