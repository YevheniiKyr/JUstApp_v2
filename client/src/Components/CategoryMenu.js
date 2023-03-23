import {Container, Dropdown, Row} from "react-bootstrap";
import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchProducts} from "../http/productApi";

const CategoryMenu = observer(() => {

        const {product} = useContext(Context)
        const [clicked, setClicked] = useState(false)
        const filterByCategory = (cat) => {
            !cat ?
                (
                    fetchProducts({}, product.currentSearch ).then(data => {
                        product.setCurrentCategory()
                        product.setProducts(data.products)
                        setClicked(false)
                    })
                )
                :
                (
                    fetchProducts(cat._id, product.currentSearch).then(data => {
                        product.setCurrentCategory(cat)
                        product.setProducts(data.products)
                        setClicked(true)
                    })
                )
        }
        return (
            <Container>
                <Row className="mt-5">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            { product.currentCategory? product.currentCategory.name : "Category" }
                        </Dropdown.Toggle>


                        <Dropdown.Menu>
                            {
                                product.categories.map(
                                    cat => <Dropdown.Item key={cat.name}
                                                          onClick={() => clicked && cat.name === product.currentCategory.name? filterByCategory() : filterByCategory(cat)}>
                                        {cat.name}
                                    </Dropdown.Item>
                                )
                            }

                        </Dropdown.Menu>
                    </Dropdown>
                </Row>
            </Container>

        );
    }
)

export default CategoryMenu;
