import React, { useEffect, useState } from 'react'
import '../styles/sellerorders.css'
import api from '../api.js'

const SellerOrders = () => {

  const [VendorOrderItems,setVendorOrderItems]=useState([])
  const vendorId=localStorage.getItem('vendor_id');;

  const fetchData=()=>{
    api.get('api/vendor/'+vendorId+'/orderItem/')
    .then((response)=>{
     setVendorOrderItems(response.data.results)
     console.log("response : ",response.data.results)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

const changeOrderStatus=(order_id,status)=>{
  api.patch('api/order_update/'+order_id+'/',{
       order_status:status,
  })
  .then((response)=>{
   console.log(response)
   fetchData();
  })
  .catch((error)=>{
    console.log(error)
  })
}
  
  useEffect(()=>{
    changeOrderStatus();
    fetchData();
 },[]);

  return (
    <div className='s_table_container'>
    <div className='s_order_small_div'>
    <h1>All Items</h1>
    <h1 className='s_home_btn'><a href="/">Home</a></h1>
    </div>
    <table border={1}>
      <thead>
        <tr>
          <th>#</th>
          <th>Product</th>
          <th>Price</th>
          <th>status</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
     
        {VendorOrderItems.map((item,index)=>{
            return <tr>
            <td>{index+1}</td>
            <td>
              <img src={item.product.image} />
              <p className='s_product_name'><u>{item.product.title}</u></p>
            </td>
            <td className='s_product_price'>${item.price}</td>
            <td>{item.order.order_status===false?"Cancel":"Completed"}</td>
            <td>
            {item.order.order_status===false?
              <button className='s_btn' onClick={()=>changeOrderStatus(item.order.id,true)}>Completed</button>
              :
              <button className='s_btn' onClick={()=>changeOrderStatus(item.order.id,false)}>Pending</button>
            }
            </td>
            </tr>
        })}      
      </tbody>
    
    </table>
  </div>
  )
}

export default SellerOrders