import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Product.css'

const Product = ({image, name, id}) => {
    const url = useNavigate()

  return (
    <div key={id} className='user-product-container'>
    <img className='product-img' src={`http://localhost:8080/${image}`} alt={name}/>
    <button onClick={() => url(`/products/${id}`)}>{name}</button>
</div>
  )
}

export default Product