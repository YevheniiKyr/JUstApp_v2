import {makeAutoObservable} from "mobx";

export default class ProductStore {
    get currentRating() {
        return this._currentRating;
    }

    setCurrentRating(value) {
        this._currentRating = value;
    }

    constructor() {
        this._categories = []
        this._products = []
        this._currentCategory = null
        this._currentSearch = null
        this._page = 1
        this._totalCount = 0
        this._limit = 6
        this._currentRating = 0
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