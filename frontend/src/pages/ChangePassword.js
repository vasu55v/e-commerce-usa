// import React from 'react'
// import '../styles/changepassword.css'

// const ChangePassword = () => {
//   return (
//     <>
//     <h1><a href="/" className='home_btn'>Home</a></h1>
//     <div className='main_cng_password_container'>
//     <div className='cng_password_container'>
//     <h1 className='c_title'>Change Password</h1>
//     <br />
//     <br />
//     <label for="pwd">Password&nbsp;&nbsp;:</label>
//     <br />
//       <input type="password" placeholder='enter password:' id='pwd' className='pwd'/>
//     <br />
//       <label for="pwd">Re-enter Password&nbsp;&nbsp;:</label>
//       <br />
//       <input type="password" placeholder='enter password:' id='pwd' className='pwd'/>
//     <br />
//        <button className='c_submit_btn'>Submit</button>
//     </div>
//     </div>
//     </>
    
//   )
// }

// export default ChangePassword

import React, { useState } from "react";
import "../styles/changepassword.css";
import api from '../api'

const ChangePassword = () => {

  const customer_id=localStorage.getItem('customer_id')


  const [passwordData, setPasswordData] = useState({
    password: "",
    c_password: "",
  });

  const [confirmError,setConfirmError]=useState(false);
  const [confirm,setConfirm]=useState(false);

  const inputHandler = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  
  };


  const handleSubmit = (e) => {
    // e.preventDefault(); // Prevent the default form submission behavior
    if(passwordData.password==passwordData.c_password){
      setConfirmError(false)
    }
    else{
      setConfirmError(true)
    }
    const formData = new FormData();
    formData.append("password",passwordData.password);

    // // for (const [key, value] of formData.entries()) {
    // //   set_f_response(`${key}: ${value}`);
    // // }

    
    api
      .post("/api/customer_change_password/"+customer_id+"/",formData)
      .then(function (res) {
        console.log(res);
        if(res.status==200){
          setConfirm(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };


  console.log(passwordData)

  return (
    <>
      <h1>
        <a href="/" className="home_btn">
          Home
        </a>
      </h1>
      <div className="main_cng_password_container">
        <div className="cng_password_container">
          <h1 className="c_title">Seller / Change Password</h1>
          <br />
          {confirmError && 
          <p style={{color:'red',textAlign:'center'}}><u style={{color:"white"}}>Note</u>&nbsp;:&nbsp;Both password must be same</p>
          }
          {
            confirm && 
            <p style={{color:'#00ff1a',textAlign:'center'}}><b>Password has been changed</b></p>
          }
          <br />
          <label for="pwd">Password&nbsp;&nbsp;:</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="enter password:"
            onChange={inputHandler}
            value={passwordData.password}
            id="password"
            className="password"
          />
          <br />
          <label for="pwd">Re-enter Password&nbsp;&nbsp;:</label>
          <br />
          <input
            type="password"
            name="c_password"
            onChange={inputHandler}
            value={passwordData.c_password}
            placeholder="enter password:"
            id="c_password"
            className="c_password"
          />
          <br />
          <button className="c_submit_btn" type="button" onClick={handleSubmit}>Submit</button> 
        </div>
      </div>
    </>
  );
};

export default ChangePassword;