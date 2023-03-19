import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import productList from "../Components/ProductList";

export const createCategory = async (category) => {
    const {data} = await $authHost.post('category/', {
        name: category
    })
    return data
}

export const fetchCategories = async () => {

    const {data} = await $host.get('category/',
    )
    return data

}


export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('product/' + id)
    return data
}

export const fetchProducts = async (cat) => {

    const {data} = await $host.get('product/', {
        params: {
            category: cat

        }
    })


    return data
}
export const fetchProductsArray = async (id) => {

    console.log(id)
    const {data} = await $authHost.get('product/', {
        params: {
            id: id,
        }
    })
    console.log("IT NEED TO BE ID" + data)
    console.log("BASKET DATA" + data)
    return data
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('product/',
        product
    )
    return data
}

export const fetchReviews = async (product_id) => {
    console.log("fetchReviews for product " + product_id )
    const {data} = await $authHost.get('review/', {
        params: {
            product_id: product_id
        }
    })
    console.log("REVIEWS " + data)
    return data
        }

export const addReviewToProduct  = async (review) => {
    const {data} = await $authHost.post('review/',
        review
    )
    return data
}
export const updateReview = async (review) => {
    const {data} = await $authHost.put('review/' + review._id,
         review

    )
    return data
}

export const deleteReview = async (id) => {
    const {data} = await $authHost.delete('review/' + id
    )
    return data
}

