# MicroNotes
## Сервис для хранения заметок.

Использует СУБД MySql.
Настройки подключения к БД находятся в файле /back/src/config.js

Использует менеджер пакетов yarn.

### Проект состоит из фронтенда (front) и бекенда (back).

Для запуска фронтенда используется команда yarn serve
Сервис доступен по стандартному адресу http://localhost:8080/ 
Настройка базового адреса бекенда производится в файле
/front/src/main.js -> axios.defaults.baseURL = "http://localhost:9000";

Для запуска бекенда используется аналогичная команда yarn serve
Бекенд API доступен по адресу http://localhost:9000/
Порт бекенда задаётся в конфиге /back/src/config.js

## Скрипты для создания БД:

```sql
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_login_idx` (`login`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `notes`;
CREATE TABLE `notes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) unsigned NOT NULL,
  `text` varchar(1000) NOT NULL,
  `createDate` datetime NOT NULL,
  `updateDate` datetime NOT NULL,
  `shareId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `notes_shareId_idx` (`shareId`) USING BTREE,
  KEY `userId` (`userId`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
```