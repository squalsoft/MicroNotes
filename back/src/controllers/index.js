const { Router } = require("express");
const user = require("./userController");
const notes = require("./notesController");

module.exports = () => {
	const app = Router();
	user(app);
	notes(app);

	return app
}