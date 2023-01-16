import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'



function CreatePost() {
  let  history = useHistory()
  const [title,SetTitle] = useState("")
  const [body,SetBody] = useState("")
  const [image,SetImage] = useState("")
  const [url,SetURL] = useState("")
  useEffect(()=>{
      if(url){
        fetch("/createpost",{
          method:"post",
          headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
            title,
            body,
            pic:url
          })
        }).then(res=>res.json())
          .then(data=>{
            // console.log(data)
            if(data.error){
              M.toast({html: data.error,classes:"#d50000 red accent-4"})
            }else{
              M.toast({html:"Created Post",classes:"#64dd17 light-green accent-4"})
              history.push("/")
              document.location.reload()
            }
          }).catch(err=>{
            console.log(err)
          })
      }
  },[url])

  const postDetails= ()=>{
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
        SetURL(data.url)
      })
        .catch(err=>{
          console.log(err)
        })
        
  }


  return (
    <div className="card input-field"
        style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:"20px",
            textAlign:"center"
        }}
    >
        <input type="text" 
        placeholder="title" 
        value={title} 
        onChange={(e)=>{SetTitle(e.target.value)}}
        />

        <input type="text" 
        placeholder="body" 
        value={body} 
        onChange={(e)=>{SetBody(e.target.value)}}
        />

        <div className="file-field input-field">
        <div className="btn">
            <span>Upload Image</span>
            <input type="file" onChange={(e)=>SetImage(e.target.files[0])}/>
        </div>
        <div className="file-path-wrapper">
            <input className="file-path validate" type="text"/>
        </div>
        </div>
        
        <button className="btn waves-effect waves-light #1976d2 blue darken-2"
          onClick={()=>postDetails()}
        >
          Create Post
        </button>
    </div>
  )
}

export default CreatePost