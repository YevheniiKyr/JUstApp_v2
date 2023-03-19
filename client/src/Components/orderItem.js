import React, {useEffect, useLayoutEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {fetchUser} from "../http/userApi";
import {Button, Card, InputGroup, ListGroup, ListGroupItem} from "react-bootstrap";
import Rating from "./Rating";
import styled from "styled-components";

const OrderItem = observer(({order}) => {




    let [orderUser, setOrderUser] = useState(null)

    useLayoutEffect(() => {
        console.log("USE EFFECT START")
        fetchUser(order.user).then(data => setOrderUser(data))}, [])


    return (
        <Card className={"mt-2"} style={{borderColor: 'darkgrey'}}>
            <ListGroup>
                <InputGroup>
                <ListGroupItem border="0">{2}</ListGroupItem>
                <ListGroupItem border="0"> 3000 </ListGroupItem>
                <ListGroupItem border="0"> {order.address.street + " " +  order.address.house_num }</ListGroupItem>
                <ListGroupItem border="0"> order.status </ListGroupItem>
                 <Button > Замовлення прийнято </Button>
                </InputGroup>

            </ListGroup>

        </Card>
        
    );
})

export default OrderItem;