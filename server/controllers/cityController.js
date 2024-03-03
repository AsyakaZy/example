const uuid = require('uuid')
const path = require('path');
const { city } = require('../models/models')
const apiError = require('../error/apiError');

class CityController {
    async create(req, res, next) {
        try {
            const { name } = req.body
            const City = await city.create({ name })
            return res.json(City)
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const cities = await city.findAll(); 
            return res.json(cities); 
        } catch (e) {
            next(apiError.badRequest(e.message)); 
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Получаем идентификатор города из параметров запроса
            const City = await city.findByPk(id); // Ищем город по идентификатору
            if (!City) { // Если город не найден, возвращаем ошибку
                throw apiError.notFound('City not found');
            }
            return res.json(City); // Возвращаем найденный город
        } catch (e) {
            next(apiError.internalServerError(e.message)); // Если произошла ошибка, передаем ее в middleware для обработки
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const [updated] = await city.update({ name }, { where: { id } });
            if (!updated) {
                throw apiError.notFound('City not found');
            }
            const updatedCity = await city.findByPk(id);
            return res.json(updatedCity);
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await city.destroy({ where: { id } });
            if (!deleted) {
                throw apiError.notFound('City not found');
            }
            return res.json({ message: 'City deleted successfully' });
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }
}

module.exports = new CityController()
