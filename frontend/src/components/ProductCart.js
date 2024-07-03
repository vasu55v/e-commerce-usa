// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import api from '../api';
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
// import '../styles/productcart.css';
// import { useNavigate  } from "react-router-dom";
// import Product from '../pages/Product';



// const ProductCart = () => {
//   const[products,setProducts]=useState({});



//   const navigate = useNavigate();

  
//     useEffect(()=>{
//       const fetchData=async()=>{
//       try{
//           const res= await api.get('/api/product/');
//           setProducts(res.data.results)
//           console.log(res.data.results)
//       } 
//       catch(error){
//         console.log(error)
//     } 
//     }
     

//       fetchData();
//      },[]);

//     const prod=(id)=>{
//       navigate(`/product/${id}/`);
//     }
    

//   return (
//     <div>  
//       <div className='product_header'>
//       <h1>Products</h1>
//       <h4><a href="/">Home</a></h4>
//       </div> 
      
//         <div  className='prod_container'>
          
//         {Array.isArray(products) && products.length > 0 ? (
//         products.map((i) => (
//           <ul key={i.id} className="product_cart">
//             <li><img src={i.image} alt={i.name} className="product_img" /></li>
//             <li><u><b>{i.title}</b></u></li>
//             <li>${i.price}</li>
//             <button className="view_btn" onClick={()=>prod(i.id)}>detail</button>
//             <button title="add to cart" className="add_to_cart_btn" >Add to cart</button>
//           </ul>
//         ))
//       ) : (
//         <p>Loading...</p>
//       )}
//         </div>

//         <ul className='ul_for_pagination'>
//            {links}
//           </ul>
//     </div>
//   );
// };
 


// export default ProductCart;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import api from '../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import '../styles/productcart.css';
import { useNavigate, Link } from "react-router-dom";
import Product from '../pages/Product';
import loading from '../loading.gif'


const ProductCart = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(4); // Assuming a page size of 4
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/product/?page=${currentPage}`);
        setProducts(res.data.results);
        console.log(res.data.results)
        setTotalCount(res.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentPage]);

  


  const totalPages = Math.ceil(totalCount / pageSize);


  const prod = (id) => {
    navigate(`/product/${id}/`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationLinks = () => {
    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <li key={i}>
          <Link
            to=""
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Link>
        </li>
      );
    }
    return links;
  };

  return (
    <div>
      <div className='product_header'>
        <h1>Products</h1>
        <h4><a href="/">Home</a></h4>
      </div>
      <div className='prod_container'>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((i) => (
            <ul key={i.id} className="product_cart">
              <li><img src={i.image} alt={i.name} className="product_img" /></li>
              <li><u><b>{i.title}</b></u></li>
              <li>${i.price}</li>
              <button className="view_btn" onClick={() => prod(i.id)}>Buy now</button>
              <button title="add to cart" className="add_to_cart_btn">Add to cart</button>
            </ul>
          ))
        ) : (
          <img src={loading} height={50} width={50} />
        )}
      </div>
      <ul className='ul_for_pagination'>
        {renderPaginationLinks()}
      </ul>
    </div>
  );
};

export default ProductCart;