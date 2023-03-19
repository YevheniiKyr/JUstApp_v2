import React, {useContext} from 'react';
import {Form, Row} from "react-bootstrap";
import {Context} from "../index";
import ProductItem from "./ProductItem";
import {observer} from "mobx-react-lite";

const ProductList = observer(() => {
    const {product} = useContext(Context)
    return (
        <Row className="d-flex m-auto ">
            {

                product.products.map(

                prod => <ProductItem  key={prod._id} product = {prod} />

                )

            }
        </Row>
    );
}
)

export default ProductList;