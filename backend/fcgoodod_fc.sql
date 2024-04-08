-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Апр 08 2024 г., 16:54
-- Версия сервера: 5.7.21-20-beget-5.7.21-20-1-log
-- Версия PHP: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `fcgoodod_fc`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Albums`
--
-- Создание: Мар 15 2024 г., 18:38
-- Последнее обновление: Апр 05 2024 г., 14:23
--

DROP TABLE IF EXISTS `Albums`;
CREATE TABLE `Albums` (
  `album_id` int(11) NOT NULL,
  `album_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Albums`
--

INSERT INTO `Albums` (`album_id`, `album_name`) VALUES
(1, 'Игра за 3-е место в кубке Русфут Алтуфьево. Фк FT 2');

-- --------------------------------------------------------

--
-- Структура таблицы `Auth`
--
-- Создание: Мар 31 2024 г., 16:59
-- Последнее обновление: Апр 07 2024 г., 11:07
--

DROP TABLE IF EXISTS `Auth`;
CREATE TABLE `Auth` (
  `auth_id` int(11) NOT NULL,
  `auth_refresh` text NOT NULL,
  `auth_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `Auth`
--

INSERT INTO `Auth` (`auth_id`, `auth_refresh`, `auth_user`) VALUES
(13, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZmNnb29kb2QuYmVnZXQudGVjaCIsImF1ZCI6Imh0dHA6Ly9mY2dvb2RvZC5iZWdldC50ZWNoIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDAsImV4cCI6MTcxMjU3NDQ3MywiZGF0YSI6eyJ1c2VyX2lkIjoiMSJ9fQ.EEYeAvrq1Yi7QVp9cHpWbZ7oiQJTCz2i7o9bSU-imEE', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `Comments`
--
-- Создание: Мар 15 2024 г., 18:38
-- Последнее обновление: Апр 04 2024 г., 11:03
--

DROP TABLE IF EXISTS `Comments`;
CREATE TABLE `Comments` (
  `comment_id` int(11) NOT NULL,
  `comment_user` text NOT NULL,
  `comment_user_role` text NOT NULL,
  `comment_desc` text NOT NULL,
  `comment_directory` text NOT NULL,
  `comment_stamp` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Comments`
--

INSERT INTO `Comments` (`comment_id`, `comment_user`, `comment_user_role`, `comment_desc`, `comment_directory`, `comment_stamp`) VALUES
(11, 'Андрей Потачин', 'Капитан \"К15\"', 'Хотим выразить благодарность за пошив футбольной формы отличного качества! Всем рекомендуем!', 'Алексей М1710850559187', '1710850559187'),
(12, 'Максим', 'Капитан', 'Прекрасная форма. Отличное качество.', 'Максим1711543703625', '1711543703625');

-- --------------------------------------------------------

--
-- Структура таблицы `Comments_MD`
--
-- Создание: Апр 04 2024 г., 10:10
-- Последнее обновление: Апр 05 2024 г., 14:39
--

DROP TABLE IF EXISTS `Comments_MD`;
CREATE TABLE `Comments_MD` (
  `comment_id` int(11) NOT NULL,
  `comment_user` text NOT NULL,
  `comment_user_role` text NOT NULL,
  `comment_desc` text NOT NULL,
  `comment_stamp` text NOT NULL,
  `comment_directory` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Customers`
--
-- Создание: Мар 15 2024 г., 18:38
-- Последнее обновление: Мар 28 2024 г., 13:18
--

DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(50) NOT NULL,
  `customer_phone` varchar(12) NOT NULL,
  `customer_email` varchar(90) NOT NULL,
  `customer_service` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Customers`
--

INSERT INTO `Customers` (`customer_id`, `customer_name`, `customer_phone`, `customer_email`, `customer_service`) VALUES
(1, 'Akaza', '+75656459615', 'khjfgjhfgj@yandex.ru', 6),
(2, 'Валера ', '+79532565511', 'hgfjjfjdf@yandex.ru', 4),
(3, 'Валера ', '+7+795325655', 'sipovec490@mnsaf.com', 12),
(4, 'Максим', '+7+798513993', 'maks.smirnov0999@gmail.com', 12),
(5, 'Максим', '+7+798513993', 'maks.smirnov0999@gmail.com', 12),
(6, 'Максим Борисович Смирнов', '+7+798513993', 'maks.smirnov0999@gmail.com', 12),
(7, 'Максим Борисович Смирнов', '+7+798513993', 'maks.smirnov0999@gmail.com', 12),
(8, 'Валера ', '+7+795325655', 'hgfjjfjdf@yandex.ru', 4),
(9, 'Валера ', '+7+795325655', 'hgfjjfjdf@yandex.ru', 4),
(10, 'Валера ', '+7+795325655', 'hgfjjfjdf@yandex.ru', 5);

-- --------------------------------------------------------

--
-- Структура таблицы `Events`
--
-- Создание: Мар 15 2024 г., 18:38
--

DROP TABLE IF EXISTS `Events`;
CREATE TABLE `Events` (
  `event_id` int(11) NOT NULL,
  `event_name` text NOT NULL,
  `event_time` text NOT NULL,
  `event_start` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `Mails`
--
-- Создание: Мар 19 2024 г., 13:19
--

DROP TABLE IF EXISTS `Mails`;
CREATE TABLE `Mails` (
  `mail_id` int(11) NOT NULL,
  `mail_name` varchar(50) NOT NULL,
  `mail_email` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Posts`
--
-- Создание: Апр 06 2024 г., 14:37
-- Последнее обновление: Апр 06 2024 г., 18:12
--

DROP TABLE IF EXISTS `Posts`;
CREATE TABLE `Posts` (
  `post_id` int(11) NOT NULL,
  `post_title` varchar(255) NOT NULL,
  `post_content` json NOT NULL,
  `post_directory` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Posts`
--

INSERT INTO `Posts` (`post_id`, `post_title`, `post_content`, `post_directory`) VALUES
(18, 'Игра с командой Moscow Lions', '[{\"id\": 1712424156992, \"text\": \"Всех с победой над командой Банис!\\nСтарт третьему сезону Capital положен.\\n6-1. Очень достойная игра!\\nВся команда была на высоте.\\nУ нас почти не было ни одной ошибки. Все играли на хорошем уровне и с большой самоотдачей! У нас заявлено 2 новых игрока! Круто себя показали!\\nДиман забил 3 гола!\", \"image\": \"http://fcgoodod.beget.tech/server/assets/posts/Игра с командой Moscow Lions./WhatsApp Image 2024-03-27 at 16.08.00.jpeg\", \"fileName\": \"WhatsApp Image 2024-03-27 at 16.08.00.jpeg\"}]', 'Игра с командой Moscow Lions.');

-- --------------------------------------------------------

--
-- Структура таблицы `Services`
--
-- Создание: Мар 15 2024 г., 18:38
-- Последнее обновление: Апр 05 2024 г., 14:10
--

DROP TABLE IF EXISTS `Services`;
CREATE TABLE `Services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_price` int(11) DEFAULT NULL,
  `service_desc` text,
  `service_image` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `Services`
--

INSERT INTO `Services` (`service_id`, `service_name`, `service_price`, `service_desc`, `service_image`) VALUES
(3, 'Тренировка + матч 8x8', 500, 'Проводится 1 раз в неделю по четвергам в 21-30. Москва ул Коминтерна 15 (метро Бабушкинская)\r\n\r\nДлительность 1,5 часа (40 минут тренировка+ 50 товарищеская игра 8 на 8 с разными командами)\r\n\r\nФутбольное поле с искусственным газоном и раздевалка с душевой\r\n', 'Rectangle 9123123.png'),
(4, 'Участие команды в турнире', 3500, 'Принимаем заявки на участие от команд на участие в турнирах\r\n\r\nТурниры и дивизионы подбираются по уровню вашей команды\r\n', 'Rectangle 9 (7).png'),
(5, 'Тренер для команды', 2000, 'Разработка единой тактики и стратегии игры\r\n\r\nУлучшение техник ведения игры и слаженности взаимодействия на поле\r\n\r\nСовершенствование навыков игроков и достижение новых результатов команды\r\n', 'Rectangle 9 (4).png'),
(6, 'Судья на матч или турнир', 1000, 'Опытные и квалифицированные судьи\r\n\r\nПроведение игр и матчей в соответствии со всеми правилами и нормами\r\n\r\nСправедливое разрешение спорных игровых ситуаций\r\n\r\nГарантия честного соревнования', 'Rectangle 9 (11).png'),
(7, 'Фотосъемка матча', 1000, 'Предоставляем как стандартные, так и индивидуальные пакеты услуг, которые соответствуют вашим потребностям\r\n\r\nОбеспечим вас качественными фотографиями, которые будут идеальным сувениром для команды или идеальным подарком для болельщика\r\n\r\n', 'Rectangle 9 (3).png'),
(8, 'Видеосъемка (трансляция)', 3000, 'Мы имеем большой опыт в съемке спортивных событий и знаем, как запечатлеть атмосферу игры и ценные моменты матча\r\n\r\nПредлагаем различные пакеты услуг, гибкое расписание съемок и готовы работать с вашим бюджетом.\r\n\r\n\r\n\r\n', 'Rectangle 9 (2).png'),
(10, 'Ведущий для матча', 5000, 'Интерактивная программа для зрителей и игроков\n\nКомментирование футбольных матчей\n\nПоддержание духа соперничества на стадионе, наполнение игры юмором и энергией', 'Rectangle 9.png'),
(12, 'Участие игрока в турнире', 500, 'Принимаем заявки на участие в турнире от игроков\n\nПройди отбор для определения твоего уровня подготовки и участвуй в турнире с командой твоего уровня', 'Rectangle 9 (6).png');

-- --------------------------------------------------------

--
-- Структура таблицы `Training`
--
-- Создание: Мар 28 2024 г., 19:45
--

DROP TABLE IF EXISTS `Training`;
CREATE TABLE `Training` (
  `training_user_id` int(11) NOT NULL,
  `training_user_name` varchar(50) NOT NULL,
  `training_user_phone` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `Uniform`
--
-- Создание: Апр 04 2024 г., 11:47
-- Последнее обновление: Апр 04 2024 г., 12:07
--

DROP TABLE IF EXISTS `Uniform`;
CREATE TABLE `Uniform` (
  `uniform_id` int(11) NOT NULL,
  `uniform_fio` text NOT NULL,
  `uniform_phone` text NOT NULL,
  `uniform_email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--
-- Создание: Мар 15 2024 г., 18:38
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(90) NOT NULL,
  `email` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `login`, `password`, `email`) VALUES
(1, 'adminSys', '$2y$10$qXkhCtXO/kEPdB6bnnaSKeEe47g.xi1O/FrwMb5Z2EC3iYddvzMbO', '');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Albums`
--
ALTER TABLE `Albums`
  ADD PRIMARY KEY (`album_id`);

--
-- Индексы таблицы `Auth`
--
ALTER TABLE `Auth`
  ADD PRIMARY KEY (`auth_id`);

--
-- Индексы таблицы `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Индексы таблицы `Comments_MD`
--
ALTER TABLE `Comments_MD`
  ADD PRIMARY KEY (`comment_id`);

--
-- Индексы таблицы `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `customer_service` (`customer_service`);

--
-- Индексы таблицы `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`event_id`);

--
-- Индексы таблицы `Mails`
--
ALTER TABLE `Mails`
  ADD PRIMARY KEY (`mail_id`);

--
-- Индексы таблицы `Posts`
--
ALTER TABLE `Posts`
  ADD PRIMARY KEY (`post_id`);

--
-- Индексы таблицы `Services`
--
ALTER TABLE `Services`
  ADD PRIMARY KEY (`service_id`);

--
-- Индексы таблицы `Training`
--
ALTER TABLE `Training`
  ADD PRIMARY KEY (`training_user_id`);

--
-- Индексы таблицы `Uniform`
--
ALTER TABLE `Uniform`
  ADD PRIMARY KEY (`uniform_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Albums`
--
ALTER TABLE `Albums`
  MODIFY `album_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Auth`
--
ALTER TABLE `Auth`
  MODIFY `auth_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `Comments`
--
ALTER TABLE `Comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `Comments_MD`
--
ALTER TABLE `Comments_MD`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Customers`
--
ALTER TABLE `Customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `Events`
--
ALTER TABLE `Events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Mails`
--
ALTER TABLE `Mails`
  MODIFY `mail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `Posts`
--
ALTER TABLE `Posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT для таблицы `Services`
--
ALTER TABLE `Services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `Training`
--
ALTER TABLE `Training`
  MODIFY `training_user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `Uniform`
--
ALTER TABLE `Uniform`
  MODIFY `uniform_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Customers`
--
ALTER TABLE `Customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`customer_service`) REFERENCES `Services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
