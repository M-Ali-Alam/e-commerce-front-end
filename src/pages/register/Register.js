import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [address, setAddress] = useState("");
  const [cardDetails, setCardDetails] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const url = useNavigate();

  const register = () => {
    if (password !== confirmPass) {
      setError("password and confrim password are different");
    } else {
      axios
        .post("http://localhost:8080/api/auth/register", {
          username: name,
          password: password,
          address: address,
          card_details: cardDetails,
          phone: contact,
        })
        .then((response) => {
          console.log("response.data");
          console.log(response.data);
          if (response.data === "already exists") {
            setError("This User name is already taken, please select another");
          }
          if (response.data.success) {
            url("/login");
          }
        });
    }
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Please enter your details...</h1>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Card details"
          value={cardDetails}
          onChange={(e) => setCardDetails(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <button
          disabled={
            name === "" ||
            password === "" ||
            address === "" ||
            cardDetails === "" ||
            contact === ""
              ? true
              : false
          }
          onClick={register}
        >
          Let's Go
        </button>
        <h1>{error}</h1>
      </div>
    </>
  );
};

export default Register;
