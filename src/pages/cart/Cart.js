import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useAppSelector } from '../../features/app/hooks'
import './Cart.css'

const Cart = () => {
    const cartitems = useAppSelector(state => state.cart.products)
  return (
    <>
    <Navbar />
    <div className='cart-container'>
        {
            cartitems.map(item => (
                <div className='item'>
                    <h1 className='product-name'>{item.name}</h1>
                    <img className='product-image' src={`http://localhost:8080/${item.image}`}/>
                </div>
            ))
        }
    </div>
    </>
  )
}

export default Cart