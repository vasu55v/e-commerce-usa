import React,{useEffect, useState} from 'react'
import '../styles/sellerproduct.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const SellerProduct = () => {
    
    const [SellerProduct,SetSellerProducts]=useState([]);
    const vendor_id=localStorage.getItem('vendor_id');
 
    const navigate =useNavigate();

    // useEffect(()=>{
    //     const fetchData=async()=>{        
    //     try{
    //         const res= await api.get('/api/product/');
    //         const data=res.data.results;
    //         SetSellerProducts(data)
    //         console.log(res.data.results);
    //     } 
    //     catch(error){
    //       console.log(error)
    //   } 
    //   }
    //     fetchData();
    //    },[]);

       
    useEffect(()=>{
          api.get("api/vendor/"+vendor_id+"/product/")
          .then((res)=>{
            console.log("res:",res.data.results)
            SetSellerProducts(res.data.results)
          })
          .catch((error)=>{
              console.log(error)
          })
     },[]);

     const product=(id)=>{
        navigate(`/vendorProduct/${id}/`)
     }

    const DeleteProduct=(id)=>{
    api
      .delete('/api/product/'+id+'/')
      .then(function (res) {
        console.log(res);
        if (res.data.bool==false) {
        //   seterrorMsg(res.data.msg);
        console.log(res.data.msg);
        //   setsuccessMsg('');
        }
        else {
            console.log(res.data.msg);
            //   seterrorMsg('');
        //   setsuccessMsg(res.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }

    // useEffect(()=>{

   
    //  },[]);

  return (
    <div>
        <h1 className='s_home_btn'><a href="/">Home</a></h1>
        <div><button className='add_product_btn'><FontAwesomeIcon icon={faPlusCircle} /> <a href="/addproduct">Add Product</a></button></div>
        <div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    SellerProduct.map((item,index)=><tr>
                      <td>{index+1}</td>
                      <td >{item.title}
                      <img src={item.image} style={{float:'right'}} height={60} width={60}/>
                      </td>
                      <td>${item.price}</td>
                      <td>
                          <button onClick={()=>product(item.id)}>Edit</button>
                          <button className='delete_button'  onClick={()=>DeleteProduct(item.id)}>Delete</button>
                      </td>
                    </tr>
                   
                    )
                }
                 </tbody>
                   
                
            </table>
        </div>
    </div>
  )
}

export default SellerProduct