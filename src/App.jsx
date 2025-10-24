import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckOutPage } from './pages/CheckOutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/checkout" element={<CheckOutPage/>}></Route>
      <Route path="/orders" element={<OrdersPage/>}></Route>
      <Route path="/tracking" element={<TrackingPage/>}></Route>
    </Routes>
  ) 
}

export default App
