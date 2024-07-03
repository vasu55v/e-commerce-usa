import React, { useEffect, useState } from 'react'
import '../styles/customer.css'
import api from '../api.js'

const Customers = () => { 

  const vendor_id=localStorage.getItem('vendor_id');
  console.log(vendor_id)
  const [CustomerList,setCustomerList]=useState([]);

  const fetchCustomer=()=>{
    api.get('api/vendor/'+vendor_id+'/customer/')
    .then((response)=>{
       setCustomerList(response.data.results)
    })
    .then((error)=>{
       console.log(error)
    })
  }

//   useEffect(()=>{
//     api.get('api/order/')
//     .then((res)=>{
//        console.log(res.data.results)
//     })
//     .then((err)=>{
//        console.log(err)
//     })
//  },[])


  console.log(CustomerList)

  function ShowConfirm(customer_id){
    var _confirm=window.confirm("Are you sure you want to delete this order?");
    if(_confirm){
      api.delete('api/customer_order_delete/'+customer_id+'/')
      .then((response)=>{
        console.log(response)
      })
      .then((error)=>{
        console.log(error)
      })
    }
  }

  
  useEffect(()=>{
    fetchCustomer();
  },[]);


  return (
    <div>
        <h1><a href="/">Home</a></h1>
        <h1>Customers list</h1>
        <table border={1}>
            <thead>
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>email</th>
                    <th>contact</th>
                    <th>remove</th>
                </tr>
            </thead>
            <tbody>
                
                    {CustomerList.map((data,index)=>{
                        return<tr>
                        <td>{index+1}</td>
                        <td>{data.order.customer.user.username}</td>
                        <td>{data.order.customer.user.email}</td>
                        <td>{data.order.customer.mobile}</td>
                        <td><button onClick={()=> ShowConfirm(data.order.customer.id)}>Remove</button></td>
                        </tr>
                    })}
                
                
            </tbody>
        </table>
    </div>
  )
}

export default Customers