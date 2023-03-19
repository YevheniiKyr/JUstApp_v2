import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {Button, Container, Form, Row, Table} from "react-bootstrap";
import {Context} from "../index";

import {observer} from "mobx-react-lite";
import ReviewItem from "./ReviewItem";
import {fetchProductsArray, fetchReviews} from "../http/productApi";
import {fetchOrders, updateOrderStatus} from "../http/orderApi";
import OrderItem from "./orderItem";
import styled from "styled-components";
import {fetchUser, fetchUsersArray} from "../http/userApi";

const OrderList = observer(({ordersToList,users}) => {

        let [orders, setOrders] = useState(ordersToList)
        let [orderUsers, setOrderUsers] = useState(users)

       useEffect(() => {
        console.log("ORDERS " + ordersToList)
        }, [])


       /* const [buttonStates, setButtonStates] = useState(
            Array(orders.length).fill({clicked: false})
        );*/


        const changeStatus = (order, index) => {
            //  const newButtonStates = [...buttonStates];
            // newButtonStates[index] = { clicked: true };
            // setButtonStates(newButtonStates);


            order.status === "accepted" ? order.status = "pending" : order.status = "accepted"

            console.log("AFTER CHANGE " + orders[index].status)
            const newArray = [...orders];
            newArray[index] = order
            setOrders(newArray)
            updateOrderStatus(newArray).then(data =>
                console.log(data)
            )

        }


        const Myth = styled.th`
          vertical-align: middle;
          text-align: center;
          font-size: 24px;
        `

        const Mytd

            = styled.td`
          vertical-align: middle;
          text-align: center;
          font-size: 18px;

        `


        return (
            <Container>
                <h2 style={{textAlign: "center", marginTop: 30}}>ALL ORDERS</h2>
                <Table striped bordered hover size="sm" className={"mt-5"}>
                    <thead>
                    <tr>

                        <Myth></Myth>
                        <Myth>User</Myth>
                        <Myth>Address</Myth>
                        <Myth>Total</Myth>
                        <Myth>Status</Myth>
                    </tr>
                    </thead>
                    <tbody>

                    {


                        orders.map(
                            (order, idx) => (
                                <tr key={order._id}>

                                    <Mytd> {idx + 1}</Mytd>
                                    <Mytd style={{verticalAlign: "middle", textAlign: "center"}}>
                                        {  orderUsers[0].email/*(orderUsers.find(user => user._id === order.user)).email*/}
                                    </Mytd>
                                    <Mytd style={{verticalAlign: "middle", textAlign: "center"}}>
                                        {order.address.street + " " + order.address.house_num} </Mytd>
                                    <Mytd> {order.total || 1000}</Mytd>
                                    <Mytd>
                                        {order.status}
                                        <Button
                                            variant={order.status === "accepted" ? "success" : "primary"}
                                            onClick={() => changeStatus(order, idx)} className={"ms-4"}
                                            size={"sm"}> {order.status === "accepted" ? "Скасувати" : "Прийняти"} </Button>
                                    </Mytd>

                                </tr>
                            )
                        )


                    }
                    </tbody>

                </Table>
            </Container>
        );
    }
)

export default OrderList;