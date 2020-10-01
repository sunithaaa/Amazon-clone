import React,{useEffect} from 'react';
import Header from "./Header"
import Home from "./Home"
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Checkout from "./Checkout"
import './App.css';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"
import Orders from './Orders';

const promise=loadStripe('pk_test_51HTjrUGNLaaCsf3KNdVfStov2KwGhQ7WhJPbYAsLGJ6xUwxAs4O8ac76H6OcGpCUDaJwlfI6u6f1HJjJOXk9OhKx00mAQuLmWi');

function App() {
  const [{},dispatch]=useStateValue();
  
  useEffect(()=>{
    //useeffect will run only once when the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('the user is >>>',authUser);

      if(authUser)
      {
        //user was logged in/user just logged in
          dispatch({
            type:'SET_USER',
            user:authUser
          })
      }
      else{
        // the user is logged out
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  },[])
  return (
    <Router>
      <div className="app">
        
          <Switch>
            <Route path="/orders">
              <Header/>
              <Orders/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/checkout">
              <Header/>
              <Checkout/>
            </Route>
            <Route path="/payment">
              <Header/>
              <Elements stripe={promise} >
                <Payment/>
              </Elements>
            </Route>
            <Route path="/">
              <Header/>
              <Home/>
            </Route>
          </Switch>
      
      </div>
    </Router>
  );
}

export default App;
