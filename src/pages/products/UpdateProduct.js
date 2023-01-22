import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  let { id } = useParams();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: File,
    category: "",
    desc: "",
  });

  const url = useNavigate();

  const [loading, setLoading] = useState(false);

  const fetchDetails = async () => {
    await axios
      .get(`http://localhost:8080/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      });
  };

  useEffect(() => {
    fetchDetails();
    console.log(product);
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setProduct({ ...product, [e.target.name]: e.target.files[0] });
    } else {
      setProduct({ ...product, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", product.name);
    data.append("price", product.price);
    data.append("image", product.image);
    data.append("category", product.category);
    data.append("desc", product.desc);

    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:8080/api/products/${id}`,
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
        value={product.name}
        onChange={handleChange}
      />
      <br />
      <label>Price:</label>
      <input
        type="number"
        name="price"
        value={product.price}
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
        value={product.category}
        onChange={handleChange}
      />
      <br />
      <label>Description:</label>
      <textarea
        name="description"
        value={product.desc}
        onChange={handleChange}
      />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default UpdateProduct;
