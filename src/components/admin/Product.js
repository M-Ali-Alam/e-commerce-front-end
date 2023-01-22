import React from "react";
import "./Product.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Products = ({ image, name, id }) => {
  const url = useNavigate();
  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`, {
        headers: { token: localStorage.getItem("token") },
        data: {
          source: "source",
        },
      });
      url("/");
    } catch (error) {
      console.log("error");
      console.error(error);
    }
  };

  const updateProduct = () => {
    url(`/addProduct/${id}`);
  };
  return (
    <div key={id} className="admin-product-container">
      <img
        className="product-img"
        width={300}
        height={200}
        src={`http://localhost:8080/${image}`}
        alt={name}
      />
      <div className="product-footer">
        <div>
          <DeleteOutlined onClick={deleteProduct} />
        </div>
        <h2 className="name">{name}</h2>
        <div>
          <EditOutlined onClick={updateProduct} />
        </div>
      </div>
    </div>
  );
};

export default Products;
