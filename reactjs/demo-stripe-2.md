hey yo, hôm này mình sẽ tiếp tục hướng dẫn các bạn tương tác với Rails API và Stripe để hoàn thành luồng thanh toán nhé.
Tổng quan thì flow hoạt động sẽ như thế này:
![accept a payment](https://raw.githubusercontent.com/sangnuce/til/master/images/accept-a-payment-web.png)

Stripe sử dụng [PaymentIntent](https://stripe.com/docs/api/payment_intents) object để thể hiện ý định thu tiền thanh toán từ khách hàng của bạn, theo dõi các lần tính phí và thay đổi trạng thái thanh toán trong suốt quá trình.
Phía server cần gọi lên API của Stripe để tạo ra PaymentIntent sau đó gửi cho client một giá trị gọi là `client_secret` của PaymentIntent vừa tạo. Giá trị này sẽ dùng để định danh PaymentIntent.

# Cài đặt thư viện
Đối với Ruby, Stripe cũng cung cấp sẵn thư viện để tương tác với Stripe API, đó là gem `stripe`. Trước tiên, ta sẽ thêm `stripe` vào `Gemfile`, sau đó chạy `bundle install` để cài thư viện vào ứng dụng Rails API.

```ruby
# Gemfile

gem 'stripe'
```

# Tạo PaymentIntent

Để tạo một PaymentIntent, từ server chúng ta sẽ cần cung cấp số tiền thanh toán và đơn vị tiền tệ là gì. Nhớ là phải xác định số tiền sẽ tính phí ở phía server, vì đây là môi trường đáng tin cậy, trái ngược với client bị phụ thuộc vào người dùng.
Chúng ta sẽ tạo route và controller như sau:
```ruby
# config/routes.rb

get "secret", to: "payments#secret"
```

```ruby
# app/controllers/payments_controller.rb

class PaymentsController < ActionController::API
  def secret
    # Config secret key của bạn. Có thể lấy được ở đây: https://dashboard.stripe.com/account/apikeys
    Stripe.api_key = "sk_test_abc1234"

    intent = Stripe::PaymentIntent.create({
      amount: 100,
      currency: 'usd',
    })

    render json: { client_secret: intent.client_secret }, status: :ok
  end
end
```

# Xử lý phía client

Ở phần trước mình đã hướng dẫn dùng thư viện Stripe cung cấp để tạo ra các elements nhằm thu thập thông tin thanh toán của người dùng.
Giờ chúng ta sẽ ghép nó vào form nhé.
Trước tiên mình sẽ tách các card elements ra 1 component riêng
```css
/* Card.css */

.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
```

```js
// Card.js

import { CardElement } from "@stripe/react-stripe-js";
import "./Card.css";

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

const Card = () => <CardElement options={CARD_OPTIONS} />;

export default Card;
```

Sau đó tạo Form component và nhúng vào App như sau.

```js
// App.js
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
```

Triển khai của Form sẽ như thế này:
```js
// Form.js
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import Card from "./Card";

const Form = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const response = await fetch('/secret');
    const data = await response.json();
    const clientSecret = data.client_secret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* other form fields */}
      <Card />
      <button type="submit" disabled={!stripe}>
        Thanh toán
      </button>
    </form>
  );
};

export default Form;
```

Khi submit form thanh toán, ta sẽ request lên API để tạo payment intent và lấy secret token, sau đó dùng method `confirmCardPayment` mà stripe cung cấp để hoàn tất việc thanh toán.
Method `getElement` sẽ nhận tham chiếu đến một `CardElement` đã được mounted. `Elements` sẽ tự động tìm `CardElement` của bạn vì chỉ có thể render duy nhất một cái trong số các elements.

Như vậy, ta đã cùng nhau thực hiện được một luồng thanh toán đơn giản với Stripe sử dụng ReactJS client và Rails API server.
Full source code mình đã update ở đây nhé: https://github.com/sangnuce/til/tree/master/reactjs/demo-stripe
