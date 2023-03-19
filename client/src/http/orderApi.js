import {$authHost} from "./index";

export const fetchOrder = async (id) => {
    const {data} = await $authHost.get('order/' + id)
    console.log("BASKET DATA" + data)
    return data
}

export const createOrder = async (order) => {
    const {data} = await $authHost.post('order/', {order})
    console.log("ORDER CREATED HERE " + data)
    return data

}
export const fetchOrders = async () => {
    const {data} = await $authHost.get('order/' )
    console.log("RETURN ORDERS " + data)
    return data
}

export const updateOrderStatus = async (order) => {
    const {data} = await $authHost.put('order/' + order._id, order)
   // console.log("ORDER CREATED HERE " + data)
    return data

}