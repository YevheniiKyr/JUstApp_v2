import React, {useContext, useEffect} from 'react';
import {Col, Container, Dropdown, Form, Row} from "react-bootstrap";
import CategoryMenu from "../Components/CategoryMenu";
import ProductList from "../Components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategories, fetchProducts, fetchProductsArray} from "../http/productApi";
import {fetchBasket} from "../http/cartApi";


const MainPage = observer(() => {

        const {product, user, basket} = useContext(Context)

        useEffect(() => {
            fetchCategories().then(data => {
                product.setCategories(data)
                console.log("CATEGORIES " + data)
            })
            fetchProducts().then(data => {
                console.log("PRODS " + data.products)
                product.setProducts(data.products)
            })
         /*   if(user.user) {
                fetchBasket(user.user.id).then(data => {
                    basket.setBasket(data)
                })
            }*/


        }, [])


        return (
            <Container className="d-flex m-auto mt-5">


                <Form>
                    <Col md={12}>
                        <ProductList/>
                    </Col>
                </Form>


            </Container>
        );
    }
)

export default MainPage;