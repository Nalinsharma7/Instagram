import React from 'react'
import {Link} from 'react-router-dom'

function Signup() {
  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input 
          type="text"
          placeholder="name"
        />
        <input 
          type="text"
          placeholder="email"
        />
        <input 
          type="text"
          placeholder="password"
        />
        <button className="btn waves-effect waves-light #1976d2 blue darken-2">
          SignUp
        </button>
        
        <h5><Link onClick={() => {window.location.href="/signin"}}>Already have an account ?</Link></h5>
        
      </div>
    </div>
  )
}

export default Signup
