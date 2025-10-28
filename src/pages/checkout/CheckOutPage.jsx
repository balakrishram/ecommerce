import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from './Header';
import { PaymentSummary } from './PaymentSummary';
import { OrderSummary } from './OrderSummary';
import './CheckOutPage.css';

export function CheckOutPage({ cart,loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getDeliveryData = async () => {
      const response = await axios('/api/delivery-options?expand=estimatedDeliveryTime')
      setDeliveryOptions(response.data);
    }
    getDeliveryData();
  },[]);

  useEffect(() => {
    const getPaymentData = async () => {
      const response = await axios('/api/payment-summary')
      setPaymentSummary(response.data);
    }
    getPaymentData();
  },[cart]);
  
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
              <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
            </div>
          }

          {paymentSummary &&
            <div className="payment-summary">
              <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
            </div>}
        </div>
      </div>
    </>
  );
}