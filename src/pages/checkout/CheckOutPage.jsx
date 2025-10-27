import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from './Header';
import { PaymentSummary } from './PaymentSummary';
import { OrderSummary } from './OrderSummary';
import './CheckOutPage.css';

export function CheckOutPage({ cart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        setDeliveryOptions(response.data);
      });
    axios.get('/api/payment-summary')
      .then((response) => {
        setPaymentSummary(response.data);
      });
  }, [])
  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <Header cart={cart} />
      </div>


      <div className="checkout-page">

        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          {cart && deliveryOptions &&
            <div className="order-summary">
              <OrderSummary cart={cart} deliveryOptions={deliveryOptions}/>
            </div>
          }

          {paymentSummary &&
            <div className="payment-summary">
              <PaymentSummary paymentSummary={paymentSummary} />
            </div>}
        </div>
      </div>
    </>
  );
}