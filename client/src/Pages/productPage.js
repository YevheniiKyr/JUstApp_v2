import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {ORDER_ROUTE} from "../utils/constRoutes";
import {useNavigate, useParams} from "react-router-dom";
import {addReviewToProduct, fetchOneProduct} from "../http/productApi";
import styled from "styled-components";
import {addProductToCart} from "../http/cartApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ReviewList from "../Components/ReviewList";
import Rating from "../Components/Rating";
import {FcMoneyTransfer} from "react-icons/fc"


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
            const review = {product: id, user: user.user._id, rating: rating, text: comment}

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
        const [productRating, setProductRating] = useState(0)
        const handleRate = (value) => {
            setRating(value);
        };

        useEffect(() => {
            fetchOneProduct(id).then(date => {
                setProduct(date)


            })
        }, [])


        return (
            <Container>
                <Container className={"d-flex justify-content-center"}>

                    <Card
                        style={{width: '40vw', border: 'none', boxShadow: "0 4px 8px rgba(0,0,0,0.2)", marginTop: "20px"}}>
                        <Card.Img src={process.env.REACT_APP_API_URL + product.img}
                                  style={{width: '18vw', height: '18vw', alignSelf: "center", marginTop: "5vw",}}/>
                        <Card.Body>
                            <Card.Title className={"d-flex justify-content-center"}
                                        style={{fontSize: "7vw"}}> {product.title}</Card.Title>
                            <Card.Text className={"d-flex justify-content-center"} style={{fontSize: "3vw"}}>
                                {product.description}
                            </Card.Text>
                            <Container className={"d-flex justify-content-center"}>
                                <Rating rating={productRating} editable={false}></Rating>
                            </Container>
                            <Form className={"d-flex justify-content-center "}>
                                <Button size={"lg"} style={{background: "none", border: 'none'}}
                                        className={"mt-3 me-5 btn-info"} onClick={() => addToCart(product._id)}
                                > <img className={"d-flex m-auto"}
                                       src={require("../static/shopping_cart_1.png")} width={"30px"} alt={"basket"}/>
                                </Button>

                                <Button size={"lg"} style={{background: "none", border: 'none'}}
                                        className={"mt-3 btn-success"} onClick={() => {
                                    navigate(ORDER_ROUTE + '/' + 2)
                                }}><FcMoneyTransfer style={{fontSize: "30px"}}/></Button>
                            </Form>

                        </Card.Body>
                    </Card>


                </Container>
                <Container className={"justify-content-center"}>
                    <ReviewList product_id={id}/>



                    <Row className={"mt-3"}>
                        <Col  md={9} lg={9} sm={9} xs={9}>
                            <Form.Control
                                style = {{resize : "none"}}
                                as="textarea"
                                rows={3}
                                value={comment}
                                onChange={e => setComment(e.target.value)}
                                className={"mt-3"}
                                placeholder="Напишіть коментар"
                            />

                            <Rating size = {35} editable={true} onRate={setRating}> </Rating>
                        </Col>


                        <Col className = {"justify-content-start"} md={3} lg={3} sm={3}  xs={3}>
                            <Button size="lg" className={"mt-5 btn-success "} onClick={() => addReview()}
                            >Надіслати</Button>
                        </Col>

                    </Row>
                </Container>
            </Container>
        );
    }
)

export default ProductPage;