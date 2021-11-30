import React, { useState, useCallback, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { saveAs } from "file-saver";
import ReactPlayer from 'react-player';
import axios from 'axios';
//STYLE
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import './../App.css';




const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [customerName, setCustomerName] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [messageError, setMessageError] = useState(null);
    const [message, setMessage] = useState(null);
    const [paymentDone, setpaymentDone] = useState(false);

    const onSuccess = (payment) => {
        // Congratulations, the payment was successful!
        console.log("The payment was successful!", payment);
        setpaymentDone(true);
    };

    const onCancel = (data) => {
        // User pressed 'cancel' or closed the PayPal popup window
        console.log("The payment was cancelled!", data);
    };

    const onError = (err) => {
        // The main PayPal 's script can't be loaded
        console.log("Error!", err);
    };

    // Using sandbox for testing only
    let env = "sandbox";
    // Let's set our currency here
    let currency = "MXN";
    // Testing total amount
    let total = 4000.00;

    const client = {
        sandbox:
            process.env.REACT_APP_CLIENT_PAYPAL
    };


    const saveFile = () => {
        saveAs(
            "./../Serialworkbook.zip",
            "SerialWorkbook.zip"
        );
    };


    const handleFormSubmit = async ev => {
        ev.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                name: customerName,
                email: email
            },
        });
        setLoading(true);
        if (!error) {
            const { id } = paymentMethod;
            try {
                const { data } = await axios.post('http://localhost:3001/buy/checkout/', {
                    id,
                    amount: 'price_1JzTdjFPRmFD0isHDIeQnaXF',
                    receipt_email: email
                });
                if (data.status === 'succeeded') {
                    setMessage({ message: "Pago acreditado con exito" });
                    setpaymentDone(true);
                }
                if (data.status === 'requires_action') {
                    setMessageError({ message: "El pago requiere acciones adiciones, revisar la sección de ayuda", type: data.status })
                }
                else {
                    setMessageError({ message: data.message, type: data.status });
                }
            } catch (error) {
                setMessageError({ message: error.message, type: error.status });
                console.log("Error: ", error);
            }
        } else {
            setMessageError({ message: error.message, type: error.type });
        }
        setLoading(false);
    };
    const cardOptions = {
        hidePostalCode: true
    }

    return paymentDone ? (
        <section className="Success">
            <div className="App-background App-banner">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-12 text-center p-4">
                            <h1 className="display-2 fw-bold">Gracias por comprar <span className="App-title">SerialWorkbook</span></h1>
                            <div className="row p-2 align-items-center mt-5">
                                <div className="col-sm-12 col-md-6">
                                    <ReactPlayer
                                        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                                    />
                                </div>
                                <div className="col-sm-12 col-md-6 p-2">
                                    <h4>Se ha enviado a su correo el comprobante de pago y documentación de la aplicación</h4>
                                    <h5>Para descargar has click en el botón y sigue los pasos de instalación</h5>
                                    <button className="btn btn-success" onClick={saveFile}>Descargar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : (
        <form onSubmit={handleFormSubmit}>
            <section className="CheckoutForm">
                <div className="container">
                    {messageError &&
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>{messageError.type}</strong> {messageError.message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>}
                    {message &&
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Pago procesado</strong> {message.message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>}
                </div>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-6 text-center p-1">
                            <h1 className="App display-3 fw-bold App-title">Es el momento de crecer</h1>
                            <h2>Comienza mejorando tu proceso mediante nuestra aplicación</h2>
                            <div className="row justify-content-center d-flex align-items-center">
                                <div className="col">
                                    <h2 className="link-warning lh-base">MX $4500.00</h2>
                                    <p>Pago seguro via Stripe o Paypal</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 text-center p-1 card bg-dark rounded">
                            <h1 className="App display-5 fw-bold">Da el siguiente paso</h1>
                            <div className="container">
                                <div className="col p-2">
                                    <p className="text-start">Nombre completo</p>
                                    <input
                                        id="customerName"
                                        type="text"
                                        value={customerName}
                                        onChange={(eCustomer) => setCustomerName(eCustomer.target.value)}
                                        placeholder="Ingresa tu nombre completo"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col p-2">
                                    <p className="text-start">Correo Electrónico</p>
                                    <input
                                        id="email"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email address"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col p-2">
                                    <p className="text-start">Datos del pago</p>
                                    <CardElement className="form-control" options={cardOptions} />
                                </div>
                                <div id="smart-button-container">
                                    <div className="text-align center">
                                        <div className="align-items-center justify-content-center">
                                        <button className="btn btn-primary p-2 mt-3 mb-3 align-items-center" disabled={loading || !stripe}>
                                        <i className="bi bi-credit-card fs-4 p-2"></i> 
                                                {loading ? (
                                                    <div className="spinner-border text-white" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                ) : "Comprar"
                                                }
                                            </button>
                                            <div id="paypal-button-container" className="mb-5" disabled={loading}>
                                                <PaypalExpressBtn
                                                    env={env}
                                                    client={client}
                                                    currency={currency}
                                                    total={total}
                                                    onError={onError}
                                                    onSuccess={onSuccess}
                                                    onCancel={onCancel}
                                                    style={{ shape: "rect", color:"gold", size: "medium", tagline :false, label:"paypal"}}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form>
    )
}

export default CheckoutForm