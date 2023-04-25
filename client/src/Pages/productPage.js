import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {ORDER_ROUTE} from "../utils/constRoutes";
import {useNavigate, useParams} from "react-router-dom";
import {addReviewToProduct, fetchOneProduct, fetchReviews} from "../http/productApi";
import styled from "styled-components";
import {addProductToCart} from "../http/cartApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ReviewList from "../Components/ReviewList";
import Rating from "../Components/Rating";
import {FcMoneyTransfer} from "react-icons/fc"
import AuthorizeFirstModal from "../Components/modals/AuthorizeFirstModal";
import RatingAlt from "../Components/RatingAlt";


const MyButton = styled.button`

  font-size: 18px;
`
const ProductPage = observer(() => {

        const {id} = useParams()
        const navigate = useNavigate()
        const {user, basket} = useContext(Context)
        const {reviewsContext, product: products} = useContext(Context)

        const [authorizeVisible, setAuthorizeVisible] = useState(false)
        const [loading, setLoading] = useState(true)


        const addToCart = (product_id) => {
            addProductToCart(basket.basket._id, product_id, 1).then(data =>
                console.log(data)
            )
        }

        const addReview = () => {
            const review = {product: id, user: user.user._id, rating: rating, text: comment}

            addReviewToProduct(review).then(data => {
                console.log(data)
                let newReviews = [...reviewsContext.reviews]
                newReviews.push(data)
                reviewsContext.setReviews(newReviews)
                console.log("RATING " + rating)
                setComment('')
                setRating(0)
                fetchOneProduct(id).then(data => {
                        // setProduct(date)
                        products.setCurrentProduct(data)

                    }
                )


            })
        }

        const [product, setProduct] = useState({})
        const [comment, setComment] = useState('')


        useEffect(() => {
            fetchOneProduct(id).then(data => {
                products.setCurrentProduct(data)
                setLoading(false)
                // setProduct(date)
                // console.log(date)
                // console.log("AVERAGE " + date.averageRating)
            })

        }, [])

        const [rating, setRating] = useState(product.averageRating);


        return (
            <Container>
                {
                    loading ?
                        <Container>LOADING</Container>
                        :
                        <Container>

                            <Container className={"d-flex justify-content-center"}>

                                <Card
                                    style={{
                                        width: '40vw',
                                        border: 'none',
                                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                                        marginTop: "20px"
                                    }}>
                                    <Card.Img src={process.env.REACT_APP_API_URL + products.currentProduct.img}
                                              style={{
                                                  width: '20vw',
                                                  height: '20vw',
                                                  alignSelf: "center",
                                                  marginTop: "5vw",
                                              }}/>
                                    <Card.Body>
                                        <Card.Title className={"d-flex justify-content-center"}
                                                    style={{fontSize: "5vw"}}> {products.currentProduct.title}</Card.Title>
                                        <Card.Text className={"d-flex justify-content-center"} style={{fontSize: "3vw"}}>
                                            {products.currentProduct.description}
                                        </Card.Text>
                                        <Container className={"d-flex justify-content-center"}>
                                            <RatingAlt rating={products.currentProduct.averageRating}
                                                       readOnly={true}></RatingAlt>
                                        </Container>
                                        <Form className={"d-flex justify-content-center "}>
                                            <Button size={"lg"} //style={{background: "none", border: 'none'}}
                                                    className={"mt-3 me-5 btn-info"}
                                                    onClick={
                                                        user.isAuth ?
                                                            () => addToCart(product._id)
                                                            :
                                                            () => setAuthorizeVisible(true)

                                                    }>
                                                {/*> <img className={"d-flex m-auto"}*/}
                                                {/*       src={require("../static/shopping_cart_1.png")} width={"30px"} alt={"basket"}/>*/}
                                                Add to cart
                                            </Button>

                                            <Button size={"lg"}
                                                // style={{background: "none", border: 'none'}}
                                                    className={"mt-3 btn-success"}
                                                    onClick={
                                                        user.isAuth ?
                                                            () => {
                                                                console.log("AUTH")
                                                                navigate(ORDER_ROUTE + '/' + 2)
                                                            }
                                                            :
                                                            () => setAuthorizeVisible(true)

                                                    }

                                            >
                                                Buy
                                                {/*<FcMoneyTransfer style={{fontSize: "30px"}}/>*/}
                                            </Button>
                                        </Form>

                                    </Card.Body>
                                </Card>
                                <AuthorizeFirstModal show={authorizeVisible} onHide={() => setAuthorizeVisible(false)}/>

                            </Container>
                            <Container className={"justify-content-center"}>
                                <ReviewList product_id={id}/>


                                <Row className={"mt-4 ms-3"}>
                                    <Col md={9} lg={9} sm={9} xs={9}>
                                        <Form.Control
                                            style={{resize: "none"}}
                                            as="textarea"
                                            rows={3}
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                            className={"mt-3"}
                                            placeholder="Напишіть коментар"
                                        />


                                    </Col>


                                    <Col className={"justify-content-start"} md={3} lg={3} sm={3} xs={3}>
                                        <Button size="md" className={"mt-5 btn-success "}
                                                onClick={
                                                    user.isAuth ?
                                                        () => addReview()
                                                        :
                                                        () => setAuthorizeVisible(true)}
                                        >Надіслати</Button>
                                    </Col>
                                    <Container className={"d-flex justify-content-center"}>
                                        <RatingAlt
                                            rating={rating} size={35} readOnly={false}
                                            onRate={setRating}> </RatingAlt>
                                    </Container>
                                </Row>

                            </Container>

                        </Container>
                }
            </Container>

        );

    }
)

export default ProductPage;