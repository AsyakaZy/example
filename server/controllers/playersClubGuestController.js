const uuid = require('uuid');
const path = require('path');
const { playerClubGuest } = require('../models/models');
const apiError = require('../error/apiError');

class StadiumController {
    async create(req, res, next) {
        try {
            const { playerId } = req.body;
            const PlayersClubGuest = await playerClubGuest.create({ playerId });
            return res.json(PlayersClubGuest);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const allPlayersClubGuest = await playerClubGuest.findAll();
            return res.json(allPlayersClubGuest);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const PlayerClubGuest = await playerClubGuest.findByPk(id);
            if (!PlayerClubGuest) {
                throw apiError.notFound('PlayerClubGuest not found');
            }
            return res.json(PlayerClubGuest);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { playerId } = req.body;
            const updatedPlayerClubGuest = await playerClubGuest.update({ playerId }, {
                where: { id },
                returning: true,
                plain: true
            });
            return res.json(updatedPlayerClubGuest[1]);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedPlayerClubGuest = await playerClubGuest.destroy({ where: { id } });
            if (!deletedPlayerClubGuest) {
                throw apiError.notFound('PlayerClubGuest not found');
            }
            return res.json({ message: 'PlayerClubGuest deleted successfully' });
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }
}

module.exports = new StadiumController();
