import React, { useState, useEffect } from 'react';
import "./Payment.css";
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link , useHistory} from 'react-router-dom';
import {CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotol } from './reducer';
import axios from "./axios";
import {db} from "./firebase";
function Payment() {
    
    const history = useHistory();
    const [{basket,user},dispatch] = useStateValue();
   
    const stripe = useStripe();
    const elements = useElements();
   
    const [error,setError]=useState(null);
    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");
    const [disabled,setDisabled]=useState(true);
    const [clientSecret,setClientSecret]=useState(true);

    useEffect(()=>{
        //generate the special stripe which allows us to charge a customer 
        const getClientSecret=async()=>{
            const response = await axios({
                method:'post',
                //stripe expects the total in currencies subtotal 
                url:`/payments/create?total=${getBasketTotol(basket)*100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    },[basket]);

    console.log('the secret is ',clientSecret);

    const handleSubmit = async (event) => {
        //stripe functionality  
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card : elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent = payment confirmation
            db
              .collection('users')
              .doc(user?.id)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  basket : basket,
                  amount : paymentIntent.amount,
                  created : paymentIntent.created
              })

            setSucceeded(true);
            setError(null)
            setProcessing(false)
            dispatch({
                type:'EMPTY_BASKET'
            })
            history.replace("/orders") 
        })

    }
   
    const handleChange = event => {
        //listen for changes in the CardElement
        //and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }
    return (
        <div className="payment"> 
            <div className="payment__container">
            <h1>
                Checkout {<Link to="/checkout">({basket?.length} items)</Link>}
            </h1>
                {/*payment section-delivery address*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>delivery address</h3>    
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Tumkur</p>
                        <p>India</p>
                    </div>
                </div>
                {/*payment section-review items*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items and delivery</h3>
                    </div>
                    <div className="payment__items">
                            {basket.map(item=>(
                                <CheckoutProduct
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    price={item.price}
                                    rating={item.rating}
                                />
                            ))}
                    </div>
                    
                </div>
                {/*payment section-payment method*/}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment__details">
                        {/*stripe implementation*/}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                renderText={(value)=>(
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotol(basket)}
                                displayType={"text"}
                                thousandSeparator={true}    
                                prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
