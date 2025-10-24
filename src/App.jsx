import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckOutPage } from './pages/CheckOutPage'

import './App.css'


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/checkout" element={<CheckOutPage/>}></Route>
    </Routes>
  ) 
}

export default App
