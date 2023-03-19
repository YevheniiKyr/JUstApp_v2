import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {ORDER_ROUTE, PRODUCT_ROUTE, PURCHASE_ROUTE} from "../utils/constRoutes";
import {useNavigate, useParams} from "react-router-dom";
import {addReviewToProduct, fetchCategories, fetchOneProduct, fetchProducts} from "../http/productApi";
import styled from "styled-components";
import addProduct from "../Components/modals/AddProduct";
import {addProductToCart} from "../http/cartApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ReviewList from "../Components/ReviewList";
import Rating from "../Components/Rating";


const MyButton = styled.button`

  font-size: 18px;
`
const ProductPage = observer(() => {
        const {id} = useParams()
        const navigate = useNavigate()
        const {user, basket} = useContext(Context)

        const {reviewsContext} = useContext(Context)
        const addToCart = (product_id) => {
            addProductToCart(basket.basket._id, product_id, 1).then(data =>
                console.log(data)
            )
        }

    const addReview = () => {
        const review = {product: id, user: user.user.id, rating: rating, text:comment}

        addReviewToProduct(review).then(data =>
            console.log(data)
        )
        let newReviews = [...reviewsContext.reviews]
        newReviews.push(review)
        reviewsContext.setReviews(newReviews)
    }

        const [product, setProduct] = useState('')
        const [comment, setComment] = useState('')
        const [rating, setRating] = useState(0);

    const handleRate = (value) => {
        setRating(value);
    };
        useEffect(() => {
            fetchOneProduct(id).then(date => {
                setProduct(date)
            })

        }, [])

        const order = {id: 222}

        return (
            <Container>
                <Container className={"d-flex justify-content-center"}>

                    <Card style={{width: '40vw'}}>
                        <Card.Img src={process.env.REACT_APP_API_URL + product.img}
                                  style={{width: '18vw', height: '18vw', alignSelf: "center", marginTop: "5vw"}}/>
                        <Card.Body>
                            <Card.Title className={"d-flex justify-content-center"}
                                        style={{fontSize: "7vw"}}> {product.title}</Card.Title>
                            <Card.Text className={"d-flex justify-content-center"} style={{fontSize: "3vw"}}>
                                {product.description}
                            </Card.Text>
                            <Rating rating={3} editable={false} ></Rating>
                            <Form className={"d-flex justify-content-center "}>
                                <Button size={"lg"} className={"me-5"} onClick={() => addToCart(product._id)}
                                        variant="outline-primary">Add to cart</Button>

                                <Button size={"lg"} onClick={() => {
                                    navigate(ORDER_ROUTE + '/' + 2)
                                }} variant="outline-primary">Buy</Button>
                            </Form>

                        </Card.Body>
                    </Card>


                </Container>
                <ReviewList product_id={id}/>
                <InputGroup>
                <Form.Control
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className={"mt-3"}
                    placeholder="Напишіть коментар"
                />
               <Rating editable={true} onRate={setRating} ></Rating>
                </InputGroup>
                <Button  size="sm" className={"ms-3 mt-3"} onClick={() => addReview()}
                         variant="outline-primary">Add review</Button>
            </Container>
        );
    }
)

export default ProductPage;