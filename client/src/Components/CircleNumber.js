import React, {useState} from 'react';
import '../styles/CircleNumber.css';
import AmountController from "./AmountController";
import {Container} from "react-bootstrap";
import ChangeAmountModal from "./modals/ChangeAmountModal";
import {observer} from "mobx-react-lite"; // Import the CSS file with the styles for the CircleNumber component


const CircleNumber = observer (({number}) => {



    return (
        <Container>
        <div
            style={{fontSize: "1rem", display:"flex", margin: "auto"}} className={"circle"} >{number}</div>

        </Container>
    );
}
)

export default CircleNumber;