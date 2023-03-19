import {Container, Dropdown, Row} from "react-bootstrap";
import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ProductItem from "./ProductItem";
import {fetchCategories, fetchProducts} from "../http/productApi";

const CategoryMenu = observer( () => {

    const {product} = useContext(Context)
    console.log(product.categories)

    const [category, setCategory] = useState('')
    const filterByCategory= (cat) => {

        fetchProducts(cat).then(data => {
            console.log(data)
            product.setProducts(data.products)
        })
    }
    return (
        <Container>
        <Row className = "mt-5">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Category
                </Dropdown.Toggle>



                <Dropdown.Menu>
                    {
                        product.categories.map (
                            cat =>  <Dropdown.Item key={cat.name}
                            onClick={() => filterByCategory(cat)}>
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
