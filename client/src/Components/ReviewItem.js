import React, {useContext, useEffect, useState} from 'react';
import {deleteReview, updateReview} from "../http/productApi";
import {fetchUser} from "../http/userApi";
import {Button, Card, Col, Container, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Rating from "./Rating";
import {MdEdit} from "react-icons/md"
import {AiTwotoneDelete} from "react-icons/ai"

const ReviewItem = observer(({review}) => {

    const {user, reviewsContext} = useContext(Context)
    let [userComment, setUserComment] = useState({})

    useEffect(() => {

            fetchUser(review.user).then(data => setUserComment(data)).then(() => {
             //   console.log(user?.user?._id + " " + userComment._id)
            })

    }, [])


    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(review.text);
    const [editRating, setEditRating] = useState(review.rating);
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false)
        setEditText(review.text)
        setEditRating(review.rating)
    };

    const handleSave = () => {
        setIsEditing(false);
        review.rating = editRating
        review.text = editText
        console.log(review._id)
        updateReview(review).then(() => {


        })
    };

    const handleDelete = () => {
        deleteReview(review._id).then(data => {
            console.log(data)
            let newReviewContext = [...reviewsContext.reviews].filter(rev => rev._id !== review._id)
            reviewsContext.setReviews(newReviewContext)
        })
    };
    return (/*
        <Card style={{border: 'none', boxShadow: "0 4px 8px rgba(0,0,0,0.2)"}}>*/
        <Container>
            {isEditing ? (
                <Card.Body style={{marginTop: '2rem', background: '#F5F5F5'}}>
                    <Form>

                        <Form.Label style={{fontSize: '1.5rem'}}>Відредагуйте коментар</Form.Label>

                        <Form.Group controlId="editContent">
                            <Form.Label>Коментар</Form.Label>
                            <Form.Control
                                as="textarea"
                                style={{resize: "none"}}
                                rows={3}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="editContent">
                            <Row>
                                <Col xs={{span:2,offset:2}} md={{span:2,offset:2}} lg={{span:2,offset:2}}>
                                    <Form.Label style = {{fontSize: '1.2rem'}} className={"mt-2 justify-content-end"}>Оцінка: </Form.Label>
                                </Col>
                                <Col xs={{span:6,offset:0}} md={{span:6,offset:0}} lg={{span:6,offset:0}}>
                                    <Rating size = {30} rating={review.rating} editable={true} onRate={setEditRating}></Rating>
                                </Col>
                            </Row>

                        </Form.Group>

                        <Container className={"d-flex justify-content-center"}>
                        <Button className={"me-4"} variant="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                        </Container>
                    </Form>
                </Card.Body>

            ) : (
                <Card.Body>

                    <ListGroup>
                        <ListGroupItem border="0">
                            <Row>
                                <Col xs={8} md={8} lg={8}>
                                    <Container>{userComment.email}</Container>
                                </Col>
                                <Col xs={4} md={4} lg={4}>

                                        {
                                            user.isAuth && user?.user?._id === userComment._id ?

                                                <Container className={"d-flex"}>
                                                    <Button
                                                        className={"me-2"}
                                                        onClick={handleEdit}
                                                        size="md"> <MdEdit/>
                                                    </Button>
                                                    <Button
                                                        onClick={handleDelete}
                                                        variant="danger">
                                                        <AiTwotoneDelete/>
                                                    </Button>
                                                </Container>

                                                :

                                                <></>


                                        }

                                </Col>
                            </Row>

                        </ListGroupItem>
                        <ListGroupItem border="0">{review.text}</ListGroupItem>
                        <ListGroupItem className={"d-flex justify-content-center"}>
                            <Rating rating={review.rating} editable={false}></Rating>

                        </ListGroupItem>


                    </ListGroup>

                </Card.Body>

            )}
        </Container>
        /* </Card>*/
    );

})

export default ReviewItem;