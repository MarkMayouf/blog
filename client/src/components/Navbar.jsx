import React, { useContext } from 'react'
import Logo from '../img/Logo.bmp'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            {' '}
            <img src={Logo} alt='' />{' '}
          </Link>
        </div>
        <div className='links'>
          <Link className='link' to='/?cat=philosophy'>
            <h6>PHILOSOPHY</h6>
          </Link>
          <Link className='link' to='/?cat=futurology'>
            <h6>FUTUROLOGY</h6>
          </Link>
          <Link className='link' to='/?cat=socialpsychology'>
            <h6> SOCIAL PSYCHOLOGY</h6>
          </Link>
          <Link className='link' to='/?cat=hermeneutics'>
            <h6>HERMENEUTICS</h6>
          </Link>
          <Link className='link' to='/?cat=management'>
            <h6>MANAGEMENT</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}> Logout</span>
          ) : (
            <Link className='link' to='/login'>
              Login
            </Link>
          )}
          <span className='write'>
            <Link className='link' to='/write'>
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
