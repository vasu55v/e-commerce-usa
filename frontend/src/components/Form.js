import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import "../styles/form.css";

import React, { useState } from "react";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");

  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      }
      else {
        navigate("/login")
    }
    } catch (error) {
      alert(error);
      // console.log(error);  
    }
  };

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit} className="form">
      <h1>{name}</h1>
      <input
        className="text_input_name"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username:"
      />
      <br />
      <input
        className="text_input_password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password:"
      />
      <br />
      <button className="form_btn" type="submit">
        {name}
      </button>
    </form>
    </div>
  );
};

export default Form;

