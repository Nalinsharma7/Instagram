import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
  let  history = useHistory()
  const [name,setName] = useState("")  
  const [password,setPassword] = useState("")  
  const [email,setEmail] = useState("")  
  const [image,setImage] = useState("")
  const [url,setUrl] = useState(undefined)

  useEffect(()=>{
    if(url){
      uploadFields()
    }
  },[url])

  const uploadPic =()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","insta-clone")
    data.append("cloud_name","dboyz3rbk")//daj3ul1sq //nalinsharma.610@gmail.com
    fetch("https://api.cloudinary.com/v1_1/dboyz3rbk/image/upload",{
      method:"post",
      body:data
    })
      .then(res=>res.json())
      .then(data=>{
        setUrl(data.url)
      })
        .catch(err=>{
          console.log(err)
        })
  }

  const uploadFields = ()=>{
    fetch("/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        email,
        password,
        pic:url
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
      }).catch(err=>{
        console.log(err)
      })
  }

  const PostData = ()=>{
    if(image){
      uploadPic()
    }else{
      uploadFields()
    }
    // if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    //     M.toast({html:"Invalid Email",classes:"#d50000 red accent-4"})
    //     return
    //   }
    
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

        <div className="file-field input-field">
        <div className="btn">
            <span>Upload Profile pic</span>
            <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
        </div>
        </div>

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
