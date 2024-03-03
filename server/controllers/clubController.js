const uuid = require('uuid');
const path = require('path');
const { club } = require('../models/models');
const apiError = require('../error/apiError');

class ClubController {
    async create(req, res, next) {
        try {
            const { name, stadiumId, cityId } = req.body;
            const { photo } = req.files;
            let fileName = uuid.v4() + ".jpg";
            photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            const Club = await club.create({ name, stadiumId, cityId, photo: fileName });
            return res.json(Club);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const clubs = await club.findAll();
            return res.json(clubs);
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const Club = await club.findOne({ where: { id } });
            if (!Club) {
                throw apiError.notFound('Club not found');
            }
            return res.json(Club);
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { name, stadiumId, cityId } = req.body;
            const Club = await club.findByPk(id);
            if (!Club) {
                throw apiError.notFound('Club not found');
            }
            Club.name = name;
            Club.stadiumId = stadiumId;
            Club.cityId = cityId;
            await Club.save();
            return res.json(Club);
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const Club = await club.findByPk(id);
            if (!Club) {
                throw apiError.notFound('Club not found');
            }
            await Club.destroy();
            return res.json({ message: 'Club deleted successfully' });
        } catch (e) {
            next(apiError.internalServerError(e.message));
        }
    }
}

module.exports = new ClubController();
