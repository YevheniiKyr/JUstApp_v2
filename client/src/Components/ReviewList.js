import React, {useContext, useEffect, useState} from 'react';
import {Container, Form, Row} from "react-bootstrap";
import {Context} from "../index";

import {observer} from "mobx-react-lite";
import ReviewItem from "./ReviewItem";
import {fetchReviews} from "../http/productApi";

const ReviewList = observer(({product_id}) => {

        let [reviews, setReviews] = useState([])


        const {reviewsContext} = useContext(Context)
        useEffect(() => {
            console.log("STARTING USE EFFECT " + product_id)
            fetchReviews(product_id).then(data => {
                setReviews(data)
                reviewsContext.setReviews(data)
                console.log("REVIEWS " +reviewsContext.reviews)

            })
        }, [])

        return (
            <Container className={"mt-4"}>
                {reviewsContext.reviews.length === 0 ?
                   (<></>)
                    :
                    <Row className="d-flex m-auto">
                        {

                            reviewsContext.reviews.map(
                                review => <ReviewItem key={review._id} review={review}/>
                            )

                        }
                    </Row>
                }
            </Container>
        );
    }
)

export default ReviewList;