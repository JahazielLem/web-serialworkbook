import React, { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './components/CheckoutForm';

//STYLE
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './App.css';
require('dotenv').config();

const stripePromise = loadStripe(process.env.REACT_APP_CLIENT_KEY);

const Home = () => {
    
    return (
        <section className="Home App-background App-banner">
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
        </section>
    )
}

export default Home