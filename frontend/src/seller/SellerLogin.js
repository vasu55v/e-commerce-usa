// import React from 'react'
// import '../styles/login.css'

// const SellerLogin = () => {
//   return (
//     <>
//     <h1><a href="/" className='home_btn'>Home</a></h1>
//     <div className='main_login_component'>
//        <div className='login_component'>
//       <h1>Seller Login</h1>
//       <label for="username">Username:</label>
//       <br />
//       <input type="text" placeholder='enter your first name:' id='username' className='username'/>
//       <br />
//       <label for="pwd">Password&nbsp;&nbsp;:</label>
//       <br />
//       <input type="password" placeholder='enter password:' id='pwd' className='pwd'/>
//     <br />
//     <button className='submit_btn'>Submit</button>
//     </div> 
//     </div>
//     </>
    
//   )
// }

// export default SellerLogin
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

const SellerLogin = () => {

  //  const [username,setUsername]=useState();
  //  const [password,setPassword]=useState();

  const [f_response,set_f_response]=useState();

  const [errorMsg,seterrorMsg]=useState("");



  const [LoginFormData,setLoginFormData]=useState({
    "username":"",
    "password":""
  });           

const inputHandler=(e)=>{
  setLoginFormData({
    ...LoginFormData,
    [e.target.name]:e.target.value,

  })
};

  const handleSubmit=(e)=>{
    // e.preventDefault(); // Prevent the default form submission behavior
    const formData =new FormData();
    formData.append('username',LoginFormData.username); 
    formData.append('password',LoginFormData.password); 

    for (const [key, value] of formData.entries()) {
      set_f_response(`${key}: ${value}`);
    }
    
    api.post('/api/vendor/login/',formData)
    .then(function(res){
      console.log(res);
      if(res.data.bool==false){
        // localStorage.setItem('customer_login',true);
        seterrorMsg(res.data.msg);
      }
      else{
        console.log(res.data)
        localStorage.setItem('vendor_id',res.data.id);
        console.log(res.data.id);
        localStorage.setItem('vendor_login',true);
        localStorage.setItem('vendor_username',res.data.user);
        window.location.href='/sellerpanel';
        seterrorMsg('');
      }
    })
    .catch(function(error){
      console.log(error);
    })
  };


  const checkVendor=localStorage.getItem('vendor_login');

  if(checkVendor){
    window.location.href='/sellerpanel';
  }

  const buttonEnabled =(LoginFormData.username!='')&&(LoginFormData.password!='')

  return (
    <>
      <h1>
        <a href="/" className="home_btn">
          Home
        </a>
      </h1>
      <div className="main_login_component">
        <div className="login_component">
       
          <form>
          <h1>Login</h1>
          {
          errorMsg && 
          <p className="err_msg">{errorMsg}</p>
        }
          <label for="username">Username:</label>
          <br />
          <input
            type="text"
            placeholder="enter your first name:"
            name="username"
            id="username"
            value={LoginFormData.username}
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
            value={LoginFormData.password}
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

export default SellerLogin;
