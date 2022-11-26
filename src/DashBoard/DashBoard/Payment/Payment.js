import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51M6WetIgHI6VLWjmCbw2U6qI7KLd9AkG4Dhftgvm8JVobWVBz7S57uMmfhdmARhvoIAvXevOAvbaExZO4VgrxKhU00dPXyXTNe"
);

const Payment = () => {
  const booking = useLoaderData()
  return (
   <div className="w-96 my-6">
     <Elements stripe={stripePromise}>
      <CheckoutForm
      booking = {booking}
      />
    </Elements>
   </div>
  );
};

export default Payment;
