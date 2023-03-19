import React, {useContext, useEffect} from 'react';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {PRODUCT_ROUTE} from "../utils/constRoutes";
import {useLocation, useNavigate} from "react-router-dom";
import {addProductToCart, deleteProductFromCartAll} from "../http/cartApi";
import {Context} from "../index";

import {observer} from "mobx-react-lite";
import {fetchProductsArray} from "../http/productApi";

const ProductItemInBasket = observer(({product, amount}) => {


        const navigate = useNavigate()
        const location = useLocation()
        const {user, basket} = useContext(Context)

        const deleteAllThisFromCart = (product_id) => {

            console.log(" USER ID " + user.user.id)
            console.log(basket.basket._id + '  ' + product_id)

            deleteProductFromCartAll(basket.basket._id, product_id).then(data => {
              //  window.location.reload()
                let newArray = [...basket.products].filter(prod => prod._id !== product_id)
                basket.setProducts(newArray)

                /*  basket.setBasket(data)
                  let ids = []
                  data.products.map((prod) => ((prod.product !== undefined) ?  ids.push(prod.product) : {}))

                  if (ids.length > 0) {
                      console.log("SET PRODS")
                      fetchProductsArray(ids).then(data => {
                          basket.setProducts(data)
                      })

                      console.log(data)*/


                console.log(data)

            })


        }

        useEffect(() => {
            console.log("AMOUNT" + amount)
        }, [])

        return (
            <Col md={4} lg={3} sm={6}>

                <Container>
                <Card style={{width: '15rem', height: '25rem', cursor: "pointer", marginTop: "1rem"}}>
                    <Card.Img variant="top" src={process.env.REACT_APP_API_URL + product.img}
                              style={{width: '12rem', height: '15rem', alignSelf: "center", marginTop: "1rem"}}/>
                    <Card.Body>
                        <Card.Title className={"d-flex justify-content-center"}
                                    style={{fontSize:'1.5rem'}}> {product.title}</Card.Title>
                        <Card.Text className={"d-flex justify-content-center"}
                                   style={{fontSize:'1rem'}}>
                            {product.description}
                        </Card.Text>

                        <Card.Text style={{fontSize: "1rem"}} className={"d-flex justify-content-center"}>
                            Amount : {amount}
                        </Card.Text>


                        <Row className={"justify-content-between"}>
                        <Button
                            className = {"d-flex m-auto "}
                            style={{width: '6rem', height:'2rem',  fontSize:'1rem', justifyContent:"center"}}
                            onClick={() => {
                            navigate(PRODUCT_ROUTE + '/' + product._id)
                            console.log(PRODUCT_ROUTE + '/' + product._id)

                        }} variant="outline-primary">detail</Button>


                        <Button
                            className = {"d-flex m-auto "}
                            style={{width: '6rem', height:'2rem', fontSize:'1rem', justifyContent:"center" }}
                                onClick={() => {
                            console.log("THIS ID " + product._id)
                            deleteAllThisFromCart(product._id)
                        }}

                                variant="outline-primary">delete</Button>
                        </Row>

                    </Card.Body>
                </Card>
                    </Container>
            </Col>
        );
    }
)

export default ProductItemInBasket;