const ns = require("../../src/services/notesService");
const us = require("../../src/services/usersService");
const { v4: uuidv4 } = require("uuid");
const db = require("../../src/helpers/db");
let userId = "";

beforeAll(async () => { 
    // Заводим нового пользователя для тестов заметок
    const login = uuidv4();
    const pass = "testPass";
    userId = await us.register(login, pass);
});

afterAll(() => { 
    // Закрываем все соединения с базой в конце 
    db.end();
});

describe("Integration tests", () => {
    let notesCount = 0;   
    let shareId = "";   
    let newNoteId = "";

    it("User can get notes count", async () => {
        notesCount = await ns.notesForUserCount(userId);
        expect(notesCount).toBe(0);
    });

    it("User can add notes", async () => {
        newNoteId = await ns.add(userId, "Проверочная заметка");
        expect(newNoteId).not.toBe(null);
    });

    it("User can edit notes", async () => {
        const updateRes = await ns.edit(userId, newNoteId, "Имзененная Проверочная Заметка");
        expect(updateRes).toBe(true);
    });

    it("User can share notes", async () => {
        shareId = await ns.share(userId, newNoteId);
        expect(shareId).not.toBe(null);
    });

    it("Multiple shares returns same id", async () => {
        const shareId2 = await ns.share(userId, newNoteId);
        expect(shareId).toBe(shareId2);
    });

    it("notesForPage returns notes", async () => {
        const notes = await ns.notesForPage(userId, 0);
        expect(notes.length).toBe(1);
    });

    it("getSharedNote returns shared note", async () => {
        const sharedNote = await ns.getSharedNote(shareId);
        expect(sharedNote.id).toBe(newNoteId);
    });

    it("Notes can be deleted", async () => {
        await ns.deleteNode(userId, newNoteId);
        notesCount = await ns.notesForUserCount(userId);
        expect(notesCount).toBe(0);
    });

});