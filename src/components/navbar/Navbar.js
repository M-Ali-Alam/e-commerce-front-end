import React from "react";
import "./Navbar.css";
import logo from "../../assests/logo.png";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../features/app/hooks";
import { removeProducts } from "../../features/cart/cart_slice";

const Navbar = () => {
  const url = useNavigate();
  const dispatch = useAppDispatch();

  const logout = async () => {
    console.log(localStorage.getItem("isAdmin"));
    localStorage.clear();
    dispatch(removeProducts());
    url("/");
  };

  return (
    <div className="nav-container">
      <img src={logo} onClick={() => url("/")} className="logo" alt="logo" />
      {localStorage.getItem("isAdmin") === "false" ? (
        <div className="nav-items">
          <button>Women</button>
          <button>Men</button>
          <ShoppingCartOutlined
            onClick={() => url("/cart")}
            className="cart-icon"
          />
          <LogoutOutlined onClick={logout} className="logout" />
        </div>
      ) : localStorage.getItem("isAdmin") === "true" ? (
        <div>
          <button onClick={() => url("/addProduct")}>Add Product</button>
          <LogoutOutlined onClick={logout} className="logout" />
        </div>
      ) : (
        <div>
          <button onClick={() => url("/login")}>login</button>
          <button onClick={() => url("/register")}>register</button>
          <button onClick={() => url("/products")}>Products</button>
          <ShoppingCartOutlined
            onClick={() => url("/cart")}
            className="cart-icon"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
