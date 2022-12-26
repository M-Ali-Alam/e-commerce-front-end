import React from 'react'
import './Product.css'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'
import axios from 'axios'

const Products = ({image, name, id}) => {
    const deleteProduct = async() => {
        await axios.delete(`http://localhost:8080/api/products/${id}`)
    }
  return (
    <div key={id} className='admin-product-container'>
        <img className='product-img' src={`http://localhost:8080/${image}`} alt={name}/>
        <div className='product-footer'>
        <DeleteOutlined onClick={deleteProduct}/>
        <h2 className='name'>{name}</h2>
        <EditOutlined />
        </div>
    </div>
  )
}

export default Products