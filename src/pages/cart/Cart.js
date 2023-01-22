import axios from "axios";
import React, { useState } from "react";
import { Modal } from "antd";
import Navbar from "../../components/navbar/Navbar";
import { useAppSelector } from "../../features/app/hooks";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartitems = useAppSelector((state) => state.cart.products);
  const [modal, setModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [route, setRoute] = useState("");
  const url = useNavigate();

  const placeOrder = async () => {
    if (localStorage.getItem("isAdmin")) {
      if (
        localStorage.getItem("isAdmin") === "false" &&
        cartitems.length === 0
      ) {
        setMsg("Add product(s) to cart to make an order");
        setModal(true);
        setRoute("/");
      } else {
        console.log(cartitems);
        console.log(localStorage.getItem("token"));
        await axios
          .post("http://localhost:8080/api/products/place-order/", {
            orderDetails: cartitems,
            token: localStorage.getItem("token"),
          })
          .then(() => {
            setMsg("Thank you for being a valuable customer!");
            setModal(true);
            setRoute("/");
          });
      }
    } else {
      setMsg("Please login to make an order :)");
      setModal(true);
      setRoute("/login");
    }
  };
  return (
    <>
      <Navbar />
      <Modal
        closable={false}
        bodyStyle={{
          textAlign: "center",
          height: "200px",
          paddingTop: "100px",
          borderRadius: "50px",
        }}
        open={modal}
        centered
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => url(route)}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              OK
            </button>
          </div>
        }
      >
        <p>{msg}</p>
      </Modal>
      <div className="cart-container">
        {cartitems.map((item) => (
          <>
            <div className="item">
              <h1 className="product-name">{item.name}</h1>
              <img
                className="product-image"
                src={`http://localhost:8080/${item.image}`}
              />
            </div>
          </>
        ))}
        {cartitems.length !== 0 ? (
          <button onClick={placeOrder}>Place Order</button>
        ) : (
          <div>
            <p>Your cart is empty :(</p>
            <button onClick={() => url("/products")}>Search Products</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
