import {$authHost} from "./index";

export const fetchUser = async(id) => {
    console.log("We are fetching user by id " + id)
    const {data} = await $authHost.get('user/' + id)
    console.log("USER " + data)
    return data

}
export const fetchUsersArray = async(id) => {
    console.log("FETCH USERS ARRAY")
    const {data} = await $authHost.get('user/', {
        params: {
            id: id,
        }
})
    console.log(data)
    return data
}