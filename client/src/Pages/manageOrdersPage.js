import React, {useEffect, useState} from 'react';
import {fetchOneProduct} from "../http/productApi";
import {fetchOrders} from "../http/orderApi";
import OrderList from "../Components/orderList";
import {fetchUsersArray} from "../http/userApi";

const ManageOrdersPage = () => {

    let [orders,setOrders] = useState([])
    let [orderUsers, setOrderUsers] = useState([])

    useEffect(() => {
        fetchOrders().then(data => {
            setOrders(data)
            let ids = []

            data.map(ord => ids.push(ord.user))


            if (ids.length > 0) {
                console.log("IDS > 0" + ids)
                fetchUsersArray(ids).then(data => {

                    setOrderUsers(data)
                })
            } else {
                console.log("IDS = 0" + ids)
            }
        })


    }, [])

    return (
        <OrderList ordersToList = {orders} users = {orderUsers}></OrderList>
    );
};

export default ManageOrdersPage;