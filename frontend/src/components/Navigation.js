import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/navigation.css";
import Header from "./Header";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext ,CartContext} from "../Context";

const Navigation = () => {
  const userContext = useContext(UserContext);
  console.log(userContext);
  const {cartData,setCartData}=useContext(CartContext);

  const navigate = useNavigate();
  const redirect=()=>{
     navigate('/checkout')
  }



  const open = () => {
    document.getElementById("header_container").style.zIndex = "-1";
    document.getElementById("main_nav_container").style.display = "block";
    document.getElementById("main_nav_container").style.width = "500px";
    document.getElementById("bar_icon").style.display = "none";
    document.getElementById("cart_item_number2").style.display = "none";
  };

  const close = () => {
    document.getElementById("main_nav_container").style.display = "none";
    document.getElementById("bar_icon").style.display = "block";
    document.getElementById("header_container").style.zIndex = "10";
    document.getElementById("cart_item_number2").style.display = "block";
  };

  return (
    <div className="container">
      <h1 className="logo" id="logo">
        <a href="">Shop.me</a>
      </h1>
      <div className="main_nav_container" id="main_nav_container">
        <span className="close_btn" onClick={close} title="Close">
          X
        </span>
        <nav className="nav_div">
          <ul className="ul_list">
            {userContext != true && (
              <>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/product">Products</a>
                </li>
                <li>
                  <a href="">
                    Cart <span className="cart_item_number">{cartData?cartData.length:0}</span>
                  </a>
                </li>
                <li>
                  <a href="/checkout">
                    <u>Checkout</u>
                  </a>
                </li>
                <li>
                  <a href="/dashboard">
                    <u>Dashboard</u>
                  </a>
                </li>
                <li>
                  <a href="/sellerpanel">
                    <u>Seller Panel </u>
                  </a>
                </li>
                
              </>
            )}
            {userContext == true && (
              <>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/register">Register</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <span className="open-nva-icon">
        <FontAwesomeIcon icon={faUser} className="user_profile" />
          <span>
            <FontAwesomeIcon
              icon={faCartShopping}
              className="shopping_cart"
              title="cart"
              onClick={redirect}
            />
            <span className="cart_item_number2"  id="cart_item_number2">
              {cartData?cartData.length:0}
            </span>
          </span>
        
       
        <FontAwesomeIcon
          icon={faBars}
          className="bar_icon"
          id="bar_icon"
          onClick={open}
          style={{ fontSize: "35px" }}
        />
      </span>
    </div>
  );
};

export default Navigation;
