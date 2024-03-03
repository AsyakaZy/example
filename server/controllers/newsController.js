const uuid = require('uuid')
const path = require('path');
const { news, newsClub, club } = require('../models/models')
const apiError = require('../error/apiError');
const fs = require('fs/promises')

class NewsController {
    async create(req, res, next) {
        try {
            const { heading, text, date } = req.body;
            const { photo } = req.files;
            let fileName = uuid.v4() + ".jpg";
            photo.mv(path.resolve(__dirname, '..', 'static', fileName));

            const News = await news.create({ heading, text, date, photo: fileName });
            return res.json(News);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const allNews = await news.findAll(); // Получаем все новости из модели news
            return res.json(allNews); // Возвращаем новости в ответе
        } catch (e) {
            next(apiError.badRequest(e.message)); // Если произошла ошибка, передаем ее в middleware для обработки
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params; // Получаем идентификатор новости из параметров запроса
            const News = await news.findByPk(id); // Ищем новость по идентификатору
            if (!News) { // Если новость не найдена, возвращаем ошибку
                throw apiError.notFound('News not found');
            }
            return res.json(News); // Возвращаем найденную новость
        } catch (e) {
            next(apiError.badRequest(e.message)); // Если произошла ошибка, передаем ее в middleware для обработки
        }
    }

    async change(req, res, next) {
        try {
            const { id } = req.params;
            const { heading, text, date } = req.body;

            // Получаем новость по id
            const existingNews = await news.findByPk(id);
            if (!existingNews) {
                throw apiError.notFound('News not found');
            }

            let fileName = existingNews.photo; // Изначальное имя файла фото
            if (req.files && req.files.photo) {
                // Если пришло новое фото, обновляем его
                const { photo } = req.files;
                fileName = uuid.v4() + ".jpg"; // Генерируем новое уникальное имя файла
                await photo.mv(path.resolve(__dirname, '..', 'static', fileName)); // Сохраняем файл на сервере
                // Удаляем старый файл фото, чтобы не захламлять сервер
                await fs.unlink(path.resolve(__dirname, '..', 'static', existingNews.photo));
            }

            // Обновляем новость с учетом новой фотографии
            const [updated] = await news.update({ heading, text, photo: fileName, date }, { where: { id } });
            if (!updated) {
                throw apiError.notFound('News not found');
            }
            const updatedNews = await news.findByPk(id);
            return res.json(updatedNews);
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await news.destroy({ where: { id } });
            if (!deleted) {
                throw apiError.notFound('News not found');
            }
            return res.json({ message: 'News deleted successfully' });
        } catch (e) {
            next(apiError.badRequest(e.message));
        }
    }
}

module.exports = new NewsController();
