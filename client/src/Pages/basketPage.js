import React, {useContext, useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {Context} from "../index";
import {Button, Container, Form, Row} from "react-bootstrap";

import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {fetchBasket, fetchBasketById} from "../http/cartApi";
import {fetchOneProduct, fetchProductsArray} from "../http/productApi";
import ProductItemInBasket from "../Components/productItemInBasket";
import {ADMIN_ROUTE, CHECK_ORDER_ROUTE, ORDER_ROUTE} from "../utils/constRoutes";


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

                if (ids.length > 0) {
                    console.log("SET PRODS")
                    fetchProductsArray(ids).then(data => {
                        basket.setProducts(data)
                    })

                } else {
                    console.log("SMTH WENT WRONG")

                }

                let amounts = []
                basket.products.map( prod => amounts.push(basket.basket.products.find(({product}) => product === prod._id).amount))
                setAmounts(amounts)
            })
        }


        , [])




   const [amounts, setAmounts] = useState([])



    return (

        <Container>
            {
                (basket.products.length === 0) ?

                    <img className={"d-flex m-auto"}
                         src={require("../static/cart_rofl.webp")} width={"500rem"} alt={"basket"}/>

                    :
                    (
                        <Row className="d-flex ">
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
                        <Button
                            onClick={() => navigate(ORDER_ROUTE + '/' + basket.basket._id)}
                            className={"d-flex align-self-center"}
                            style={{margin: 5}}
                            variant={"outline-dark"}
                        >
                            Переглянути замовлення
                        </Button>
                        :
                        <></>
                }

        </Container>
    );
})


export default BasketPage;