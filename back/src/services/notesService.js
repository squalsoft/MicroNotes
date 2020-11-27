const db = require("../helpers/db");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    /** Добавление */
    add: async function (userId, text){
        try {
            const [result] = await db.promise().execute(
                "INSERT INTO notes (userId, text, createDate, updateDate) VALUES (?,?, NOW(), NOW())", 
                [userId, text]);
            // Новая созданная запись
            return result.insertId;
        } catch(err) {
            console.log(err);
            return null;
        }
    },

    /** Редактирование */
    edit: async function (userId, noteId, newText){
        await db.promise().execute(
            "UPDATE notes SET text=?, updateDate=NOW() WHERE id=? AND userId=?", 
            [newText, noteId, userId]);
    },

    /** Получаение по id */
    getNoteById: async function (userId, noteId){
        try {
            const [rows] = await db.promise().execute(
                "SELECT * FROM notes WHERE id=? AND userId=?", 
                [noteId, userId]);
            return rows[0];
        } catch(err) {
            console.log(err);
            return null;
        }
    },

    /** Расшаривание */
    share: async function (userId, noteId){
        try {
            const shareId = uuidv4();
            const [rows] = await db.promise().execute(
                "UPDATE notes SET shareId = ? WHERE id=? AND userId=? AND shareId IS NULL", 
                [shareId, noteId, userId]);
            // Изменённая запись
            const res = await this.getNoteById(userId, noteId);
            return res.shareId;
        } catch(err) {
            console.log(err);
            return null;
        }
    },
    
    /** Вывод постранично заметок для пользователя */
    notesForPage: async function (userId, page) {
        // Retrieve rows 6-15
        // Выводим по 10 шт. на странице
        const skip = (page - 1) * 10;
        const take = 10;
        const [rows] = await db.promise().execute(            
            "SELECT * FROM notes WHERE userId=? LIMIT ?,?", [userId, skip, take]);
        return rows;
    },
    
    /** Получение количества заметок пользователя для пейджинга */
    notesForUserCount: async function (userId) {
        const [rows] = await db.promise().execute(            
            "SELECT COUNT (*) AS notesCount FROM notes WHERE userId=? ", [userId]);
        return rows[0].notesCount;
    },

    /** Вывод расшаренной заметки */
    getSharedNote: async function (shareId){
        const [rows] = await db.promise().execute(
            "SELECT * FROM notes WHERE shareId=?", 
            [shareId]);
        return rows[0];
    },

    /** Удаление */
    deleteNode: async function (userId, noteId) {
        await db.promise().execute(
            "DELETE FROM notes WHERE userId=? AND id=?", [userId, noteId]);
    }
}