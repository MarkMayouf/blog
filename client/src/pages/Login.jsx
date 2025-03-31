import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'


const Login = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const [err, setError] = useState(null)

  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(inputs)
      navigate('/')
    } catch (err) {
      setError(err.response ? err.response.data : "An unexpected error occurred.");
  }
  }

  return (
    <div className='auth'>
      <form>
        <h1>Login</h1>
        <input
          required
          type='text'
          placeholder='username'
          name='username'
          onChange={handleChange}
        />
        <input
          required
          type='password'
          placeholder='password'
          name='password'
          onChange={handleChange}
        />
        {err && <p>{err}</p>}
        <span>Don't you have an account ?</span>
        <Link style={{ textAlign: 'center' }} to='/register'>
          Register
        </Link>
        <button onClick={handleSubmit}>Login</button>
      </form>
    </div>
  )
}

export default Login
