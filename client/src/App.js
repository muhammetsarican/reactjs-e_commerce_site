import './App.css';
import React from 'react'
import Navigation from './Components/Navbar';
import SignIn from './Pages/Auth/SignIn';
import SignUp from './Pages/Auth/SignUp';
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Basket from './Pages/Basket';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Products}></Route>
          <Route path="/product/:product_id" component={ProductDetail}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <ProtectedRoute path="/profile" component={Profile}></ProtectedRoute>
          <Route path="/basket" component={Basket}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App