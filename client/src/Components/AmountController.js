import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, Form, Row} from "react-bootstrap";

const AmountController = observer(({amount, setAmount}) => {
    const [currentAmount, setCurrentAmount] = useState(amount || 1); // Initialize amount with the value from props or 0

    const increment = () => {

        setCurrentAmount(currentAmount + 1);
        setAmount(currentAmount + 1)
    }

    const decrement = () => {
        if (currentAmount > 1) { // Ensure amount doesn't go negative
            setCurrentAmount(currentAmount - 1);
            setAmount(currentAmount - 1)
        }
    }

    return (
        <Container className={"d-flex justify-content-center"}>
            <Form className={"d-flex"}>
                <Button onClick={decrement}
                        className={"btn-outline-info d-flex"}
                        style={{
                            width: "30px",
                            height: "30px",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "16px"
                        }}>-</Button>
                <Container>{currentAmount}</Container>
                <Button onClick={increment}
                        className={"btn-outline-info d-flex"}
                        style={{
                            width: "30px",
                            height: "30px",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "16px"
                        }}>+</Button>

            </Form>
        </Container>
    );
})

export default AmountController;