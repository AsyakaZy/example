import { makeAutoObservable } from "mobx";

export default class MatchShop {
    constructor() {
        this._matches = [
        ];

        this._clubGuests = [

        ];

        this._clubHomes = [

        ];

        this._clubs = [

        ];

        this._cities = [
        ];

        this._stadiums = [
        ];

        makeAutoObservable(this);
    }

    setMatches(matches) {
        this._matches = matches;
    }

    setClubGuests(clubGuests) {
        this._clubGuests = clubGuests;
    }

    setClubHomes(clubHomes) {
        this._clubHomes = clubHomes;
    }

    setClubs(clubs) {
        this._clubs = clubs;
    }

    setCities(cities) {
        this._cities = cities;
    }

    setStadiums(stadiums) {
        this._stadiums = stadiums;
    }

    get matches() {
        return this._matches;
    }

    get clubGuests() {
        return this._clubGuests;
    }

    get clubHomes() {
        return this._clubHomes;
    }

    get clubs() {
        return this._clubs;
    }

    get cities() {
        return this._cities;
    }

    get stadiums() {
        return this._stadiums;
    }
}
