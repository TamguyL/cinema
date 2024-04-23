-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 15 avr. 2024 à 09:52
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cinema`
--

-- --------------------------------------------------------

--
-- Structure de la table `film`
--

CREATE TABLE `film` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `affiche` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `acteur1` varchar(50) NOT NULL,
  `acteur2` varchar(50) NOT NULL,
  `acteur3` varchar(50) NOT NULL,
  `realisateur` varchar(11) NOT NULL,
  `genre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `film`
--

INSERT INTO `film` (`id`, `titre`, `affiche`, `description`, `acteur1`, `acteur2`, `acteur3`, `realisateur`, `genre`) VALUES
(1, 'LES DENTS DE LA MER', 'requin.jpg', 'film avec un poisson', 'jean smith', 'pol person', 'belmondo paul', 'spielberg', 'aquatique'),
(2, 'le mepris', 'mepris.jpg', 'crise de couple', 'BB', 'Piccoli ', 'palance', 'godard jl', 'drame'),
(3, 'jules et jim', 'jj.jpg', 'trouple', 'f1', 'g1', 'g2', 'truffeau', 'drame');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `film`
--
ALTER TABLE `film`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
