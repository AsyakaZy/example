const uuid = require('uuid');
const path = require('path');
const { poster, clubGuest, clubHome, club, playerClubHome, playerClubGuest, player, stadiums } = require('../models/models');
const apiError = require('../error/apiError');

class PosterController {
    async create(req, res, next) {
        try {
            const { clubHomeId, clubGuestId, playerClubHomeId, playerClubGuestId, quote, stadiumId, date, time } = req.body;
            const Poster = await poster.create({ clubHomeId, clubGuestId, playerClubHomeId, playerClubGuestId, quote, stadiumId, date, time });
            return res.json(Poster);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const posters = await poster.findAll({
                include: [
                    {
                        model: clubHome,
                        as: 'clubHome',
                        attributes: ['clubId'],
                        include: [
                            {
                                model: club,
                                as: 'club',
                            },
                        ]
                    },
                    {
                        model: clubGuest,
                        as: 'clubGuest',
                        attributes: ['clubId'],
                        include: [
                            {
                                model: club,
                                as: 'club',
                            },
                        ]
                    },
                    {
                        model: playerClubHome,
                        as: 'playerClubHome',
                        attributes: ['playerId'],
                        include: [
                            {
                                model: player,
                                as: 'player',
                            },
                        ]
                    },
                    {
                        model: playerClubGuest,
                        as: 'playerClubGuest',
                        attributes: ['playerId'],
                        include: [
                            {
                                model: player,
                                as: 'player',
                            },
                        ]
                    },
                    {
                        model: stadiums,
                        as: 'stadium'
                    }
                ]
            });
            return res.json(posters);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const Poster = await poster.findByPk(id);
            if (!Poster) {
                throw apiError.notFound('Poster not found');
            }
            return res.json(Poster);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { clubHomeId, clubGuestId, playerClubHomeId, playerClubGuestId, quote, stadiumId, date, time } = req.body;
            const updatedPoster = await poster.update({ clubHomeId, clubGuestId, playerClubHomeId, playerClubGuestId, quote, stadiumId, date, time }, {
                where: { id },
                returning: true,
                plain: true
            });
            return res.json(updatedPoster[1]);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedPoster = await poster.destroy({ where: { id } });
            if (!deletedPoster) {
                throw apiError.notFound('Poster not found');
            }
            return res.json({ message: 'Poster deleted successfully' });
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }
}

module.exports = new PosterController();
