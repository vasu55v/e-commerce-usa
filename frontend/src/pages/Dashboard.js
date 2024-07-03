import React ,{useContext} from 'react'
import { UserContext } from "../Context";
import '../styles/dashboard.css';
import Navigation from '../components/Navigation';

const Dashboard = () => {

  const userContext=useContext(UserContext);


  return (
    <div className='main_dashboard_container'>
    <h1 className='home_dashboard'><a href="/">Home</a></h1>
      <div className='dashboard_container'>
        <ul className='dashboard_list'>
            <li><a href="/dashboard">Dashboard</a></li>
            <hr />
            <li><a href="/profile">Profile</a></li>
            <hr />
            <li><a href="/checkout">Order</a></li>
            <hr />
            <li><a href="/address">Address</a></li>
            <hr />
            <li><a href="/changepassword">Change Password</a></li>
            <hr />
            {
            userContext && 
            <li><a href="/customerlogout">Logout</a></li>
            }
            
        </ul>
    </div>

    {/* <div className='total_order_box'>
        <h4>Total order</h4>
        <h3>100</h3>
    </div>
    <div className='address_box'>
        <h4>Address</h4>
        <h3>100</h3>
    </div> */}
    </div>
    
  )
}

export default Dashboard