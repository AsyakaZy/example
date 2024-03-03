const uuid = require('uuid')
const path = require('path');
const { clubGuest } = require('../models/models')
const apiError = require('../error/apiError');

class ClubGuestController {
    async create(req, res, next) {
        try {
            const { clubId } = req.body
            const ClubGuest = await clubGuest.create({ clubId })
            return res.json(ClubGuest)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const clubGuests = await clubGuest.findAll(); // Получаем все записи из модели clubGuest
            return res.json(clubGuests); // Возвращаем записи в ответе
        } catch (e) {
            next(apiError.internalServerError(e.message)); // Если произошла ошибка, передаем ее в middleware для обработки
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Получаем идентификатор гостя клуба из параметров запроса
            const ClubGuest = await clubGuest.findByPk(id); // Ищем гостя клуба по идентификатору
            if (!ClubGuest) { // Если гость клуба не найден, возвращаем ошибку
                throw apiError.notFound('Club guest not found');
            }
            return res.json(ClubGuest); // Возвращаем найденного гостя клуба
        } catch (e) {
            next(apiError.internalServerError(e.message)); // Если произошла ошибка, передаем ее в middleware для обработки
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { clubId } = req.body;
            const [updated] = await clubGuest.update({ clubId }, { where: { id } });
            if (!updated) {
                throw apiError.notFound('Club guest not found');
            }
            const updatedClubGuest = await clubGuest.findByPk(id);
            return res.json(updatedClubGuest);
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await clubGuest.destroy({ where: { id } });
            if (!deleted) {
                throw apiError.notFound('Club guest not found');
            }
            return res.json({ message: 'Club guest deleted successfully' });
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }
}

module.exports = new ClubGuestController()
