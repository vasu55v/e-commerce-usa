// import React from 'react'
// import '../styles/profile.css'

// const SellerProfile = () => {
//   return (
//     <>
//      <h1><a href="/" className='home_btn'>Home</a></h1>
//     <div className='main_profile_component'>
//        <div className='profile_component'>
//       <h1>Profile</h1>
//       <label for="f_name">First name:</label>
//       <br />
//       <input type="text" placeholder='enter your first name:' id='f_name' className='f_name'/>
//       <br />
//       <label for="l_name">Last name:</label>
//       <br />
//       <input type="text" placeholder='enter your last name:' id='l_name' className='l_name'/>
//       <br />
//       <label for="username">Username:</label>
//       <br />
//       <input type="text" placeholder='enter your first name:' id='username' className='username'/>
//       <br />
//       <label for="email">Email:</label>
//       <br />
//       <input type="email" placeholder='enter your email:' id='email' className='email'/>
//       <br />
//       <label for="img">Image:</label>
//       <br />
//       <input type="file" id="img" className='img'/>
//     <br />
//     <button className='submit_btn'>Submit</button>
//     </div> 
//     </div>
//     </>
   
//   )
// }

// export default SellerProfile

import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import axios from "axios";
import api from "../api";

const SellerProfile = () => {
  const [ProfileData, setProfileData] = useState({
    user_id:'',
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    address: "",
    mobile: "",
    profile_img:'',
  });

  const vendor_id = localStorage.getItem("vendor_id");

  useEffect(() => {
    // fetchData(api+'/api/customer/'+customer_id)
    api.get("/api/vendor/" + vendor_id + "/").then((response) => {
      // response.json()
      console.log(response);
      setProfileData({
        user_id:response.data.user.id,
        first_name: response.data.user.first_name,
        last_name: response.data.user.last_name,
        username: response.data.user.username,
        email: response.data.user.email,
        address: response.data.address,
        mobile: response.data.mobile,
        profile_img: response.data.profile_img,
      });
    });
  }, []);

  console.log(ProfileData);

  //   function fetchData(url){
  //   fetch(url)
  //   .then((response)=>{
  //     response.json()
  //   })
  //   .then((data)=>{
  //     setProfileData(data)
  //   })
  // }

  const inputHandler = (e) => {
    setProfileData({
      ...ProfileData,
      [e.target.name]: e.target.value,
    });
  };

  const fileChangeHandler = (e) => {
    setProfileData({
      ...ProfileData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData();
    formData.append("user",ProfileData.user_id);
    formData.append("mobile", ProfileData.mobile);
    formData.append("address", ProfileData.address);
    formData.append("profile_img", ProfileData.profile_img);

    // for (const [key, value] of formData.entries()) {
    //   set_f_response(`${key}: ${value}`);
    // }

    
    api
      .put("/api/vendor/"+vendor_id+"/",formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });


    const formUserData = new FormData();
    formUserData.append("first_name", ProfileData.first_name);
    formUserData.append("last_name", ProfileData.last_name);
    formUserData.append("username", ProfileData.username);
    formUserData.append("email", ProfileData.email);

    api
      .put("/api/user/"+ProfileData.user_id+"/", formUserData)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
    };


return (
    <>
      <h1>
        <a href="/" className="home_btn">
          Home
        </a>
      </h1>
      <form>
      <div className="main_profile_component">
        <div className="profile_component">
          <h1>Profile </h1>
          <hr />
          <h1>Welcome {ProfileData.username}</h1>
          <hr />
          <label for="f_name">First name:</label>
          <br />
          <input
            type="text"
            name="first_name"
            onChange={inputHandler}
            value={ProfileData.first_name}
            placeholder="enter your first name:"
            id="f_name"
            className="f_name"
          />
          <br />
          <label for="l_name">Last name:</label>
          <br />
          <input
            type="text"
            name="last_name"
            onChange={inputHandler}
            value={ProfileData.last_name}
            placeholder="enter your last name:"
            id="l_name"
            className="l_name"
          />
          <br />
          <label for="username">Username:</label>
          <br />
          <input
            type="text"
            name="username"
            onChange={inputHandler}
            value={ProfileData.username}
            placeholder="enter your first name:"
            id="username"
            className="username"
          />
          <br />
          <label for="email">Email:</label>
          <br />
          <input
            type="email"
            name="email"
            onChange={inputHandler}
            value={ProfileData.email}
            placeholder="enter your email:"
            id="email"
            className="email"
          />
          <br />
          <label for="mobile">Mobile:</label>
          <br />
          <input
            type="number"
            name="mobile"
            onChange={inputHandler}
            value={ProfileData.mobile}
            placeholder="enter your mobile:"
            id="mobile"
            className="mobile"
          />
          <br />
          <label for="img">Address: </label>
          <br />
          <textarea
            name="address"
            onChange={inputHandler}
            value={ProfileData.address}
            placeholder="enter your address:"
            id="address"
            className="address"
          ></textarea>
          <br />
          <label for="img">Image: </label>
          <br />
          <input
            type="file"
            name="profile_img"
            onChange={fileChangeHandler}
            id="img"
            className="img"
          />
          <br />
          <p id="profile_img" style={{ marginLeft: "50px" }}>
            <img src={ProfileData.profile_img} height={100} width={100} />
          </p>
          <label for="profile_img">Profile Image: </label>
          <br />
          <br />
          <button className="submit_btn" type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      </form>
    </>
  );
}

export default SellerProfile;
