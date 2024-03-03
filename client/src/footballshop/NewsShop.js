import { makeAutoObservable } from "mobx";

export default class NewsShop {
    constructor() {
        this._news = [
            
        ];
        this._clubs = [
        ];
        this._newsClubs = [

        ];
        makeAutoObservable(this);
    }

    setNews(news) {
       this._news = news
    }

    setClubs(clubs) {
        this._clubs = clubs
    }

    setNewsClubs(newsClub) {
        this._newsClubs = newsClub
    }

    get news () {
        return this._news
    }

    get clubs() {
        return this._clubs
    }

    get newsClubs() {
        return this._newsClubs
    }
}
