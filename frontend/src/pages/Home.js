import Navigation from "../components/Navigation.js";
import Header from "../components/Header.js";
import ProductCart from '../components/ProductCart.js'
import React ,{useEffect,useState} from 'react'
import Latest_product from "../components/Latest_product.js";
import '../styles/home.css';
import Footer from "../components/Footer.js";


const Home= () => {
  
  return (
    <div className="con_home">  
        <div className="first">
        <Navigation />
        <Header />
        </div>
        <div className="second">
          <Latest_product />
        </div> 
        <Footer />
        
        
        
        
    </div>
  )
}
export default Home;