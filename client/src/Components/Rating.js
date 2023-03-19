import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';
import {Container} from "react-bootstrap";

function Rating({rating, onRate, editable}) {

    const [hoverRating, setHoverRating] = useState(0);
    const [ratingEdit, setRatingEdit] = useState(rating);
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


    return (
        editable ?
            (
                <Container className={"mb-3 d-flex justify-content-center"}>
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
                          color={ (star <= ratingEdit) || star<=hoverRating ? '#ffc107' : '#e4e5e9'}
                          size={25}
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
                                color={star <= (ratingEdit) ? '#ffc107' : '#e4e5e9'}
                                size={25}
                                style={{marginRight: 10, cursor: 'pointer'}}
                            />
                        )
                    }
                )))


}

export default Rating;
