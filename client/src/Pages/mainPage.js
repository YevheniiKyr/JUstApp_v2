import React, {useContext, useEffect} from 'react';
import {Col, Container, Form} from "react-bootstrap";
import CategoryMenu from "../Components/CategoryMenu";
import ProductList from "../Components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategories, fetchProducts} from "../http/productApi";
import Pages from "../Components/Pages";
import {useMediaQuery} from 'react-responsive';
import PriceSlider from "../Components/PriceSlider";
import {useNavigate} from "react-router-dom";

const MainPage = observer(() => {

        //  const {product} = useContext(Context)

        const isExtraSmallScreen = useMediaQuery({maxWidth: 575.99});
        const isSmallScreen = useMediaQuery({minWidth: 576, maxWidth: 767.99});
        const isMediumScreen = useMediaQuery({minWidth: 768, maxWidth: 991.99});
        const isLargeScreen = useMediaQuery({minWidth: 992, maxWidth: 1199.99});
        const isExtraLargeScreen = useMediaQuery({minWidth: 1200});

        const navigate = useNavigate()
        const {product, optionsStore} = useContext(Context)


        useEffect(() => {
            console.log("ITS BAD DECISION BUT IT WORKS")
            let path = optionsStore.path
            console.log("PATH " + path)
            if (path !== '') {
                optionsStore.setPath('')
                navigate(path)
            }

            if (isExtraSmallScreen) product.setLimit(2)
            if (isSmallScreen) product.setLimit(4)
            if (isMediumScreen) product.setLimit(6)
            if (isLargeScreen || isExtraLargeScreen) product.setLimit(8)
        }, [isSmallScreen, isMediumScreen, isLargeScreen, isExtraSmallScreen, product])


        useEffect(() => {

            fetchCategories().then(data => {
                product.setCategories(data)
            })

            fetchProducts(
                product.currentCategory,
                product.currentSearch,
                product.page,
                product.limit).then(data => {
                console.log("PAGE " +  product.page)

                console.log("LIMIT" + product.limit)

                console.log("DATA COUNT " + data.count)
                console.log("PRODUCTS ON PAGE COUNT " + data.products.length)
                product.setProducts(data.products)
                product.setTotalCount(data.count)
            })
        }, [product.currentSearch, product.currentCategory, product.page, product.limit])


        return (
            <>
                <Container className={"d-flex"}>
                    <CategoryMenu/>
                    <PriceSlider/>

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
                        <Col md={12} lg={12} xs={12} xl={12}>
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