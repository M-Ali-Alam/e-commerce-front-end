import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: File,
    category: "",
    description: "",
  });

  const url = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("image", formData.image);
    data.append("category", formData.category);
    data.append("description", formData.description);
    console.log(data.image);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/api/products/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: localStorage.getItem("token"),
          },
        }
      );

      console.log(res.data);
      setLoading(false);
      url("/");
    } catch (err) {
      // if user uploads any other file than image
      if (err.message === "Request failed with status code 500") {
        setError("Please upload correct image");
      }

      console.log("An error occured");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h1>Add Product</h1>
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
      />
      <br />
      <label>Image:</label>
      <input type="file" name="image" onChange={handleChange} />
      <br />
      <label>Category:</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
      />
      <br />
      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
      <h3>{error}</h3>
    </form>
  );
};

export default AddProduct;
