import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51Hc0ufKbavdG8hXdgDmoRJvyZIG7vQzAqmt7ZInzxFmMvfxz2GFwVrLwjgBxqS1qf5ejCrMGgm2ygJfB5Zx0HS7B00PmsPLgAK"
);

const CARD_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardElement options={CARD_OPTIONS} />
    </Elements>
  );
};

export default App;
