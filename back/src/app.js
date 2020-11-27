const express = require("express");
const config = require("./config")
const app = express();
const port = config.backendPort;
const routes = require("./controllers");
const bodyParser = require("body-parser");
const cors = require("cors");

async function startServer() {

  // Middleware для преобразования string из req.body в json
  app.use(bodyParser.json());
  
  app.use(cors());

  // Обработка unhandledRejection и передача ошибки следующему обработчику
  app.use(function (req, res, next) {
    function unhandledRejection(reason, p) {
        console.error('Possibly Unhandled Rejection at: Promise ', p, " reason: ", reason);

        next(reason);
    }
    process.on('unhandledRejection', unhandledRejection);
    
    var end = res.end;
    res.end = function (chunk, encoding) {
        // Очистка памяти
        process.removeListener('unhandledRejection', unhandledRejection);
        res.end = end;
        res.end(chunk, encoding);
    };
    next();
  });

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

    // Проверка отправленности ответа клиенту
    if (res.headersSent) {
      return next(err);
    }
    
    res.status(err.status || 500);    
    res.json({ type: "error", message: "Ошибка сервера" });
  });
  
  app.listen(port, () => {
    console.log(`🚀 MicroNotes backend listening at http://localhost:${port}`);
  }).on('error', err => {
    console.log(err);
    process.exit(1);
  });

}

startServer();
