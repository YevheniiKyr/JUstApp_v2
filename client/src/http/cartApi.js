import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const fetchBasket = async (user) => {
    const {data} = await $authHost.get('basket/', {
        params: {
            user: user
        }
    })
    console.log("BASKET DATA" + data)
    return data
}

export const fetchBasketById = async (basket_id) => {
    const {data} = await $authHost.get('basket/' + basket_id)

    console.log("BASKET DATA BY ID" + data)
    return data
}

export const addProductToCart = async (basket_id, product_id, amount) => {
    console.log("basket id " + basket_id)
    console.log("prod id " + product_id)

    const {data} = await $authHost.put('basket/' + basket_id, {
        product_id: product_id,
        amount: amount
    })

    console.log("BASKET DATA" + data)
    return data
}

export const deleteProductFromCartOne = async (basket_id, product_id) => {
    console.log(basket_id)
    const {data} = await $authHost.delete('basket/' + basket_id, {
        params: {
            product_id: product_id,
            amount: -1
        }
    })

    console.log("BASKET DATA" + data)
    return data
}

export const deleteProductFromCartAll = async (basket_id, product_id) => {
    console.log(basket_id)
    const {data} = await $authHost.put('basket/' + basket_id, {

        product_id: product_id,
        amount: "all"

    })

    console.log("BASKET DATA AFTER DELETE " + data.deletedFromBasket.toString())
    return data.deletedFromBasket
}

export const fetchProductsFromBasket = async (basket_id) => {
    const {data} = await $authHost.get('product/', {
        params: {
            basket_id: basket_id
        }
    })

    console.log("BASKET DATA BY ID" + data)
    return data
}


export const clearBasket = async (basket_id) => {
    const {data} = await $authHost.put(`basket/${basket_id}`, {

            product_id: "all"

    })

    console.log("BASKET DATA BY ID" + data)
    return data
}
