import React from "react";
import { PaymentElement, useStripe, useElements, AddressElement } from "@stripe/react-stripe-js";
import FormErrorText from "../components/FormErrorText";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect, FormEvent } from "react";
import { useAppDispatch } from "../hooks";
import { clearCheckoutState } from "../features/checkout/checkoutSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    console.log(import.meta.env.PROD, "PRODUCTION MODE IN CHECKOUT")

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            if (paymentIntent) {
                switch (paymentIntent.status) {
                    case "succeeded":
                        console.error("Payment succeeded!");
                        setError(true);
                        setMessage("Payment succeeded!");
                        dispatch(clearCheckoutState());
                        dispatch(clearCart());
                        navigate("/checkout/confirmation");
                        break;
                    case "processing":
                        console.error("Payment processing!");
                        setError(true);
                        setMessage("Your payment is processing.");
                        break;
                    case "requires_payment_method":
                        break;
                    // console.error("Your payment was not successful, please try again.");
                    // setError(true);
                    // setMessage("Your payment was not successful, please try again.");
                    // break;
                    default:
                        console.error("Something went wrong.");
                        setError(true);
                        setMessage("Something went wrong.");
                        break;
                }
            }
        });
    }, [stripe]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        setSubmitting(true);
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // dispatch(createOrder());

        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: import.meta.env.PROD ? "https://www.bwh-ecommerce.netlify.app/checkout" : "http://localhost:5173/checkout",
            },
        });

        if (result.error && result.error.message) {
            // Show error to your customer (for example, payment details incomplete)
            setError(true);
            setMessage(result.error.message);
        } else {
            console.log(result);
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
        setSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-2 rounded-lg bg-white p-4">
            <h1 className="border-b-2 border-gray-200 text-center text-2xl lg:text-start">Shipping</h1>
            <AddressElement options={{ mode: "shipping" }} />
            <h1 className="border-b-2 border-gray-200 text-center text-2xl lg:text-start">
                Payment info
            </h1>
            <PaymentElement />
            <FormErrorText error={error} message={message} />
            <button disabled={!stripe} className="text-white">
                {submitting ? (
                    <div className="flex items-center justify-center gap-2">
                        Processing... <ClipLoader color="white" size={18} />
                    </div>
                ) : (
                    "Buy now"
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;
