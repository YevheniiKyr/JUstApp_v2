import React, {useEffect, useState} from 'react';
import {FaStar} from 'react-icons/fa';
import {Container} from "react-bootstrap";
import {fetchReviews} from "../http/productApi";

function Rating({rating, onRate, editable, product_id, size}) {

    const [hoverRating, setHoverRating] = useState(0);
    const [ratingEdit, setRatingEdit] = useState(rating);
    const [color, setColor] = useState("")
    const handleMouseEnter = (value) => {
        setHoverRating(value);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleClick = (value) => {
        console.log("STARS " + value)
        onRate(value);
        setRatingEdit(value)

    };

    const stars = [1, 2, 3, 4, 5]

    useEffect(() => {
        if (product_id) {
            let rates = []
            let average = 0
            fetchReviews(product_id).then(data => {
                    if (data.length === 0) {
                        setColor("green")
                        setRatingEdit(5)
                    } else {
                        data.map(rev => rates.push(rev.rating))
                        average = rates.reduce((a, b) => a + b) / rates.length
                        setRatingEdit(average)
                    }
                }
            )
        }
    }, [])

    return (
        editable ?
            (
                <Container className={"mb-1 mt-2 d-flex justify-content-center"}>
                    {
                        stars.map(star => {
                            return (
                                <span
                                    key={star}
                                    onMouseEnter={() => handleMouseEnter(star)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleClick(star)}
                                >
                      <FaStar
                          color={(star <= ratingEdit) || star <= hoverRating ? '#ffc107' : '#e4e5e9'}
                          size={size || 25}
                          style={{marginRight: 10, cursor: 'pointer'}}
                      />
          </span>
                            )
                        })
                    }
                </Container>
            )
            :
            (
                stars.map(star => {
                        return (

                            <FaStar
                                color={(star <= (ratingEdit)) ? (color? color : '#ffc107' ) : '#e4e5e9'}
                                size={size || 25}
                                style={{marginRight: 10, cursor: 'pointer'}}
                            />
                        )
                    }
                )))


}

export default Rating;
