const db = require("../helpers/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");

module.exports = {
    /** Регистрация пользователя */
    register: async function (login, password){
        // Проверка, что такого логина нет
        const [res1] = await db.promise().execute(            
            "SELECT COUNT (*) AS usersCount FROM users WHERE login=? ", [login]);
        if(res1[0].usersCount > 0) {
            return null;
        }

        // Хешируем пароль
        const hashPass = await bcrypt.hash(password, 4);

        const [result] = await db.promise().execute(
            "INSERT INTO users (login, password) VALUES (?,?)",[login, hashPass]);
        return result.insertId;
    },

    /** Вход пользователя */
    login: async function (login, password){
        try {        
            // Ищем пользователя
            const [rows] = await db.promise().execute(
                "SELECT * FROM users WHERE login=?",[login]);
            if(rows.length === 0) {
                // Не найден
                return "";
            }

            // Проверка пароля
            const match = await bcrypt.compare(password, rows[0].password);
            if(!match) {
                return "";
            }

            // Если всё ок, то возвращаем токен на 24 часа
            const token = jwt.sign({ id: rows[0].id}, config.jwtToken, {
                expiresIn: "24h"
            })
            return token;
        } catch(err) {
            console.log(err);
            return "";
        }
    }
}