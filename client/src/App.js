import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import React from 'react'
import Navigation from './Components/Navbar';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import Products from "./Pages/Auth/Products";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Products />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App