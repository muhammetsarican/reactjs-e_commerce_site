import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import React from 'react'
import Navigation from './Components/Navbar';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Profile from "./Pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Products />}></Route>
          <Route path="/product/:product_id" element={<ProductDetail />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App