import React from 'react'
import {Link} from 'react-router-dom'

function SignIn() {
  return (
    <div className='mycard'>
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input 
          type="text"
          placeholder="email"
        />
        <input 
          type="text"
          placeholder="password"
        />
        <button className="btn waves-effect waves-light #1976d2 blue darken-2">
          SignIn
        </button>

        <h5><Link onClick={() => {window.location.href="/signup"}}>Don't have an account ?</Link></h5>

        
        
      </div>
    </div>
  )
}

export default SignIn
