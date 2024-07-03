import React from 'react'
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube,faGooglePay,faCcPaypal,faApplePay,faCcVisa} from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
  return (
    <div className='footer_container'>
       <div className='row'>
        <div className='col-3'>
            <u><h1>About us</h1></u>
            <p>
            At Shop.me, we've been a trusted name<br /> in the community for over 50 years. <br />Our experienced staff offers fair <br />valuations and competitive rates for <br />buying, selling, or pawning a wide range of items,<br /> from jewelry and electronics<br /> to musical instruments and collectibles.<br /> We prioritize transparency, security, and<br /> exceptional customer service.
            </p>
        </div>
        <div className='col-3'>
            <ul>
                <li><a href=""><u><h4>Social Media</h4></u></a></li>
                <li><a href=""><FontAwesomeIcon icon={faFacebook} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faTwitter} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faYoutube} /></a></li>
            </ul>
        </div>
        <div className='col-3'>
            <ul>
                <li><a href=""><u><h4>Payment</h4></u></a></li>
                <li><a href=""><FontAwesomeIcon icon={faGooglePay} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faCcPaypal} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faApplePay} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faCcVisa} /></a></li>
            </ul>
        </div>
        <div className='col-3'>
            <ul>
                <li><a href=""><u><h4>Let Us Help You</h4></u></a></li>
                <li><a href="">Privacy Policy </a></li>
                <li><a href="">Return Policy</a></li>
                <li><a href="">Terms and Conditions</a></li>
                <li><a href="">Contact</a></li>
            </ul>
        </div>
       </div>
       <br />
       <p className='copy_right_line'>Copyright © 2024 Shop.in | Developed by&nbsp;<b><u>V developers.</u></b></p>
    </div>
  )
}

export default Footer