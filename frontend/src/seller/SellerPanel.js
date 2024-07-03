import React, { useContext, useState } from 'react'
import '../styles/sellerpanel.css'
import api from '../api.js'

const SellerPanel = () => {


const checkVendor=localStorage.getItem('vendor_login');
const vendor_id=localStorage.getItem('vendor_id');

const [total_customer,setTotal_customer]=useState(0);
const [total_order,setTotal_order]=useState(0);
const [total_products,setTotal_products]=useState(0);


api.get('api/vendor/'+vendor_id+'/panel/')
.then((res)=>{
  console.log(res.data)
  setTotal_customer(res.data.total_customer)
  setTotal_order(res.data.total_order)
  setTotal_products(res.data.total_products)
})
.catch((err)=>{
  console.log(err)
})


  return (
    <div className='main_seller_container'>
    <h1 className='home_seller'><a href="/">Home</a></h1>
      <div className='seller_container'>
        <ul className='seller_list'>
        {
           checkVendor &&
            <ul className='seller_list'> 
            <li><a href="/sellerpanel">sellerpanel</a></li>
            <hr />
            <li><a href="/sellerproduct">Product</a></li>
            <hr />
            <li><a href="/addproduct">Add Product</a></li>
            <hr />
            <li><a href="/sellerorders">Order</a></li>
            <hr />
            <li><a href="/customers">Customer</a></li>
            <hr />
            <li><a href="/sellerchangepassword">Change Password</a></li>
            <hr />
            <li><a href="/sellerprofile">Profile</a></li>
            <hr />
            <li><a href="sellerlogout">Logout</a></li>
            </ul>
        }
            {
            !checkVendor && 
            <ul className='seller_list'>
            <li><a href="/sellerlogin">Login</a></li>
            <hr />
            <li><a href="/sellerregister">Register</a></li>
            <hr />
            </ul>
           }
        </ul>
    </div>

    <div className='total_product_box'>
        <h4>Total Product</h4>
        <h3>{total_products}</h3>
    </div>
    <div className='order_box'>
        <h4>Total Order</h4>
        <h3>{total_order}</h3>

    </div>
    <div className='total_customer'>
        <h4>Total Customer</h4>
        <h3>{total_customer}</h3>
    </div>
    </div>
  )
}

export default SellerPanel