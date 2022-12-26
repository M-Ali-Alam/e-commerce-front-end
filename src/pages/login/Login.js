import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import './Login.css'

const Login = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const url = useNavigate()

    const login = async () => {
       await axios.post("http://localhost:8080/api/auth/login",{username: name, password: password},{withCredentials: true}).then(response => {
            if (response.data.success)
            {
                localStorage.setItem("user", response.data.details.username)
                if (response.data.isAdmin)
                {
                    localStorage.setItem("isAdmin", true);
                }
                else {
                    localStorage.setItem("isAdmin", false);
                }
                url('/')
            }
            else {
                setError(response.data.message);
            }
        })
    }
  return (
    <>
    <Navbar />
    <div className='container'>
        <h1 className='login-heading'>Varsity Jackets</h1>
        <h2>Welcome Back :)</h2>
        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button disabled={(name === "" || password === "") ? true : false} onClick={login}>Let's Go</button>
        <h1>{error}</h1>
    </div>
    </>
  )
}

export default Login