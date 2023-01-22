import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const url = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username: name,
        password: password,
      });

      console.log(res);
      if (res.data === "Invalid Credentials") {
        setError("Invalid Credentials");
      } else {
        setError("");
        localStorage.setItem("token", res.data.body.token);
        url("/");
        localStorage.setItem(
          "isAdmin",
          res.data.body.type === "admin" ? "true" : "false"
        );
        console.log("localStorage.getItem(isAdmin)");
        console.log(localStorage.getItem("isAdmin"));
      }
    } catch (err) {
      setError("Service is currently not available");
      console.log("an error occured, sad life");
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="login-heading">Varsity Jackets</h1>
        <h2>Welcome Back :)</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          disabled={name === "" || password === "" ? true : false}
          onClick={login}
        >
          Let's Go
        </button>
        <h1 color="red">{error}</h1>
      </div>
    </>
  );
};

export default Login;
