import React, {useContext, useEffect, useState} from 'react';
import {deleteReview, fetchReviews, updateReview} from "../http/productApi";
import {fetchUser} from "../http/userApi";
import {Button, Card, Form, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Rating from "./Rating";

const ReviewItem = observer(({review}) => {

    const {user, reviewsContext} = useContext(Context)
    let [userComment, setUserComment] = useState([])

    useEffect(() => {
        fetchUser(review.user).then(data => setUserComment(data)).then(data => {
            console.log(user.user.id + " " + userComment._id)
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
        updateReview(review).then(data => {
            console.log(data)
            window.location.reload()
        })
    };

    const handleDelete = () => {
        deleteReview(review._id).then(data => {
            console.log(data)
            let newReviewContext = [...reviewsContext.reviews].filter(rev => rev._id !== review._id)
            reviewsContext.setReviews(newReviewContext)
            //window.location.reload()
        })
    };
    return (
        <Card>
            <Card.Body>
                {isEditing ? (
                    <Form>

                       <Form.Label>{userComment.email}</Form.Label>

                        <Form.Group controlId="editContent">
                            <Form.Label>Comment text</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="editContent">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={editRating}
                                onChange={(e) => setEditRating(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form>
                ) : (
                    <Card className={"mt-2"} style={{borderColor: 'darkgrey'}}>
                        <Card.Header border="0">{userComment.email}</Card.Header>
                        <ListGroup>
                            <ListGroupItem border="0">{review.text}</ListGroupItem>
                            <ListGroupItem border="0">
                                <Rating rating={review.rating} editable={false} ></Rating>

                            </ListGroupItem>
                            {
                                user.user.id === userComment._id ?
                                    <ListGroupItem>
                                        <Button
                                            onClick={handleEdit}
                                            size="md"> Edit </Button>
                                        <Button
                                            onClick={handleDelete}
                                            variant="danger">
                                            Delete
                                        </Button>
                                    </ListGroupItem>
                                    :
                                    <></>
                            }


                        </ListGroup>

                    </Card>

                )}
            </Card.Body>
        </Card>
    );

})

export default ReviewItem;