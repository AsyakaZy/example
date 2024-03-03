const uuid = require('uuid')
const path = require('path');
const { clubHome } = require('../models/models')
const apiError = require('../error/apiError');

class ClubHomeController {
    async create(req, res, next) {
        try {
            const { clubId } = req.body
            const ClubHome = await clubHome.create({ clubId })
            return res.json(ClubHome)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const clubHomes = await clubHome.findAll(); // Получаем все записи из модели clubHome
            return res.json(clubHomes); // Возвращаем записи в ответе
        } catch (e) {
            next(apiError.internalServerError(e.message)); // Если произошла ошибка, передаем ее в middleware для обработки
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Получаем идентификатор дома клуба из параметров запроса
            const ClubHome = await clubHome.findByPk(id); // Ищем дом клуба по идентификатору
            if (!ClubHome) { // Если дом клуба не найден, возвращаем ошибку
                throw apiError.notFound('Club home not found');
            }
            return res.json(ClubHome); // Возвращаем найденный дом клуба
        } catch (e) {
            next(apiError.internalServerError(e.message)); // Если произошла ошибка, передаем ее в middleware для обработки
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { clubId } = req.body;
            const [updated] = await clubHome.update({ clubId }, { where: { id } });
            if (!updated) {
                throw apiError.notFound('Club home not found');
            }
            const updatedClubHome = await clubHome.findByPk(id);
            return res.json(updatedClubHome);
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await clubHome.destroy({ where: { id } });
            if (!deleted) {
                throw apiError.notFound('Club home not found');
            }
            return res.json({ message: 'Club home deleted successfully' });
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }
}

module.exports = new ClubHomeController()
