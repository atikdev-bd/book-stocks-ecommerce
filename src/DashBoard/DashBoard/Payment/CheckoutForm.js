import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({booking}) => {

    console.log(booking)

    const {price,email,BuyerName, bookName, phone} = booking

    const [cardError, setCardError] = useState('')
    const [processing, setProcessing] = useState(false);
    const [paymentError,setPaymentError]= useState('')
    const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
         "Content-Type": "application/json" ,
        },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [booking]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
        console.log(error)
        setCardError(error.message)
      }
      else{
        console.log(paymentMethod)
        setCardError('')
      }
      setProcessing(true)
      const { paymentIntent, error: confirmError } =
      
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: BuyerName,
            email: email,
          },
        },
      });

      if (confirmError) {
        console.log(confirmError.message);
        setProcessing(false)
        setPaymentError(confirmError.message);
      } 
      else{
        console.log(paymentIntent);
        
      }












  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe ||!clientSecret}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
