import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import { useAppDispatch } from '../../features/app/hooks'
import { addProduct } from '../../features/cart/cart_slice'
import './ProductDetails.css'

const ProductDetails = () => {
    const [product, setProduct] = useState({})
    let {id} = useParams()

    const dispatch = useAppDispatch()

    const addtoCart = () => {
        dispatch(addProduct(product))
    }

    const fetchDetails = async () => {
        await axios.get(`http://localhost:8080/api/products/${id}`).then(response => {
            setProduct(response.data)
        })
    }
    useEffect(() => {
        fetchDetails()
        console.log(product)
      })
  return (
    <>
    <Navbar />
    <div className='product-container'>
        <img className='img' src={`http://localhost:8080/${product.image}`} />
        <div className='details-container'>
        <div className='details'>
        <h1 className='product-name'>{product.name}</h1>
        <p className='product-desc'>{product.desc}</p>
        </div>
        <div className='action-buttons'>
            <button>Buy Now</button>
            <button onClick={addtoCart}>Add To Cart</button>
        </div>
        </div>
    </div>
    </>
  )
}

export default ProductDetails