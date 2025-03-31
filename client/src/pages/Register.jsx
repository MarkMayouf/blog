import React, { useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"

const Register = () => {
const navigate=useNavigate()  

const[err,setError]=useState(null)

  const[inputs,setInputs]=useState({
    username:"",
    email:"",
    password:""
  })
 
const handleChange=e=>{
  setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
}
const handleSubmit= async(e)=>{
  e.preventDefault()
  try {
  await axios.post("/auth/register",inputs)
  navigate("/login")
   
    
  } catch (err) {
    setError(err.response.data)
  }

}

  return (    
    <div className='auth'>
      <form>
        <h1>Register</h1>
        <input required type="text"  onChange={handleChange}  name='username'  placeholder='username' />
        <input required type="email"  onChange={handleChange}    name='email'  placeholder='email' />
        <input required type="password"  onChange={handleChange}   name='password'   placeholder='password' />
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>Don you have an account ?<Link style={{textAlign:"center"
        }} to="/login">Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register