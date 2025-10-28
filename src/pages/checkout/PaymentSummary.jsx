import axios from 'axios';
import { formatCurrency } from '../../utils/money';
import { useNavigate } from 'react-router';

export function PaymentSummary({ paymentSummary,loadCart }) {
  const navigator = useNavigate();
  const createOrder = async () => {
    await axios.post('api/orders');
    await loadCart();
    navigator('/orders');
  };

  return (
    <>
      <div className="payment-summary-title">
        Payment Summary
      </div>

      <div className="payment-summary-row">
        <div>Items ({paymentSummary.totalItems}):</div>
        <div className="payment-summary-money">{formatCurrency(paymentSummary.productCostCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div className="payment-summary-money">{formatCurrency(paymentSummary.shippingCostCents)}</div>
      </div>

      <div className="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div className="payment-summary-money">{formatCurrency(paymentSummary.totalCostBeforeTaxCents)}</div>
      </div>

      <div className="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div className="payment-summary-money">{formatCurrency(paymentSummary.taxCents)}</div>
      </div>

      <div className="payment-summary-row total-row">
        <div>Order total:</div>
        <div className="payment-summary-money">{formatCurrency(paymentSummary.totalCostCents)}</div>
      </div>

      <button className="place-order-button button-primary" onClick={createOrder} >
        Place your order
      </button>
    </>
  )
}