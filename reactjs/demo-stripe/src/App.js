import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Form from "./Form";

const stripePromise = loadStripe("pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG");

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Form />
    </Elements>
  );
};

export default App;
