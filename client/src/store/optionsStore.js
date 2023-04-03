
import {makeAutoObservable} from "mobx";


export default class OptionsStore {
    get path() {
        return this._path;
    }

    setPath(value) {
        this._path = value;
    }
    get size() {
        return this._size;
    }

    setSize(value) {
        this._size = value;
    }

    constructor() {

        this._size = ''
        this._path = ''
        makeAutoObservable(this)
    }




}