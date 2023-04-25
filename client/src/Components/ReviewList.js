import React, {useContext, useEffect, useState} from 'react';
import {Container, Form, Row} from "react-bootstrap";
import {Context} from "../index";

import {observer} from "mobx-react-lite";
import ReviewItem from "./ReviewItem";
import {fetchReviews} from "../http/productApi";

const ReviewList = observer(({product_id}) => {

       // let [reviews, setReviews] = useState([])
        let [loading, setLoading] = useState(true); // Add a loading state


        const {reviewsContext} = useContext(Context)
        useEffect(() => {
            fetchReviews(product_id).then(data => {
               // setReviews(data)
                reviewsContext.setReviews(data)
                setLoading(false);

            })
        }, [])

        return (
            <Container className={"mt-4"}>
                {loading ? ( // Display loading state if loading is true
                    <div>Loading reviews...</div>
                ) : reviewsContext.reviews.length === 0 ? (
                    <div>No reviews found.</div>
                ) : (
                    <Row className="d-flex m-auto">
                        {reviewsContext.reviews.map((review) => (
                            <ReviewItem key={review._id} review={review}/>
                        ))}
                    </Row>
                )}
            </Container>
        );
    }
)

export default ReviewList;