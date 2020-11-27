const { Router } = require("express");
const isAuth = require("../middleware/auth");
const usersService = require("../services/usersService");

const route = Router();

module.exports = (app) => {
    app.use('/user', route);

    route.post(
        '/register',
        async (req, res) => {
            if (!req.body.login || !req.body.password) {
                return res.status(400)
                    .json({ type: "error", message: "Введите логин и пароль" });                
            }

            const userId = await usersService.register(req.body.login, req.body.password);
            if(userId === null) {
                // Не удалось зарегистрировать
                return res.status(400)
                    .json({
                        type: "error",
                        message: "Пользователь с таким логином уже есть в базе."
                    });
            }
            // Логин должен пройти без ошибок для нового пользователя
            const token = await usersService.login(req.body.login, req.body.password);
            return res.status(200)
                    .json({
                        token: token
                    });
        });
    route.post(
        '/login',
        async (req, res) => {
            if (!req.body.login || !req.body.password) {
                return res.status(400)
                    .json({ type: "error", message: "Введите логин и пароль" });                
            }

            const token = await usersService.login(req.body.login, req.body.password);
            if(!token) {
                return res.status(400)
                    .json({
                        type: "error",
                        message: "Логин или пароль введены неверно"
                    });
            }

            return res.status(200)
                    .json({
                        token: token
                    });
        });

    // Разлогин только на стороне браузера
}