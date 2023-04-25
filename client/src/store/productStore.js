import {makeAutoObservable} from "mobx";
import {ALPHABET_ORDER} from "../utils/consts";

export default class ProductStore {


    //convert const hash to array
    get alphabetOrders() {
        const alphabetOrderArray = Object.entries(ALPHABET_ORDER);
        return alphabetOrderArray;
    }


    get currentAlphabetOrder() {
        return this._currentAlphabetOrder;
    }

    setCurrentAlphabetOrder(value) {
        if(value !== "ASCENT" && value !== "DESCENT" && value !==  null) return
        this._currentAlphabetOrder = value;
    }
    get currentPrice() {
        return this._currentPrice;
    }

    setCurrentPrice(value) {
        this._currentPrice = value;
    }

    get currentProduct() {
        return this._currentProduct;
    }

    setCurrentProduct(value) {
        this._currentProduct = value;
    }

    get currentRating() {
        return this._currentRating;
    }

    setCurrentRating(value) {
        this._currentRating = value;
    }



    constructor() {
        this._alphabetOrders = []
        this._currentAlphabetOrder = null
        this._categories = []
        this._products = []
        this._currentCategory = null
        this._currentSearch = ''
        this._page = 1
        this._totalCount = 0
        this._limit = 6
        this._currentRating = 0
        this._currentProduct = null
        this._currentPrice = null
        makeAutoObservable(this, {deep: true})
    }

    setCategories(categories) {
        this._categories = categories
    }

    setProducts(products) {
        this._products = products
    }

    setCurrentCategory(category) {
        this._currentCategory = category
    }

    setCurrentSearch(search) {
        this._currentSearch = search
    }

    get currentSearch() {
        return this._currentSearch
    }

    get currentCategory() {
        return this._currentCategory
    }

    get products() {
        return this._products
    }

    get categories() {
        return this._categories
    }

    get prices() {
        return [{
            min: 0,
            max: 2000
            },
            {
                min: 2000,
                max: 4000
            },
            {
                min: 4000,
                max: 8000
            },
            {
                min: 8000,
                max: 16000
            },
            {
                min: 16000,
                max: 32000
            },
            {
                min: 32000,
                max: 64000
            }]
    }


    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setLimit(limit) {
        this._limit = limit
    }

    get totalCount() {
        return this._totalCount
    }

    get page() {
        return this._page
    }

    get limit() {
        return this._limit
    }

}