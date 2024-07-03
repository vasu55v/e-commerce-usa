import React from 'react'

const CustomerLogout = () => {
    localStorage.removeItem('customer_login');
    localStorage.removeItem('customer_username');
    localStorage.removeItem('customer_id');
    window.location.href='/login';
}

export default CustomerLogout;