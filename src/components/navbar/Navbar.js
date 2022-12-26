import React from 'react'
import './Navbar.css'
import logo from '../../assests/logo.png'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons'

const Navbar = () => {
    const url = useNavigate()
    const location = useLocation()

    const logout = async () => {
        localStorage.clear()
        url('/')
    }
    
  return (
    <div className='nav-container'>
        <img src={logo} onClick={() => url('/')} className='logo' alt='logo'/>
        {
            localStorage.getItem('isAdmin') === "false" ?
        <div className='nav-items'>
            <button>women</button>
            <button>men</button>
            <ShoppingCartOutlined onClick={() => url('/cart')} className='cart-icon'/>
            <LogoutOutlined onClick={logout} className='logout'/>
        </div> : localStorage.getItem('isAdmin') === "true" ? <div><button>Add Product</button><LogoutOutlined onClick={logout} className='logout'/></div> :
            location.pathname === "/home" && 
            <div>
            <button onClick={() => url('/login')}>login</button>
            <button onClick={() => url('/register')}>register</button>
            </div>
        }
        {
            location.pathname === "/register" ?
            <div>
            <button onClick={() => url('/login')}>login</button>
            </div> : location.pathname === "/login" ?
            <div>
            <button onClick={() => url('/register')}>register</button>
            </div> : null
        }
    </div>
  )
}

export default Navbar