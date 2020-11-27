const us = require("../../src/services/usersService");
const { v4: uuidv4 } = require("uuid");
const db = require("../../src/helpers/db");
afterAll(() => { 
  // Закрываем все соединения с базой в конце 
  db.end();
});

describe("Integration tests", () => {
  const login = uuidv4();
  const pass = "testPass";

  it("User can register", async () => {

    const res = await us.register(login, pass);
    expect(res).not.toBe(null);
  });

  it("User can login", async () => {
    const res = await us.login(login, pass);
    expect(res).not.toBe("");
  });
});