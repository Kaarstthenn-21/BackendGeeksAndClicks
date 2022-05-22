-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: mysql-db
-- Tiempo de generación: 22-05-2022 a las 01:00:19
-- Versión del servidor: 8.0.29
-- Versión de PHP: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `GeeksandClicks`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auth`
--

CREATE TABLE `auth` (
  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `auth`
--

INSERT INTO `auth` (`id`, `username`, `password`) VALUES
('dMXa8My69l7RdzcCrPqZv', 'daniel', '$2b$05$jXLXmtEm/9oK5v94Tlrt0.C6./jiaoakFQAoUswVpg.YBxMzaioUi'),
('dt5a5s_IddQcfK168M_VV', 'gustavo', '$2b$05$2Z6zBzVPCzttN8fA6P2Bje2HFPGI21loC5zZq.V/BbiPmJ9fAqHKa'),
('evgQIKyp2fsfHij8I_Hk1', 'jorgue1', '$2b$05$Hezs6YSRE4iSK5EGPVQxTuAvC8PrhjrATjZvTZ6ii3nmc0t6lGkyS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `id` varchar(32) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `post_id` varchar(32) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `text` text NOT NULL,
  `user` varchar(32) NOT NULL,
  `titulo` varchar(360) NOT NULL,
  `tipo` smallint NOT NULL,
  `imagen` text NOT NULL,
  `video` text NOT NULL,
  `categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `post`
--

INSERT INTO `post` (`id`, `text`, `user`, `titulo`, `tipo`, `imagen`, `video`, `categoria`) VALUES
('rYyJXpbPgvLJv62w7c664', 'Mejoraras el rendimiento de tu ram ...', '123', 'Optimización de ram', 0, 'https://res.cloudinary.com/riacrdo2/image/upload/v1653087112/default/informaticaDefault_uxbsle.jpg', 'https://www.youtube.com/watch?v=ToH1-kqcXTA', 'optimizacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rpta_comments`
--

CREATE TABLE `rpta_comments` (
  `id` varchar(32) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `comment_id` varchar(32) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` varchar(32) NOT NULL,
  `username` varchar(32) NOT NULL,
  `name` varchar(64) NOT NULL,
  `imagen` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `name`, `imagen`) VALUES
('123', 'codingcarlos', 'Carlos', ''),
('dMXa8My69l7RdzcCrPqZv', 'daniel', 'ricardo', 'http://res.cloudinary.com/riacrdo2/image/upload/v1653104533/perfil/q477edc7bopiniitfor1.jpg'),
('dt5a5s_IddQcfK168M_VV', 'gustavo', 'gustavo', 'http://res.cloudinary.com/riacrdo2/image/upload/v1653148525/perfil/bqcdpjbxh9jvwljhnqcz.jpg'),
('evgQIKyp2fsfHij8I_Hk1', 'jorgue1', 'jorgue', 'https://res.cloudinary.com/riacrdo2/image/upload/v1653087107/default/user_ztsbhy.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_follow`
--

CREATE TABLE `user_follow` (
  `user_from` varchar(32) NOT NULL,
  `user_to` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indices de la tabla `user_follow`
--
ALTER TABLE `user_follow`
  ADD UNIQUE KEY `user_from` (`user_from`,`user_to`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
