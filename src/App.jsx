import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/checkout" element={<div>Testing</div>}></Route>
    </Routes>
  )
}

export default App
