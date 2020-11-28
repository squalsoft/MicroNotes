const { Router } = require("express");
const isAuth = require("../middleware/auth");
const notesService = require("../services/notesService");

const route = Router();

module.exports = (app) => {
    app.use('/notes', route);

    // Получение всех заметок пользователя
    route.get(
        '/my/:skip', isAuth,
        async (req, res) => {
            // Получаем постранично заметки для пользователя            
            const notes = await notesService.notesForPage(req.userId, 
                parseInt(req.params.skip));
            const totalNotes = await notesService.notesForUserCount(req.userId);

            return res.status(200)
                .json({ notes: notes, totalNotes: totalNotes});
    });

    route.get(
        '/shared/:id',
        async (req, res) => {
            // Получаем расшаренную заметку
            const note = await notesService.getSharedNote(req.params.id);

            if(!note) {
                return res.status(404)
                    .json({ type: "error", message: "Заметка не найдена" });
            }

            return res.status(200).json({ note: note });
    });

    route.post(
        '/share/:id', isAuth,
        async (req, res) => {
            const shareId = await notesService.share(req.userId, parseInt(req.params.id));
            return res.status(200).json({ shareId: shareId });
        });
    route.post(
        '/create', isAuth,
        async (req, res) => {
            const noteId = await notesService.add(req.userId, req.body.text);
            return res.status(200).json({ noteId: noteId });
        });
    route.post(
        '/update/:id', isAuth,
        async (req, res) => {
            if(req.body.text.length > 1000) {
                return res.status(400)
                    .json({ type: "error", message: "Длина заметки не может быть больше 1000 символов" });
            }
            await notesService.edit(req.userId, req.params.id, req.body.text);
            return res.status(200).json({ });
        });
    route.post(
        '/delete/:id', isAuth,
        async (req, res) => {
            await notesService.deleteNode(req.userId, parseInt(req.params.id));
            return res.status(200).json({ });
        });
}