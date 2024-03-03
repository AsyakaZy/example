const uuid = require('uuid');
const path = require('path');
const { stadiums } = require('../models/models');
const apiError = require('../error/apiError');

class StadiumController {
    async create(req, res, next) {
        try {
            const { name, cityId } = req.body;
            const { photo } = req.files;
            let fileName = uuid.v4() + ".jpg";
            photo.mv(path.resolve(__dirname, '..', 'static', fileName));
            const Stadium = await stadiums.create({ name, cityId, photo: fileName });
            return res.json(Stadium);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const allStadiums = await stadiums.findAll(); // Получаем все стадионы из модели stadiums
            return res.json(allStadiums); // Возвращаем стадионы в ответе
        } catch (e) {
            next(apiError.internalServerError(e.message)); // Если произошла ошибка, передаем ее в middleware для обработки
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Получаем идентификатор стадиона из параметров запроса
            const Stadium = await stadiums.findByPk(id); // Ищем стадион по идентификатору
            if (!Stadium) { // Если стадион не найден, возвращаем ошибку
                throw apiError.notFound('Stadium not found');
            }
            return res.json(Stadium); // Возвращаем найденный стадион
        } catch (e) {
            next(apiError.internalServerError(e.message)); // Если произошла ошибка, передаем ее в middleware для обработки
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { name, cityId } = req.body;
            const [updated] = await stadiums.update({ name, cityId }, { where: { id } });
            if (!updated) {
                throw apiError.notFound('Stadium not found');
            }
            const updatedStadium = await stadiums.findByPk(id);
            return res.json(updatedStadium);
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await stadiums.destroy({ where: { id } });
            if (!deleted) {
                throw apiError.notFound('Stadium not found');
            }
            return res.json({ message: 'Stadium deleted successfully' });
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }
}

module.exports = new StadiumController();
