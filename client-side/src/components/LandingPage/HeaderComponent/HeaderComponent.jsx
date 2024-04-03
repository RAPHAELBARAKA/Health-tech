import React from "react";
import './HeaderComponent.css';
import { Link } from 'react-router-dom';



function HeaderComponent (){

    return(
           <div>

             
             <nav className="nav">
            <a className="home" href="/Home">Home</a>
            <a className="about" href="/About Us">About Us</a>
            <a className="services" href="/Services">Services</a>
            <a className="contactus" href="/Contact Us">Contact Us</a>
            <button className="loginbutton"><Link to="/login"  className="login" >Login</Link></button>
            <button className="sign"><Link to='/register' className="signup">Sign Up</Link></button>
             
            </nav>


           </div>

    )
};

export default HeaderComponent;