import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ booking }) => {
  const { email, BuyerName, bookName, _id } = booking;

  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  console.log(stripe);
  console.log(booking.price);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(data.clientSecret);
        setClientSecret(data.clientSecret);
      })
      .catch((error) => console.log(error.message));
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
      console.log(error.message);
      setCardError(error.message);
    } else {
      console.log(paymentMethod.status);
      setCardError("");
    }
    setProcessing(true);
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
      setCardError(confirmError.message);
      setProcessing(false);
      setPaymentError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log(paymentIntent);
      }

      const payment = {
        price: booking.price,
        email,
        transactionId: paymentIntent.id,
        bookingId: booking._id,
      };

      fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            setSuccess("Congrats! your payment completed");
            setTransactionId(paymentIntent.id);
            toast.success("Payment Successfully");
            //update sell order data ///
            fetch(`http://localhost:5000/order/${_id}`)
              .then((res) => res.json())
              .then((data) => {});

            fetch(`http://localhost:5000/booksName?name=${bookName}`)
              .then((res) => res.json())
              .then((data) => {});
          }
        });
    }
  };

  return (
    <>
      <h1 className="mb-4 text-3xl font-semibold">Payment here !</h1>
      <div className=" bg-slate-100 border rounded p-12 shadow-lg text-black">
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000000",
                  "::placeholder": {
                    color: "#000000",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="mt-4 btn btn-xs rounded"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>

          <h1 className="text-red-600 mt-6 mb-4">{cardError}</h1>
          {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
