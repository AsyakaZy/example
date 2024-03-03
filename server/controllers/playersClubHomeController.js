const uuid = require('uuid');
const path = require('path');
const { playerClubHome } = require('../models/models');
const apiError = require('../error/apiError');

class StadiumController {
    async create(req, res, next) {
        try {
            const { playersId } = req.body;
            const PlayersClubHome = await playerClubHome.create({ playersId });
            return res.json(PlayersClubHome);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const allPlayersClubHome = await playerClubHome.findAll();
            return res.json(allPlayersClubHome);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const PlayerClubHome = await playerClubHome.findByPk(id);
            if (!PlayerClubHome) {
                throw apiError.notFound('PlayerClubHome not found');
            }
            return res.json(PlayerClubHome);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { playerId } = req.body;
            const updatedPlayerClubHome = await playerClubHome.update({ playerId }, {
                where: { id },
                returning: true,
                plain: true
            });
            return res.json(updatedPlayerClubHome[1]);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedPlayerClubHome = await playerClubHome.destroy({ where: { id } });
            if (!deletedPlayerClubHome) {
                throw apiError.notFound('PlayerClubHome not found');
            }
            return res.json({ message: 'PlayerClubHome deleted successfully' });
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }
}

module.exports = new StadiumController();
