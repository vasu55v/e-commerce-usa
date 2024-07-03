import React, { useContext, useState } from "react";
import { UserContext } from "../Context";
import { CartContext } from "../Context";
import { FontAwesomeIcon   } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import { faPaypal,faCcStripe,faGooglePay } from '@fortawesome/free-brands-svg-icons';
import "../styles/confirmorder.css";
import api from "../api.js";

const ConfirmOrder = () => {
  const [ConfirmOrder, setConfirmOrder] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [PayMethod,setPayMethod] = useState('');

  const userContext = useContext(UserContext);
  const { cartData, setCartData } = useContext(CartContext);

  console.log(userContext);

  if (!useContext) {
    window.location.href = "/login";
  } else {
    if (ConfirmOrder == false) {
      addOrderInTable();
    }
  }

  function addOrderInTable() {
    const customerId = localStorage.getItem("customer_id");
    const formData = new FormData();
    formData.append("customer", customerId);

    api
      .post("/api/order/", formData)
      .then(function (response) {
        console.log(response.data.id);
        var orderId = response.data.id;
        setOrderId(orderId);
        console.log(response.data.id);
        orderItems(orderId);
        setConfirmOrder(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function orderItems(orderId) {
    var previousCart = localStorage.getItem("cartData");
    var cartJson = JSON.parse(previousCart);

    console.log(cartJson);

    if (cartJson != null) {
      cartJson.map((cart, index) => {
        const formData = new FormData();

        formData.append("order", orderId);
        formData.append("product", cart.product.id);
        formData.append("qty", 1);
        formData.append("price", cart.product.price);

        api
          .post("/api/orderItem/", formData)
          .then(function (response) {
            cartJson.splice(index, 1);
            localStorage.setItem("cartData", JSON.stringify(cartJson));
            setCartData(cartJson);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  }

  function changePaymentMethod(PayMethod){
    setPayMethod(PayMethod)
  }

  function PayNowButton(){
    if(PayMethod!=''){
        changePaymentMethod(PayMethod)
    }
    else{
        alert('Select Payment Method!!');
    }
  }

  return (
    <div>
      <h1 className="text">
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{ color: "rgb(3, 255, 3)" }}
        />
        Your order is confirmed...
      </h1>
      <h4 className="order_id">Order Id : {orderId}</h4>
      <div className="payment_option_checkbox_container">
        <label>
          <input
            className="payment_option"
            type="radio"
            onChange={() => changePaymentMethod("paypal")}
            name="payMethod"
          />
          PayPal&nbsp;<FontAwesomeIcon icon={faPaypal}  style={{color:'blue'}}/>
        </label>
        <br />
        <label>
          <input
            className="payment_option"
            type="radio"
            onChange={() => changePaymentMethod("razorpay")}
            name="payMethod"
          />
          RazorPay
        </label>
        <br />
        <label>
          <input
            className="payment_option"
            type="radio"
            onChange={() => changePaymentMethod("stripe")}
            name="payMethod"
          />
          Stripe&nbsp;<FontAwesomeIcon icon={faCcStripe}  style={{color:'purple'}}/>
        </label>
        <br />
        <label>
          <input
            className="payment_option"
            type="radio"
            onChange={() => changePaymentMethod("googlePay")}
            name="payMethod"
          />
          Google Pay&nbsp;<FontAwesomeIcon icon={faGooglePay} style={{color:'#fff',fontSize:'30px'}} />
        </label>
      </div>
      <button className="btn_nxt" onClick={PayNowButton}>
        Next
      </button>
    </div>
  );
};

export default ConfirmOrder;
