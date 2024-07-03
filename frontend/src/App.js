// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import Home from './pages/Home';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
// import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
// import Register from './pages/Register';
import ProductCart from './components/ProductCart';
import ProtectedRoute from './components/ProtectedRoute';
import Product from './pages/Product';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import CustomerLogout from './components/CustomerLogout';
import Dashboard from './pages/Dashboard';
import Address from './pages/Address';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import SellerPanel from './seller/SellerPanel';
import SellerLogin from './seller/SellerLogin';
import SellerRegister from './seller/SellerRegister';
import AddProduct from './seller/AddProduct';
import SellerProduct from './seller/SellerProduct';
import SellerOrders from './seller/SellerOrders';
import Customers from './seller/Customers';
import SellerChangePassword from './seller/SellerChangePassword';
import SellerProfile from './seller/SellerProfile';
import ConfirmOrder from './pages/ConfirmOrder';
import SellerLogout from './seller/SellerLogout';
import VendorProductUpdate from './seller/VendorProductUpdate';

import { CartContext } from './Context';
import { useState } from 'react';

const checkCart=localStorage.getItem('cartData')

function App() {

const [cartData,setCartData]=useState(JSON.parse(checkCart));

  function Logout(){
    localStorage.clear();
    <Navigate to='/login/' />
  }

  function RegisterAndLogout(){
    localStorage.clear();
    return <Register />
  }

  return (
    <div>
  <CartContext.Provider value={{cartData,setCartData}}>
   <BrowserRouter>
      <Routes>
        
        <Route path="/"
        
        element={
        // <ProtectedRoute>
          <Home />
        // </ProtectedRoute>
        } />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/product" element={<ProductCart />} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/register" element={<RegisterAndLogout />} /> */}
        <Route path="/product/:id" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/address" element={<Address />}/> 
        <Route path="/profile" element={<Profile />}/>  
        <Route path="/changepassword" element={<ChangePassword />}/>  
        <Route path="/customerlogout" element={<CustomerLogout />}/>  
        <Route path="/confirm_order" element={<ConfirmOrder />}/>  




     {/* seller */}
     <Route path="/sellerpanel" element={<SellerPanel />}/>  
     <Route path="/sellerlogin" element={<SellerLogin />} />
     <Route path="/sellerlogout" element={<SellerLogout />} />
     <Route path="/sellerregister" element={<SellerRegister />} />
     <Route path="/addproduct" element={<AddProduct />} />
     <Route path="/vendorProduct/:Product_id" element={<VendorProductUpdate />} />
     <Route path="/sellerproduct" element={<SellerProduct />} />
     <Route path="/sellerorders" element={<SellerOrders />} />
     <Route path="/customers" element={<Customers />} />
     <Route path="/sellerprofile" element={<SellerProfile />} />
     <Route path="/sellerchangepassword" element={<SellerChangePassword />} />

      </Routes>
      </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}

export default App;

