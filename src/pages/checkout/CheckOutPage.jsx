import './CheckOutPage.css';
import { formatCurrency } from '../../utils/money';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import { Header } from './Header';
import { PaymentSummary } from './PaymentSummary';

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

          <div className="order-summary">

            {deliveryOptions.length > 0 && cart.map((cartItem) => {

              const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                return (deliveryOption.id === cartItem.deliveryOptionId);
              });

              return (
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                  </div>

                  <div className="cart-item-details-grid">
                    <img className="product-image"
                      src={cartItem.product.image} />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">
                        {formatCurrency(cartItem.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>

                      {deliveryOptions.map((deliveryOption) => {
                        let priceString = 'FREE Shipping';
                        if (deliveryOption.priceCents > 0) {
                          priceString = `${formatCurrency(deliveryOption.priceCents)} - Shipping`;
                        }
                        return (
                          <div key={deliveryOption.id} className="delivery-option">
                            <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId} readOnly
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`} />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                              </div>
                              <div className="delivery-option-price">
                                {priceString}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              );

            })}


          </div>

          {paymentSummary &&
            <div className="payment-summary">
              <PaymentSummary paymentSummary={paymentSummary}/>
            </div>}
        </div>
      </div>
    </>
  );
}