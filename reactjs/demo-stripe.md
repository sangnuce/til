Trong thời đại công nghệ thông tin phát triển nhanh chóng như hiện nay, việc các website có tích hợp các công cụ thanh toán online đã dần trở nên quen thuộc với tất cả chúng ta.
Sau đây, hãy cùng mình tìm hiểu cách tích hợp một trong những công cụ thanh toán online khá nổi tiếng là [Stripe](https://stripe.com/) vào một ứng dụng ReactJS với Rails API nhé.

Trong bài viết này, mình sẽ hướng dẫn các bạn xây dựng 1 form thu thập thông tin credit card của user để gửi lên Stripe.

## Preparations

Trước tiên, chúng ta cần khởi tạo 1 app ReactJS:

```
npx create-react-app demo-stripe
cd demo-stripe
```

Chạy thử `yarn start`, React app của chúng ta sẽ tự động được mở lên trên trình duyệt:

![initial react app](https://raw.githubusercontent.com/sangnuce/til/master/images/initial-react-app.png)

Bước tiếp theo, chúng ta sẽ dựng các fields lấy thông tin credit card.
Vì các thông tin liên quan đến thanh toán thì khá là nhạy cảm, vì vậy Stripe có sẵn thư viện cung cấp các Element components để có thể linh hoạt thu thập thông tin thanh toán một cách an toàn.

```
yarn add @stripe/react-stripe-js @stripe/stripe-js
```

## Elements provider

`@stripe/react-stripe-js` sẽ cung cấp một `Elements` provider, cho phép chúng ta sử dụng các `Element components` và truy cập được [Stripe object](https://stripe.com/docs/js/initializing) trong bất kỳ component con nào.

Để sử dụng `Elements` provider, trước hết cần khởi tạo một `Stripe object` bằng cách dùng `loadStripe` từ `@stripe/stripe-js`, truyền vào một `publishable key` mà Stripe cung cấp cho chúng ta khi sau tạo tài khoản.

```javascript
# App.js

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG");

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
```

Bạn có thể vào [đây](https://dashboard.stripe.com/account/apikeys) để lấy `publishable key` nhé.

_Lưu ý_: `loadStripe` cần phải gọi ở bên ngoài hàm render của component để tránh việc khởi tạo lại `Stripe object` mỗi khi component render.

## Element components

Như đã nói ở trên, Stripe cung cấp sẵn cho chúng ta các Element components để giúp việc thu thập thông tin thanh toán linh hoạt và an toàn. Các components đó gồm:
| | |
|-|-|
| CardElement | Một single-line input thu thập tất cả các thông tin thẻ cần thiết. |
| CardNumberElement | Thu thập số thẻ. |
| CardExpiryElement | Thu thập thời hạn của thẻ. |
| CardCvcElement | Thu thập số CVC của thẻ.
| PaymentRequestButtonElement | Nút thanh toán "tất cả trong một" được hỗ trợ bởi Apple Pay hoặc Payment Request API. Tham khảo [Payment Request Button docs](https://stripe.com/docs/stripe-js/elements/payment-request-button) để biết thêm thông tin.
| AuBankAccountElement | Thu thập thông tin tài khoản ngân hàng của Úc (BSB và số tài khoản) để sử dụng với thanh toán BECS Direct Debit.
| IbanElement | Số tài khoản ngân hàng quốc tế (IBAN). Có sẵn cho các quốc gia SEPA.
| IdealBankElement | Ngân hàng của người dùng, để sử dụng với thanh toán iDEAL.
| FpxBankElement | Ngân hàng của người dùng, để sử dụng với các khoản thanh toán FPX.

Bạn có thể dùng các Element components riêng lẻ bên trong Elements provider. Nhưng hãy lưu ý rằng, bạn chỉ có thể đung mỗi Element một lần duy nhất thôi.

Để đơn giản, mình sẽ sử dụng luôn `CardElement` để demo nhé, thêm 1 chút CSS cho đẹp.

```javascript
// App.js

import { Elements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./App.css";

const stripePromise = loadStripe("pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG");

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
```

```css
/* App.css */

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

Kết quả sẽ như thế này:

![card element](https://raw.githubusercontent.com/sangnuce/til/master/images/card-element.png)

Như vậy là chúng ta đã dựng được các fields để cho phép người dùng nhập vào thông tin thanh toán một cách linh hoạt và an toàn.

Full source code mình để ở đây nhé: https://github.com/sangnuce/til/tree/master/reactjs/demo-stripe

Bài viết tiếp theo, mình sẽ hướng dẫn các bạn cách để tương tác với Rails API và Stripe để hoàn thành được luồng thanh toán nhé.
