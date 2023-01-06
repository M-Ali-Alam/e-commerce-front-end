import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Product from "../../components/user/product/Product";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    await axios.get("http://localhost:8080/api/products/").then((response) => {
      setProducts(response.data);
    });
  };

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Products</h1>
        <div className="products-list">
          {products.map((product) => (
            <Product
              image={product.image}
              name={product.name}
              id={product._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
