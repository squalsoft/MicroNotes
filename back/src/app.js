const express = require("express");
const config = require("./config")
const app = express();
const port = config.backendPort;
const routes = require("./api");
const bodyParser = require("body-parser");

async function startServer() {

  // Middleware для преобразования string из req.body в json
  app.use(bodyParser.json());

  // Подключаем пути api
  app.use('/api', routes());

  // Обработка ошибок
  /// 404
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    // 401
    if (err.name === 'UnauthorizedError') {
      console.log(`Ошибка доступа ${err.status}: ${err.message}`);
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    console.log(`Ошибка бекенда ${err.status}: ${err.message}`);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
  
  app.listen(port, () => {
    console.log(`🚀 MicroNotes backend listening at http://localhost:${port}`);
  }).on('error', err => {
    console.log(err);
    process.exit(1);
  });

}

startServer();
