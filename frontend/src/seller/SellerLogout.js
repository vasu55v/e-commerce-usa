import React from 'react'

const SellerLogout = () => {
    localStorage.removeItem('vendor_login');
    localStorage.removeItem('vendor_username');
    localStorage.removeItem('vendor_id');
    localStorage.removeItem('vendor_id');
    localStorage.removeItem('vendor_id');

    window.location.href='/sellerlogin';
}

export default SellerLogout;