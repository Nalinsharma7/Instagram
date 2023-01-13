import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import { useParams } from 'react-router-dom'

function Profile() {
  const [userProfile,SetProfile] = useState(null)
  const [showFollow,setShowFollow] = useState(true)
  const {state,dispatch} = useContext(UserContext)
  const {userid} = useParams()
  console.log(userid)
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        SetProfile(result)
      })
  },[userid])


  const followUser = () =>{
    fetch('/follow',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        followId:userid
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
      SetProfile((prevState)=>{
        return {
          ...prevState,
          user:{
            ...prevState.user,
            followers:[...prevState.user.followers,data._id]
          }
        }
      })
      setShowFollow(false)
    })
  }
  const unfollowUser = () =>{
    fetch('/unfollow',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem('jwt')
      },
      body:JSON.stringify({
        unfollowId:userid
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
      SetProfile((prevState)=>{
        const newFollower = prevState.user.followers.filter(item=>item != data._id)
        return {
          ...prevState,
          user:{
            ...prevState.user,
            followers:newFollower
          }
        }
      })
      setShowFollow(true)
    })
  }
  return (
    <>
    {userProfile ? 
    
    <div style={{maxWidth:"550px",margin:"0 auto"}}>
      <div style={{
          display:"flex",
          justifyContent:"space-around",
          margin:"18px 0px",
          borderBottom:"1px solid grey"
        }}>
        <div >
          <img style={{width:"160px",height:"160px",borderRadius:"80px"}} 
            src="https://images.unsplash.com/photo-1637058267061-1115f6418518?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29uJTIwaW1hZ2V8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          />
        </div>
        <div>
          <h4>{userProfile.user.name}</h4>
          <h4>{userProfile.user.email}</h4>
          <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
            <h6>{userProfile.posts.length} Posts</h6>
            <h6>{userProfile.user.followers.length} Followers</h6>
            <h6>{userProfile.user.following.length} Following</h6>
          </div>
          {showFollow?
          <button style={{
            margin:"10px"
          }} className="btn waves-effect waves-light #1976d2 blue darken-2"
            onClick={()=>followUser()}
          >
            Follow
          </button>
          :
          <button style={{
            margin:"10px"
          }}   className="btn waves-effect waves-light #1976d2 blue darken-2"
            onClick={()=>unfollowUser()}
          >
            unFollow
          </button>   
        
          }
          
          
        </div>
      
      
      
      </div>

      <div className="gallery">  
        {
          userProfile.posts.map(item => {
            return (
              <img className="item" key={item._id} src={ item.photo} alt={item.title} />      
            )
          })
        }
        
        
      </div>
    </div>
    
    : <h2>Loading...</h2>}
    
    </>
  )
}

export default Profile
