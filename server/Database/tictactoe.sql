-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 03, 2023 at 10:20 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tictactoe`
--
CREATE DATABASE IF NOT EXISTS `tictactoe` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `tictactoe`;

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_player` (IN `id` VARCHAR(7), IN `u` VARCHAR(8), IN `f` VARCHAR(32), IN `l` VARCHAR(32), IN `p` VARCHAR(64))   BEGIN
	INSERT INTO players(player_id, username, firstName, lastName, password) VALUES (id, u, f, l, p);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_player` (`u` VARCHAR(8), `p` VARCHAR(64))   BEGIN
	SELECT * FROM players WHERE username = u AND password = p;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_player_score` (IN `id` VARCHAR(7), IN `x` INT, IN `o` INT)   BEGIN
    INSERT INTO statistics(player_id, x_score, o_score) VALUES(id, x, o);
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `is_id_reserved` (`id` VARCHAR(7)) RETURNS INT(11) DETERMINISTIC BEGIN
	DECLARE is_reserved INTEGER DEFAULT 0;
    DECLARE searched_id varchar(7);
    SELECT player_id INTO searched_id FROM players WHERE player_id = id;
    IF searched_id = id THEN
    	SET is_reserved = 1;
     END IF;
  	RETURN is_reserved;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `is_username_reserved` (`u` VARCHAR(8)) RETURNS INT(11) DETERMINISTIC BEGIN
	DECLARE is_reserved INTEGER DEFAULT 0; 
	DECLARE searched_username varchar(7); 
	SELECT username INTO searched_username FROM players WHERE username = u;
	IF searched_username = u THEN
		SET is_reserved = 1;
	END IF; 
	RETURN is_reserved;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `player_id` varchar(7) NOT NULL,
  `username` varchar(8) NOT NULL,
  `firstName` varchar(35) NOT NULL,
  `lastName` varchar(35) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`player_id`, `username`, `firstName`, `lastName`, `password`) VALUES
('0791971', 'whybe', 'Why', 'Be', '3347a3c2cc8191da7daf194551b70f391af501e21dfe2c70d717d1610542a0c6'),
('1038497', 'tictacto', 'Web', 'Game', '66b35ce4d6d5e718be4318f1069b828d33135f503545a085969e0ff4eb52aaae'),
('1507887', 'helwrld', 'Hello', 'World', '827d9a304cbb08ac49b0c8563e90bee144caa89cd2f1a9682fd20d468d857268');

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE `statistics` (
  `game_id` int(11) NOT NULL,
  `player_id` varchar(7) NOT NULL,
  `x_score` int(11) DEFAULT 0,
  `o_score` int(11) DEFAULT 0,
  `game_date` date DEFAULT curdate(),
  `game_time` time DEFAULT curtime()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`game_id`, `player_id`, `x_score`, `o_score`, `game_date`, `game_time`) VALUES
(1, '0791971', 0, 1, '2023-01-07', '19:57:59'),
(2, '0791971', 0, 2, '2023-01-07', '19:58:36'),
(3, '0791971', 1, 2, '2023-01-07', '19:58:51'),
(4, '0791971', 1, 3, '2023-01-07', '20:00:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`player_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`game_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `game_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
