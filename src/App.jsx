import axios from 'axios'
import { Route, Routes } from 'react-router'
import { useEffect, useState } from 'react'
import { HomePage } from './pages/home/HomePage'
import { CheckOutPage } from './pages/checkout/CheckOutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import { TrackingPage } from './pages/tracking/TrackingPage'

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
      const response = await axios('api/cart-items?expand=product')
      setCart(response.data);
    }
  useEffect(() => {
    loadCart();
  },[]);

return (
  <Routes>
    <Route path="/" element={<HomePage cart={cart} loadCart={loadCart}/>}></Route>
    <Route path="/checkout" element={<CheckOutPage cart={cart} />}></Route>
    <Route path="/orders" element={<OrdersPage cart={cart} />}></Route>
    <Route path="/tracking" element={<TrackingPage cart={cart} />}></Route>
  </Routes>
)
}

export default App
