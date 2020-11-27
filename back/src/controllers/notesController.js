const { Router } = require("express");
const isAuth = require("../middleware/auth");
const notesService = require("../services/notesService");

const route = Router();

module.exports = (app) => {
    app.use('/notes', route);

    // Получение всех заметок пользователя
    route.get(
        '/all', isAuth,
        async (req, res) => {
            // Получаем постранично заметки для пользователя
            let page = 1;
            if(req.body.page) {
                page = req.body.page;
            }
            
            const notes = await notesService.notesForPage(req.uerId, page);
            const totalNotesCount = await notesService.notesForUserCount(req.uerId);

            return res.status(200)
                .json({ notes: notes, totalNotesCount: totalNotesCount });
    });

    route.get(
        '/shared/:id',
        async (req, res) => {
            // Получаем расшаренную заметку
            const note = await notesService.getSharedNote(req.params.id);
            return res.status(200).json({ note: note });
    });

    route.post(
        '/share', isAuth,
        async (req, res) => {
            const shareId = await notesService.share(req.userId, req.body.noteId);
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
            await notesService.edit(req.userId, req.params.id, req.body.text);
            return res.status(200);
        });
    route.post(
        '/delete/:id', isAuth,
        async (req, res) => {
            await notesService.deleteNode(req.userId, req.params.id);
            return res.status(200);
        });
}