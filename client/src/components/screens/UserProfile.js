import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import { useParams } from 'react-router-dom'

function Profile() {
  const [userProfile,SetProfile] = useState(null)
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
        SetProfile(result)
      })
  },[])
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
            <h6>98 Followers</h6>
            <h6>105 Following</h6>
          </div>
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
