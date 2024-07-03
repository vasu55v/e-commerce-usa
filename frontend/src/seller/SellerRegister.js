// import Form from "../components/Form.js";

// function Register(){
//     return <Form route="/api/user/register/" method="register" />
// }

// export default Register;

// import React from 'react'

// const Register = () => {
//   return  <Form route="/api/user/register/" method="register" />
// }

// export default Register

import React,{useState} from "react";
import "../styles/register.css";
import api from "../api.js";

const SellerRegister = () => {
  // const [formError, setFormError] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");


  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    mobile:"",
    address:"",
    password: "",
  });

  const inputHandler = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    // e.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData();
    formData.append("first_name", registerFormData.first_name);
    formData.append("last_name", registerFormData.last_name);
    formData.append("username", registerFormData.username);
    formData.append("email", registerFormData.email);
    formData.append("mobile", registerFormData.mobile);
    formData.append("address", registerFormData.address);
    formData.append("password", registerFormData.password);

    // for (const [key, value] of formData.entries()) {
    //   set_f_response(`${key}: ${value}`);
    // }

    api
      .post("/api/vendor/register/", formData)
      .then(function (res) {
        console.log(res);
        if (res.data.bool==false) {
          // setFormError(true);
          seterrorMsg(res.data.msg);
          setsuccessMsg('');
        }
        else {
          setRegisterFormData({
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            mobile:"",
            address:"",
            password: "",
          });
          console.log(res.data);
          // setFormError(false);
          seterrorMsg('');
          setsuccessMsg(res.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const buttonEnabled =(
    registerFormData.first_name != "" &&
    registerFormData.last_name != "" &&
    registerFormData.username != "" &&
    registerFormData.email != "" &&
    registerFormData.mobile != ""&&
    registerFormData.address != ""&&
    registerFormData.password != "")
   



  return (
    <>
      <h1>
        <a href="/" className="home_btn">
          Home
        </a>
      </h1>
      <div className="main_register_component">
        <div className="register_component">
          <h1>Register</h1>
          {!buttonEnabled && <p className="note_text"><strong>Note:</strong>All field are required</p>}
          {successMsg && <p className="success_text">{successMsg}</p>}
          {errorMsg && <p className="error_text">{errorMsg}</p>}

          <br />
          <label for="f_name">First name&nbsp;&nbsp;:</label>
          <br />
          <input
            type="text"
            name="first_name"
            placeholder="enter your first name:"
            id="f_name"
            onChange={inputHandler}
            value={registerFormData.first_name}
            className="f_name"
          />
          <br />
          <label for="l_name">Last name&nbsp;&nbsp;:</label>
          <br />
          <input
            type="text"
            name="last_name"
            placeholder="enter your last name:"
            onChange={inputHandler}
            value={registerFormData.last_name}
            id="l_name"
            className="l_name"
          />
          <br />
          <label for="username">Username&nbsp;&nbsp;:</label>
          <br />
          <input
            type="text"
            name="username"
            placeholder="enter your first name:"
            onChange={inputHandler}
            value={registerFormData.username}
            id="username"
            className="username"
          />
          <br />
          <label for="email">Email&nbsp;&nbsp;:</label>
          <br />
          <input
            type="email"
            name="email"
            placeholder="enter your email:"
            onChange={inputHandler}
            value={registerFormData.email}
            id="email"
            className="email"
          />
          <br />
          <label for="pwd">Mobile&nbsp;&nbsp;:</label>
          <br />
          <input
            type="number"
            name="mobile"
            placeholder="enter your mobile number:"
            onChange={inputHandler}
            value={registerFormData.mobile}
            id="mobile"
            className="mobile"
          />
          <br />
          <label for="pwd">Address&nbsp;&nbsp;:</label>
          <br />
          <textarea
            name="address"
            placeholder="enter your address:"
            onChange={inputHandler}
            value={registerFormData.address}
            id="address"
            className="address"
          ></textarea>
          <br />
          <label for="pwd">Password&nbsp;&nbsp;:</label>
          <br />
          <input
            type="password"
            name="password"
            placeholder="enter password:"
            onChange={inputHandler}
            value={registerFormData.password}
            id="pwd"
            className="pwd"
          />
          <br />
          <button type="button"  disabled={!buttonEnabled} className="submit_btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default SellerRegister;
