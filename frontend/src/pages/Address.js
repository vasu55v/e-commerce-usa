import React, { useEffect, useState } from "react";
import "../styles/address.css";
import api from "../api";

const Address = () => {
  const customer_id = localStorage.getItem("customer_id");

  const [errorMsg, setErrorMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [address,setAddress]=useState();

  const [AddressFormData, setAddressFormData] = useState({
    address: "",
    customer: customer_id,
  });

  const inputHandler = (e) => {
    setAddressFormData({
      ...AddressFormData,
      [e.target.name]: e.target.value,
    });
  };

  const getAddress=()=>{
    api.get("/api/customer/"+customer_id+"/address/")
    .then(function (res) {
      var data=res.data.results
      setAddress(data.slice(-1)[0].address);
      console.log(data.slice(-1)[0].address);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(()=>{
    getAddress();
  },[])

  const submitHandler = () => {
    const formUserData = new FormData();
    formUserData.append("address", AddressFormData.address);
    formUserData.append("customer", AddressFormData.customer);

    api
      .post("/api/address/", formUserData)
      .then(function (res) {
        if (res.status != 201) {
          setErrorMsg("data not saved...!");
          setSuccessMsg("");
        } else {
          setSuccessMsg("data saved successfully.");
          setErrorMsg("");
          setAddressFormData({
            address: "",
          });
        }
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  console.log(AddressFormData);

  const disableBtn = AddressFormData.address == "";

  return (
    <div>
      <h1>
        <a href="/" className="home_btn_address">
          Home
        </a>
      </h1>
      <div className="address_div">
        <div className="inner_address_div">
          <h5>
            <u>Address :</u>
          </h5>
          {/* <h4>st-3,st.jose church,new side , near library ,Usa-703521</h4> */}
          <h4>{address}</h4>
        </div>
        <h1>Address</h1>
        {
        errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>
        }
        {
          successMsg && <p style={{ color: "#48ff05" }}>{successMsg}</p>
        }
        <label for="address">Address:</label>
        <br />
        <textarea
          placeholder="enter new / change address:"
          onChange={inputHandler}
          value={AddressFormData.address}
          name="address"
          id="address"
          className="address"
        />
        <br />
        <button
          className="address_submit_btn"
          type="button"
          disabled={disableBtn}
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Address;
