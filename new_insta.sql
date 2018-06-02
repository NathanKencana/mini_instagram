-- phpMyAdmin SQL Dump
-- version 4.0.4.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 02, 2018 at 11:42 AM
-- Server version: 5.6.13
-- PHP Version: 5.4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `new_insta`
--
CREATE DATABASE IF NOT EXISTS `new_insta` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `new_insta`;

-- --------------------------------------------------------

--
-- Table structure for table `follow`
--

CREATE TABLE IF NOT EXISTS `follow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_follow` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `follow`
--

INSERT INTO `follow` (`id`, `id_user`, `id_follow`) VALUES
(1, 1, 2),
(2, 3, 1),
(3, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_post` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `timeline`
--

CREATE TABLE IF NOT EXISTS `timeline` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` varchar(99) NOT NULL,
  `image` varchar(99) NOT NULL,
  `caption` varchar(99) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `timeline`
--

INSERT INTO `timeline` (`id`, `id_user`, `image`, `caption`, `date`) VALUES
(1, ' 3', 'postg2pc55gcjhwuj1rb.PNG', 'test3 caption', '2018-06-02 03:36:52'),
(2, ' 1', 'postg2pc55gcjhwum1z7.PNG', 'caption qq', '2018-06-02 03:39:12'),
(3, ' 1', 'postg2pc5308jhwurr83.PNG', 'testt', '2018-06-02 03:43:38'),
(4, ' 1', 'postg2pc5308jhwus316.PNG', 'testt', '2018-06-02 03:43:53'),
(5, ' 1', 'postg2pc5308jhwuufiw.PNG', 'eehhh', '2018-06-02 03:45:43'),
(6, ' 1', 'postg2pc549kjhwvo9lk.jpg', 'baru', '2018-06-02 04:08:55');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(99) NOT NULL,
  `password` varchar(99) NOT NULL,
  `profile` varchar(99) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `profile`) VALUES
(1, 'test', 'test', 'profileg2pc55u0jhwvpwg9.jpg'),
(2, 'test2', 'test2', 'test2'),
(3, 'test1', 'test1', 'profileg2pc58cgjhwwehmz.png');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
