import { makeAutoObservable } from "mobx";

export default class PosterShop {
    constructor() {
        this._posters = [

        ];

        this._players = [

        ];

        this._playersClubGuest = [

        ];

        this._playersClubHome = [

        ];

        this._clubsGuest = [

        ];

        this._clubsHome = [

        ];

        this._clubs = [

        ];

        this._cities = [

        ];

        this._stadiums = [

        ];

        makeAutoObservable(this);
    }

    setPosters(posters) {
        this._posters = posters;
    }

    setPlayers(players) {
        this._players = players;
    }

    setPlayersClubGuest(playersClubGuest) {
        this._playersClubGuest = playersClubGuest;
    }

    setPlayersClubHome(playersClubHome) {
        this._playersClubHome = playersClubHome;
    }

    setClubsGuest(clubsGuest) {
        this._clubsGuest = clubsGuest;
    }

    setClubsHome(clubsHome) {
        this._clubsHome = clubsHome;
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

    get posters() {
        return this._posters;
    }

    get players() {
        return this._players;
    }

    get playersClubGuest() {
        return this._playersClubGuest;
    }

    get playersClubHome() {
        return this._playersClubHome;
    }

    get clubsGuest() {
        return this._clubsGuest;
    }

    get clubsHome() {
        return this._clubsHome;
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

