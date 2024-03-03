const uuid = require('uuid')
const path = require('path');
const { match , clubHome, clubGuest, club, stadiums, city} = require('../models/models')
const apiError = require('../error/apiError')

class MatchController {
    async create(req, res, next) {
        try {
            const { clubHomeId, clubGuestId, date, time, stadiumId, tour, cityId } = req.body;
    
            // Создаем матч с ассоциациями с моделями clubHome, clubGuest и stadium
            const createdMatch = await match.create({ 
                clubHomeId,
                clubGuestId,
                date, 
                time, 
                stadiumId,
                tour,
                cityId
            });
    
            return res.json(createdMatch);
        } catch (error) {
            next(apiError.badRequest(error.message));
        }
    }
    
    
    async getAll(req, res, next) {
        try {
            const matches = await match.findAll({
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
                        model: stadiums,
                        as: 'stadium'
                    },
                    {
                        model: city,
                        as: 'city'
                    },
                ]
            });
            return res.json(matches);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }
    

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Получаем идентификатор матча из параметров запроса
            const Match = await match.findByPk(id); // Ищем матч по идентификатору
            if (!Match) { // Если матч не найден, возвращаем ошибку
                throw apiError.notFound('Match not found');
            }
            return res.json(Match); // Возвращаем найденный матч
        } catch (e) {
            next(apiError.badRequest(e.message)); // Если произошла ошибка, передаем ее в middleware для обработки
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { clubHomeId, clubGuestId, date, time, stadiumId, tour, cityId } = req.body;
            const [updated] = await match.update({ clubHomeId, clubGuestId, date, time, stadiumId, tour, cityId }, { where: { id } });
            if (!updated) {
                throw apiError.notFound('Match not found');
            }
            const updatedMatch = await match.findByPk(id);
            return res.json(updatedMatch);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await match.destroy({ where: { id } });
            if (!deleted) {
                throw apiError.notFound('Match not found');
            }
            return res.json({ message: 'Match deleted successfully' });
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }
}

module.exports = new MatchController()
