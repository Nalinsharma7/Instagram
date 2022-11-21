import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
  let  history = useHistory()
  const [name,setName] = useState("")  
  const [password,setPassword] = useState("")  
  const [email,setEmail] = useState("")  

  const PostData = ()=>{
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        M.toast({html:"Invalid Email",classes:"#d50000 red accent-4"})
        return
      }
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password
      })
    }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        if(data.error){
          M.toast({html: data.error,classes:"#d50000 red accent-4"})
        }else{
          M.toast({html:data.message,classes:"#64dd17 light-green accent-4"})
          history.push("/signin")
          document.location.reload()
        }
      })
  }

  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input 
          type="text"
          placeholder="name"
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        />
        <input 
          type="text"
          placeholder="email"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
        />
        <input 
          type="text"
          placeholder="password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <button className="btn waves-effect waves-light #1976d2 blue darken-2"
          onClick={()=>PostData()}
        >
          SignUp
        </button>
        
        <h5><Link onClick={() => {window.location.href="/signin"}}>Already have an account ?</Link></h5>
        
      </div>
    </div>
  )
}

export default Signup
