import {makeAutoObservable} from "mobx";
export default class ProductStore {

    constructor() {
        this._categories = [

        ]
        this._products = [

        ]
        makeAutoObservable(this, {deep: true})
    }

    setCategories(categories) {
        this._categories = categories
    }

    setProducts(products) {
        this._products = products
    }



    get products() {
        return this._products
    }
    get categories() {
        return this._categories
    }

}