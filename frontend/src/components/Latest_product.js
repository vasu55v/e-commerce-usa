import '../styles/latest_product.css';
import { useNavigate  } from "react-router-dom";
import api from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUp} from '@fortawesome/free-brands-svg-icons';

import React,{useEffect,useState} from 'react';

const Latest_product = () => {
    const[HomeProducts,SetHomeProducts]=useState({});
    const navigate = useNavigate();
  
    useEffect(()=>{
        const fetchData=async()=>{
         
        try{

            const res= await api.get('/api/product/');
            const data=res.data.results.slice(-4);
            SetHomeProducts(data)
            console.log(res.data.results.slice(-4));
        } 
        catch(error){
          console.log(error)
      } 
      }
       
    
        fetchData();
       },[]);

       const prod=(id)=>{
        navigate(`/product/${id}/`);
      }
      

  return (
    <div className='con'>
    <div className="latest_product">
        {Array.isArray(HomeProducts) && HomeProducts.length > 0 ? (
        HomeProducts.map((i) => (       
          <ul key={i.id} className="latest_product_cart">
             
            <li><img src={i.image} alt={i.name} className="latest_product_img" /></li>
            <li><u><b>{i.title}</b></u></li>
            <li>${i.price}</li>
            <button className="latest_view_btn" onClick={()=>prod(i.id)}>buy now / know more</button>
            {/* <button title="add to cart" className="latest_add_to_cart_btn" >Add to cart</button> */}
          </ul>
          
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
    <h2><span>&uarr;</span> <u>Latest Product</u></h2>
    
    <hr />
    <br />
      
    </div>
  )
}

export default Latest_product