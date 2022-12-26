import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import AdminHome from './admin/adminHome'
import './Home.css'
import UserHome from './user/userHome'
import img1 from '../../assests/home1.png'
import img2 from '../../assests/home2.png'

const Home = () => {

  return (
    <>
      <Navbar />
      <div className='home-container'>
        {!localStorage.getItem("isAdmin") ? 
        <div className='home-container'>
        <h1 className='home-title'>Varsity Jackets</h1>
        <div>
        <img src={img1} alt='brand1'/>
        <img src={img2} alt='brand1'/>
        </div>
        </div>: null }
      {
        localStorage.getItem("isAdmin") === "true" ? 
        <AdminHome /> : localStorage.getItem("isAdmin") === "false" ? <UserHome /> : null
      }
      </div>
    </>
  )
}

export default Home