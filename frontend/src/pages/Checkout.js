import React,{useContext,useState} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Table from 'react-bootstrap/Table';
import '../styles/checkout.css'
import { CartContext} from "../Context";
import { Navigate,useNavigate } from 'react-router-dom';


const Checkout = () => {
  const [products, setProducts] = useState({});
  const [CartButtonClickStatus, setCartButtonClickStatus] = useState(false);

  const {cartData,setCartData}=useContext(CartContext);
  
  const navigate=useNavigate();

  const redirectToAllProducts=()=>{
    navigate('/product')
 }

 const confirmOrder=()=>{
  navigate('/confirm_order')

 }

  console.log(cartData)


  var sum=0;
  cartData.map((item,index)=>{
    sum+=parseFloat(item.product.price)
  })


  if(cartData==null||cartData.length==0){
    var cartItem=0;
  }
  else{
    var cartItem=cartData.length;
  }

  const cartRemoveHandler = (product_id) => {
    const previousCart = localStorage.getItem("cartData");
      const cartJson = JSON.parse(previousCart);
      cartJson.map((cart,index)=>{
          if(cart!=null && cart.product.id==product_id){
            cartJson.splice(index,1);
          }
      })
      const cartString = JSON.stringify(cartJson);
      localStorage.setItem("cartData", cartString);
      setCartButtonClickStatus(false);
      setCartData(cartJson);
  };

  return (
  <div className='table_container'>
    <div className='checkout_small_div'>
    <h1>All Items({cartItem})</h1>
    <h1 className='home_btn'><a href="/">Home</a></h1>
    </div>
    {
    cartItem.length!=0 &&
    <>
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
        {cartData.map((item,index)=>{
          return(
                <tr>
                <td>{index+1}</td>
                <td>
                  <img src={item.product.image} width={90} height={90}/>
                  <p className='product_name'><u>{item.product.title}</u></p>
                </td>
                <td className='product_price'>${item.product.price}</td>
                <td>
                    <button
                      className="remove_btn"
                      onClick={()=>cartRemoveHandler(item.product.id)}
                    >
                      Remove from cart
                    </button>
                </td>
              </tr>
          )
        })}
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>Total =</td>
          <td><b>${sum}</b></td>
        </tr>
      </tfoot>
    </table>
    <button className='btn1' onClick={redirectToAllProducts}>Continue Shopping</button>
    <button className='btn2'  onClick={confirmOrder}>Proceed to payment</button>
    </>
    }
    {
    cartData.length==0 && 
         <h4 className='h4_nothing_in_the_cart'> Nothing in the cart !</h4>
      
    }
    

  </div>
  
  )
}

export default Checkout;