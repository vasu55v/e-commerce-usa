import React, { useState } from "react";
import "../styles/changepassword.css";
import api from '../api'

const SellerChangePassword = () => {

  const vendor_id=localStorage.getItem('vendor_id')


  const [passwordData, setPasswordData] = useState({
    password: "",
    c_password: "",
  });

  const [confirmError,setConfirmError]=useState(false);

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
      .post("/api/vendor_change_password/"+vendor_id+"/",formData)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });


    // const formUserData = new FormData();
    // formUserData.append("first_name", ProfileData.first_name);
    // formUserData.append("last_name", ProfileData.last_name);
    // formUserData.append("username", ProfileData.username);
    // formUserData.append("email", ProfileData.email);

    // api
    //   .put("/api/user/"+ProfileData.user_id+"/", formUserData)
    //   .then(function (res) {
    //     console.log(res);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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

export default SellerChangePassword;