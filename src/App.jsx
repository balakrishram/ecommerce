import { Route, Routes } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { HomePage } from './pages/HomePage'
import { CheckOutPage } from './pages/CheckOutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    axios('api/cart-items?expand=product')
      .then((response) => {
        setCart(response.data);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />}></Route>
      <Route path="/checkout" element={<CheckOutPage cart={cart} />}></Route>
      <Route path="/orders" element={<OrdersPage />}></Route>
      <Route path="/tracking" element={<TrackingPage />}></Route>
    </Routes>
  )
}

export default App
