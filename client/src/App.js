import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./Components/AppRouter";
import NavBar from "./Components/NavBar";
import {useContext, useEffect, useState} from "react";
import {check} from "./http/authApi";
import {Context} from "./index";
import {Spinner} from "react-bootstrap";
import {fetchBasket, fetchBasketById} from "./http/cartApi";
import {fetchProductsArray} from "./http/productApi";

function App() {

    const {user} = useContext(Context)
    const {basket} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

            check().then(user_data =>{
                user.setUser(user_data)
                user.setIsAuth(true)
                fetchBasket(user.user.id).then(data => {
                   // let newBasket = basket.basket.push(data)
                    basket.setBasket(data)
                    console.log("BASKET SETTT")
                })
              /*  fetchBasket(user_data.id).then(data => {
                    basket.setBasket(data)

                    //basket.setProducts(data.products)
                    console.log("proddata " + data.products)
                    let ids =[]
                    basket.basket.products.map((prod) => ((prod.product !== undefined) ?  ids.push(prod.product) : {}))

                    if (ids.length > 0) {
                        console.log("SET PRODS")
                        fetchProductsArray(ids).then(data => {
                            basket.setProducts(data)
                        })

                    } else {
                        console.log("SMTH WENT WRONG")
                        //   basket.setBasketProducts([])
                        //  basket.setProducts([])
                    }

                })

            /*    fetchBasketById(basket.basket._id).then(data=> {
                    console.log("FETCH BY ID " + data)
                    basket.setBasket(data)
                    //  console.log("USER BASKET ")
                })*/


            }).finally(() => setLoading(false))

    },[])

    if(loading) {
        return <Spinner className={"d-flex justify-content-center align-content-center"} style = {{  width:"30rem", height:"30rem" }}  animation={"border"}></Spinner>
    }

  return (
    <BrowserRouter>
        <NavBar/>
       <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
