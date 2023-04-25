import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {

    console.log("HERE " + $host.getUri())
    const {data} = await $host.post('auth/signup', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    console.log("Token " + data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    try {
        const {data} = await $host.post('auth/signin', {email, password})
        console.log("ANSWER" + data.token)
        localStorage.setItem('token', data.token)
        console.log("ANSWER DECODE" + jwt_decode(data.token))
        return jwt_decode(data.token)
    } catch (error) {
        // Handle the error here
        console.error(error);
        throw new Error("Failed to login"); // Optionally, you can throw a custom error message
    }
}

export const check = async () => {
    const {data} = await $authHost.get('auth/check')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

