import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from "./store/userStore";
import ProductStore from "./store/productStore";
import BasketPage from "./Pages/basketPage";
import BasketStore from "./store/basketStore";
import ReviewStore from "./store/reviewStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <Context.Provider value={{
          user: new UserStore(),
          product: new ProductStore(),
          basket: new BasketStore(),
          reviewsContext: new ReviewStore()
      }} >
      <App />
      </Context.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
