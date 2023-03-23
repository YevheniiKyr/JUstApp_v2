import React, { useEffect, useState} from 'react';
import {Button, Container, Table} from "react-bootstrap";

import {observer} from "mobx-react-lite";
import {fetchOrders, updateOrderStatus} from "../http/orderApi";
import styled from "styled-components";
import {fetchUsersArray} from "../http/userApi";

const OrderList = observer(() => {

        let [orders, setOrders] = useState([])
        let [orderUsers, setOrderUsers] = useState([])

    useEffect(() => {

        fetchOrders().then(data => {

            orders = data
            let ids = []
            data.map(ord => ids.push(ord.user))

            if (ids.length > 0) {
                console.log("IDS > 0" + ids)
                fetchUsersArray(ids).then(data => {

                    setOrderUsers(data)
                    setOrders(orders)
                })
            } else {
                console.log("IDS = 0" + ids)
            }
        })


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
                                        { orderUsers[0].email/*(orderUsers.find(user => user._id === order.user)).email*/}
                                    </Mytd>
                                    <Mytd style={{verticalAlign: "middle", textAlign: "center"}}>
                                        {order.address.street + " " + order.address.house_num} </Mytd>
                                    <Mytd> {order.total || 1000}</Mytd>
                                    <Mytd>
                                        {order.status}
                                        <Button
                                            variant={order.status === "accepted" ?  "danger": "success"}
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