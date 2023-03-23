import React, {useContext, useEffect} from 'react';
import {Col, Container, Form} from "react-bootstrap";
import CategoryMenu from "../Components/CategoryMenu";
import ProductList from "../Components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategories, fetchProducts} from "../http/productApi";

import Pages from "../Components/Pages";


const MainPage = observer(() => {

        const {product} = useContext(Context)




        useEffect(() => {

            fetchCategories().then(data => {
                product.setCategories(data)
                console.log("CATEGORIES " + data)
            })

            fetchProducts(product.currentCategory,
                product.currentSearch,
                product.page,
                product.limit).then(data => {
                console.log("PRODS " + data.products)
                product.setProducts(data.products)
                product.setTotalCount(data.count)
            })
        }, [product.currentSearch, product.currentCategory, product.page])


        return (
            <>
                <Container className={"d-flex"}>
                    <CategoryMenu/>
                    <Form.Control
                        className={"mt-5"}
                        type="text"
                        placeholder="Search"
                        value={product.currentSearch}
                        onChange={(e) => product.setCurrentSearch(e.target.value)}
                    />
                </Container>

                <Container className="d-flex m-auto mt-5">


                    <Form style={{width: "100%"}}>
                        <Col md={12}>
                            <ProductList/>
                            <Pages/>
                        </Col>
                    </Form>


                </Container>
            </>
        );
    }
)

export default MainPage;