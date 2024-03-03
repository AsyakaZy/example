const uuid = require('uuid');
const path = require('path');
const { player } = require('../models/models');
const apiError = require('../error/apiError');

class StadiumController {
    async create(req, res, next) {
        try {
            const { namePlayer, clubId } = req.body;
            const { photoPlayer } = req.files;
            let fileName = uuid.v4() + ".jpg";
            photoPlayer.mv(path.resolve(__dirname, '..', 'static', fileName));
            const Players = await player.create({ namePlayer, clubId, photoPlayer: fileName });
            return res.json(Players);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const allPlayers = await player.findAll();
            return res.json(allPlayers);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const Player = await player.findByPk(id);
            if (!Player) {
                throw apiError.notFound('Player not found');
            }
            return res.json(Player);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { namePlayer, clubId } = req.body;
            const updatedPlayer = await player.update({ namePlayer, clubId }, {
                where: { id },
                returning: true,
                plain: true
            });
            return res.json(updatedPlayer[1]);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deletedPlayer = await player.destroy({ where: { id } });
            if (!deletedPlayer) {
                throw apiError.notFound('Player not found');
            }
            return res.json({ message: 'Player deleted successfully' });
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }
}

module.exports = new StadiumController();
