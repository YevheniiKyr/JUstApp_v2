import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Row} from "react-bootstrap";

import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {fetchBasketById} from "../http/cartApi";
import {fetchProductsArray} from "../http/productApi";
import ProductItemInBasket from "../Components/productItemInBasket";
import {ORDER_ROUTE} from "../utils/constRoutes";


const BasketPage = observer(() => {

    const {basket} = useContext(Context)

    const {id} = useParams()

    const navigate = useNavigate()


      useEffect(() => {

               fetchBasketById(id).then(data => {
                   console.log("FETCH BASKET")
                   basket.setBasket(data)
                   let ids = []

                   basket.basket.products.map((prod) => ((prod.product !== undefined) ? ids.push(prod.product) : {}))
               //    basket.basket.products.map((prod) => ( ids.push(prod.product)))

                   if (ids.length > 0) {
                       console.log("SET PRODS")
                       fetchProductsArray(ids).then(data => {
                           basket.setProducts(data)
                           let amounts = []
                           basket.products.map(prod => amounts.push(basket.basket.products.find(({product}) => product === prod._id).amount))
                           setAmounts(amounts)
                       })

                   }

               })
           }

           , [])


    const [amounts, setAmounts] = useState([])


    return (


                <Container >
                    {
                        (basket.products.length === 0) ?

                            <img className={"d-flex m-auto"}
                                 src={ require("../static/cart_rofl.webp") } width={"500rem"} alt={"basket"}/>

                            :
                            (
                                <Row className="d-flex m-auto">
                                    {
                                        basket.products.map(
                                            (prod, index) => <ProductItemInBasket key={prod._id} product={prod}
                                                                                  amount={amounts[index]}
                                            />)

                                    }
                                </Row>
                            )
                    }

                    {
                        (basket.products.length !== 0) ?
                            <Container className={"d-flex justify-content-center mt-5 "}
                            >
                            <Button
                                size={"lg"}
                                onClick={() => navigate(ORDER_ROUTE + '/' + basket.basket._id)}
                                style={{margin: 5, background: "#F59B56", border: "none"}}

                            >
                                Переглянути замовлення
                            </Button>
                                </Container>
                            :
                            <></>
                    }

                </Container>
            );


})

export default BasketPage;