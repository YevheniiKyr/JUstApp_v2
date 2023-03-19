import React, {useContext, useEffect} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {PRODUCT_ROUTE} from "../utils/constRoutes";
import {useLocation, useNavigate} from "react-router-dom";
import {addProductToCart, deleteProductFromCartAll} from "../http/cartApi";
import {Context} from "../index";
import {fetchOneProduct} from "../http/productApi";
import {observer} from "mobx-react-lite";

const ProductItemOld = observer(({product, amount})   => {



    const navigate = useNavigate()
    const location = useLocation()
    const {user, basket} = useContext(Context)

    const deleteProductCart = (product_id) => {

           console.log(" USER ID " + user.user.id)
        console.log( basket.basket._id + '  '+ product_id )
        deleteProductFromCartAll(basket.basket._id, product_id).then(data =>
        {
        console.log(data)
        basket.setBasket(data)
        basket.setProducts("DATA PRODS " + data.products)
        })
    }

    useEffect(() => {
        console.log("AMOUNT" + amount)
    }, [])

    return (
        <Col md={3} className={"m-4"} >


            <Card style={{ width: '18rem', cursor: "pointer" }}>
                <Card.Img variant="top" src={process.env.REACT_APP_API_URL + product.img}   />
                <Card.Body>
                    <Card.Title> {product.title}</Card.Title>
                    <Card.Text>
                        WDHJD jejedk e ededkked djdej
                        dejdejked
                        edjdekkde
                    </Card.Text>
                    {
                        (location.pathname.includes("basket"))  ?
                            <Card.Text style = {{fontSize : "20px"}}>
                                Amount : {amount}
                            </Card.Text>
                            :
                            <div></div>

                    }

                    <Button onClick={()=> {
                        navigate(PRODUCT_ROUTE + '/' + product._id)
                        console.log(PRODUCT_ROUTE + '/' + product._id)
                    }

                    } variant="outline-primary">detail</Button>


                    {
                        (location.pathname.includes("basket"))  ?

                        <Button onClick={()=> {
                            console.log("THIS ID " + product._id)
                            deleteProductCart(product._id)
                    }

                    } variant="outline-primary">delete</Button>
                            : <div></div>


                    }


                </Card.Body>
            </Card>
        </Col>
    );
}
)

export default ProductItemOld;