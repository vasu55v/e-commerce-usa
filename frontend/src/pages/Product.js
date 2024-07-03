// import React, { useEffect, useState } from 'react'
// import api from '../api';
// import { useParams } from 'react-router-dom';
// import '../styles/product.css';

// const Product = () => {
//   const [products, setProducts] = useState({});
//   const [CartButtonClickStatus, setCartButtonClickStatus] = useState(false);
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await api.get(`/api/product/${id}/`);
//         setProducts(res.data);
//         console.log(res.data);
//         checkProductInCart(`${id}`);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, [id]);

//   // function checkProductInCart(product_id) {
//   //   var previousCart = localStorage.getItem('cartData');
//   //   var cartJson = JSON.parse(previousCart);
//   //   if (cartJson != null) {
//   //     cartJson.map((cart) => {
//   //       if (cart != null && cart.product.id == product_id) {
//   //         setCartButtonClickStatus(true);
//   //       }
//   //     });
//   //   }
//   // }

//   function checkProductInCart(product_id) {
//     const previousCart = localStorage.getItem('cartData');
//     const cartJson = JSON.parse(previousCart);
//     if (cartJson !== null) {
//       cartJson.forEach((cart) => {
//         if (cart !== null && cart.product !== undefined && cart.product.id === product_id) {
//           setCartButtonClickStatus(true);
//         }
//       });
//     }
//   }

//     const cartAddHandler = () => {
//        var previousCart=localStorage.getItem('cartData');
//        var cartJson=JSON.parse(previousCart);
//         const cartData=[
//           {
//           'product':{
//             'id':products.id,
//             'title':products.title,
//           },
//           'user':{
//             'id':1,
//           }
//         }
//         ];
//       if(cartJson!=null){
//         cartJson.push(cartData);
//         var cartString=JSON.stringify(cartJson);
//         localStorage.setItem('cartData',cartString);
//         // setCartButtonClickStatus(true);

//       }
//       else{
//         var newCartList=[];
//         newCartList.push(cartData);
//         var cartString=JSON.stringify(newCartList);
//         localStorage.setItem('cartData',cartString);
//         // setCartButtonClickStatus(true);

//       }
//       setCartButtonClickStatus(true);
//     };

//     const cartRemoveHandler = () => {
//       var previousCart=localStorage.removeItem('cartData');
//         if (/*previousCart !== null &&*/ previousCart !== undefined) {
//       var cartJson=JSON.parse(previousCart);
//       cartJson.map((cart,index)=>{
//         if(cart!=null && cart.product.id == products.id){
//              delete cartJson[index];
//         }
//       });
//       var cartString=JSON.stringify(cartJson);
//       localStorage.setItem('cartData',cartString);
//     }
//     setCartButtonClickStatus(false);
//     };

//   return (
//     <div>

//       <div className='product_head'>
//       <h1>Product</h1>
//       <h4><a href="/product">All Product</a></h4>
//       </div>
//         <div className='product-container'>
//           <ul key={products.id} className="product_card">
//             <li><img src={products.image} alt={products.name} className="product_image" /></li>
//             <li><u><b>{products.title}</b></u></li>
//             <li>${products.price}</li>
//             <li>{products.detail}</li>
//             {!CartButtonClickStatus &&
//             <button className="detail_btn" type="button" onClick={cartAddHandler} style={{backgroundColor:'green'}}>Add to cart</button>

//             }
//              {CartButtonClickStatus &&
//             <button className="detail_btn" onClick={cartRemoveHandler} style={{backgroundColor:'red'}} >Remove from cart</button>
//             }

//             <button className="detail_btn">Buy now</button>
//           </ul>
//         </div>

//     </div>
//   )
// }

// export default Product

import React, { useEffect, useState } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import "../styles/product.css";

const Product = () => {
  const [products, setProducts] = useState({});
  const [CartButtonClickStatus, setCartButtonClickStatus] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/product/${id}/`);
        setProducts(res.data);
        console.log(res.data);
        checkProductInCart(`${res.data.id}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const checkProductInCart = () => {
      const previousCart = localStorage.getItem("cartData");
      const cartJson = JSON.parse(previousCart);
      if (cartJson !== null && products.id) {
        const isProductInCart = cartJson.some((cart) => {
          return (
            cart !== null &&
            cart.product !== undefined &&
            cart.product.id === products.id
          );
        });
        setCartButtonClickStatus(isProductInCart);
      }
    };

    checkProductInCart();
  }, [products]);

  const cartAddHandler = () => {
    const previousCart = localStorage.getItem("cartData");
    const cartJson = JSON.parse(previousCart);
    const cartData = [
      {
        product: {
          id: products.id,
          title: products.title,
          price:products.price,
          image:products.image,
        },
        user: {
          id: 1,
        },
      },
    ];
    if (cartJson !== null) {
      cartJson.push(cartData[0]);
      const cartString = JSON.stringify(cartJson);
      localStorage.setItem("cartData", cartString);
    } else {
      const newCartList = cartData;
      const cartString = JSON.stringify(newCartList);
      localStorage.setItem("cartData", cartString);
    }
    setCartButtonClickStatus(true);
  };

  const cartRemoveHandler = () => {
    const previousCart = localStorage.getItem("cartData");
    if (previousCart !== null && previousCart !== undefined) {
      const cartJson = JSON.parse(previousCart);
      const updatedCartJson = cartJson.filter((cart) => {
        //it only contain item from cart whose id does not match with that item that you want to remove (so that it only contain those item that you don't want to remove)so the item that you want to remove automatically remove and store it in local storage
        return (
          cart !== null &&
          cart.product !== undefined &&
          cart.product.id !== products.id
        );
      });
      const cartString = JSON.stringify(updatedCartJson);
      localStorage.setItem("cartData", cartString);
    }
    setCartButtonClickStatus(false);
  };

  return (
    <div>
      <div className="product_head">
        <h1>Product</h1>
        <h4>
          <a href="/product">All Product</a>
        </h4>
      </div>
      <div className="product-container">
        <ul key={products.id} className="product_card">
          <li>
            <img
              src={products.image}
              alt={products.name}
              className="product_image"
            />
          </li>
          <li>
            <u>
              <b>{products.title}</b>
            </u>
          </li>
          <li>${products.price}</li>
          <li>{products.detail}</li>
          {!CartButtonClickStatus && (
            <button
              className="detail_btn"
              type="button"
              onClick={cartAddHandler}
              style={{ backgroundColor: "green" }}
            >
              Add to cart
            </button>
          )}
          {CartButtonClickStatus && (
            <button
              className="detail_btn"
              onClick={cartRemoveHandler}
              style={{ backgroundColor: "red" }}
            >
              Remove from cart
            </button>
          )}
          {/* <button className="detail_btn">Buy now</button> */}
        </ul>
      </div>
    </div>
  );
};

export default Product;