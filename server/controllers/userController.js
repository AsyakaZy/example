const apiError = require("../error/apiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { user } = require('../models/models')

class UserController {
    async registration(req, res, next) {
        try {
            const { firstName, email, password, fanId, telephoneNumber, role} = req.body
            if (!firstName || !email || !password || !fanId || !telephoneNumber) {
                return next(apiError.badRequest('Некорректные данные'))
            }
            const candidate = await user.findOne({ where: { email } })
            if (candidate) {
                return next(apiError.badRequest('Пользователь с таким email уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const newUser = await user.create({ firstName, email, password: hashPassword, fanId, telephoneNumber, role})
            const token = jwt.sign({ id: newUser.id, firstName, email, fanId, telephoneNumber,role},
                process.env.SECRET_KEY,
                { expiresIn: '24h' }
            )
            return res.json({ token })
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }   

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const User = await user.findOne({ where: { email } })
            if (!User) {
                return next(apiError.badRequest('Пользователь не найден'))
            }
            const comparePassword = await bcrypt.compare(password, User.password)
            if (!comparePassword) {
                return next(apiError.badRequest('Указан неверный пароль'))
            }
            const token = jwt.sign({ id: User.id, firstName: User.firstName, email: User.email, fanId: User.fanId, telephoneNumber: User.telephoneNumber, role: User.role },
                process.env.SECRET_KEY,
                { expiresIn: '24h' }
            )
            return res.json({ token })
        } catch (e) {
            next(apiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        const token = generateJWT(req.User.id, req.User.firstName, req.User.email, req.User.fanId, req.User.telephoneNumber, req.User.role)
        return res.json({token})
    }
}

module.exports = new UserController()

