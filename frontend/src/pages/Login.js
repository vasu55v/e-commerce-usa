import Form from "../components/Form.js";

// import React from 'react'

// const Login = () => {
//   return <Form route="/api/token/" method="login" />
// }

// export default Login

import React, { useState } from "react";
import "../styles/login.css";
import axios from "axios";
import api from "../api.js";

const Login = () => {

  //  const [username,setUsername]=useState();
  //  const [password,setPassword]=useState();

  const [f_response,set_f_response]=useState();

  const [formError,setFormError]=useState(false);
  const [errorMsg,seterrorMsg]=useState("");


  const [loginFormData,setLoginFormData]=useState({
    "username":"",
    "password":""
  });           

const inputHandler=(e)=>{
  setLoginFormData({
    ...loginFormData,
    [e.target.name]:e.target.value,

  })
};

  const handleSubmit=(e)=>{
    // e.preventDefault(); // Prevent the default form submission behavior
    const formData =new FormData();
    formData.append('username',loginFormData.username); 
    formData.append('password',loginFormData.password); 

    for (const [key, value] of formData.entries()) {
      set_f_response(`${key}: ${value}`);
    }
    
    api.post('/api/customer/login/',formData)
    .then(function(res){
      console.log(res);
      if(res.data.bool==false){
        // localStorage.setItem('customer_login',true);
        setFormError(true);
        seterrorMsg(res.data.msg);
      }
      else{
        console.log(res.data)
        localStorage.setItem('customer_id',res.data.id);
        console.log(res.data.id);
        localStorage.setItem('customer_login',true);
        localStorage.setItem('customer_username',res.data.user);
        setFormError(false);
        seterrorMsg('');
      }
    })
    .catch(function(error){
      console.log(error);
    })
  };


  const checkCustomer=localStorage.getItem('customer_login');

  if(checkCustomer){
    window.location.href='/dashboard';
  }

  const buttonEnabled =(loginFormData.username!='')&&(loginFormData.password!='')

  return (
    <>
      <h1>
        <a href="/" className="home_btn">
          Home
        </a>
      </h1>
      <div className="main_login_component">
        <div className="login_component">
        {
          formError && 
          <p className="err_msg">{errorMsg}</p>
        }
          <form>
          <h1>Login</h1>

          <label for="username">Username:</label>
          <br />
          <input
            type="text"
            placeholder="enter your first name:"
            name="username"
            id="username"
            value={loginFormData.username}
            onChange={inputHandler}
            className="username"
          />
          <br />
          <label for="pwd">Password&nbsp;&nbsp;:</label>
          <br />
          <input
            type="password"
            placeholder="enter password:"
            name="password"
            id="pwd"
            value={loginFormData.password}
            onChange={inputHandler}
            className="pwd"
          />
          <br />
          
          <button type="button" onClick={handleSubmit} disabled={!buttonEnabled} className="submit_btn" >Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
