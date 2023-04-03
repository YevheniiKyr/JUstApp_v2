import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container} from "react-bootstrap";
import {PRODUCT_ROUTE} from "../utils/constRoutes";
import {useNavigate} from "react-router-dom";

import {observer} from "mobx-react-lite";
import {fetchReviews} from "../http/productApi";
import Rating from "./Rating";
import {Context} from "../index";

const ProductItem = observer(({product}) => {


        const navigate = useNavigate()

        const [isHovered, setIsHovered] = useState(false);

        const [rating, setRating] = useState(0)
        const {reviewsContext, product: products} = useContext(Context)

        useEffect(() => {
            let rates = []
            let average = 0
            fetchReviews(product._id).then(data => {
                reviewsContext.setReviews(data)
            }).then(() => {

                    reviewsContext.reviews.map(rev => rates.push(rev.rating))
                rates.length === 0 ?

                    setRating(5)

                    :
                    average = rates.reduce((a, b) => a + b) / rates.length
                    setRating(average)

                }
            )
        }, [])

        return (
            <Col lg={3} md={4} sm={6} xs={12}
            >

                {

                    <Container className={products.limit === 2 && "d-flex m-auto justify-content-center" }>
                        <Card

                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() =>{
                                products.setCurrentRating(rating)
                                navigate(PRODUCT_ROUTE + '/' + product._id)
                            }
                            }
                            style={{


                                width: '14rem',
                                cursor: "pointer",
                                marginTop: "3rem",
                                border: 'none',
                                boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)  ' : 'none',
                                transform: isHovered ? 'scale(1.2)' : 'none',
                                transition: isHovered ? 'all 0.3s ease-in-out' : 'none',
                                zIndex: isHovered ? 1 : 0


                            }}>

                            <Card.Img variant="top" src={process.env.REACT_APP_API_URL + product.img}
                                      style={{width: '12rem', height: '10rem', alignSelf: "center", marginTop: "1rem"}}/>
                            <Card.Body>
                                <Card.Title className={"d-flex justify-content-center"}
                                            style={{fontSize: '2rem'}}> {product.title}</Card.Title>
                                <Card.Text className={"d-flex justify-content-center"} style={{fontSize: '1.2rem'}}>
                                    {product.description}
                                </Card.Text>
                                <Card.Text className={"d-flex justify-content-center"} style={{fontSize: '1.2rem'}}>
                                    {product.price}$
                                </Card.Text>
                                <Container className={"d-flex justify-content-center mb-3"}>
                                    <Rating rating={rating} product_id={product._id} editable={false}></Rating>
                                </Container>
                                <Button

                                    style={{
                                        width: '6rem',
                                        height: '2rem',
                                        fontSize: '1rem',
                                        justifyContent: "center",
                                        verticalAlign: "center"
                                    }}
                                    className={"d-flex m-auto btn-success"}
                                    onClick={() => {
                                        console.log("RATINGHERRRRRRRRRRRRRRRRRRRRRRRRRRRRRR " + rating)
                                        products.setCurrentRating(rating)
                                        navigate(PRODUCT_ROUTE + '/' + product._id)
                                        console.log(PRODUCT_ROUTE + '/' + product._id)
                                    }

                                    }>detail</Button>


                            </Card.Body>
                        </Card>
                    </Container>


                }
            </Col>
        );
    }
)

export default ProductItem;