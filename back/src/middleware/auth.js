const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
   // Проверка доступа по токену
    const token = req.headers["x-access-token"];
    if (!token) {
        return res
            .status(401)
            .json({ type: "error", message: "x-access-token не найден." });
    }

    // Проверка токена
    jwt.verify(token, config.jwtToken, async (error, result) => {
        if (error) {
            return res
                .status(401)
                .json({ type: "error", message: "Неверный токен.", error });
        } else {
            // Всё ок, пропускаем и сохраняем айдишник пользователя для дальнейшей обработки
            req.userId = result.id;
            next();   
        }
    });
}