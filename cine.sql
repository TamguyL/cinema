-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: mcdcinema
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acteur`
--

DROP TABLE IF EXISTS `acteur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `acteur` (
  `id_acteur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  `photo` varchar(250) DEFAULT NULL,
  `prenom` varchar(250) NOT NULL,
  PRIMARY KEY (`id_acteur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acteur`
--

LOCK TABLES `acteur` WRITE;
/*!40000 ALTER TABLE `acteur` DISABLE KEYS */;
/*!40000 ALTER TABLE `acteur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentaire`
--

DROP TABLE IF EXISTS `commentaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commentaire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_film` int(11) NOT NULL,
  `mail` varchar(55) NOT NULL,
  `commentaire` varchar(511) NOT NULL,
  `note` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentaire`
--

LOCK TABLES `commentaire` WRITE;
/*!40000 ALTER TABLE `commentaire` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film`
--

DROP TABLE IF EXISTS `film`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `film` (
  `id_film` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(250) NOT NULL,
  `affiche` varchar(250) NOT NULL,
  `description` varchar(250) NOT NULL,
  `id_genre` int(11) NOT NULL,
  `id_realisateur` int(11) NOT NULL,
  PRIMARY KEY (`id_film`),
  KEY `film_ibfk_1` (`id_genre`),
  KEY `film_ibfk_2` (`id_realisateur`),
  CONSTRAINT `film_ibfk_1` FOREIGN KEY (`id_genre`) REFERENCES `genre` (`Id_genre`),
  CONSTRAINT `film_ibfk_2` FOREIGN KEY (`id_realisateur`) REFERENCES `realisateur` (`Id_realisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film`
--

LOCK TABLES `film` WRITE;
/*!40000 ALTER TABLE `film` DISABLE KEYS */;
INSERT INTO `film` VALUES (1,'Forrest Gump','a565611eca64156c677cb5b77e897ffb','A Savannah, dans l\'Etat de Géorgie, Forrest Gump, assis sur un banc public, livre à qui veut l\'entendre, l\'étrange récit de sa vie mouvementée. Il naît dans un bourg de l\'Alabama, affecté d\'un quotient intellectuel inférieur à la moyenne et d\'une par',9,8),(2,'La Vie est belle','c5b81b648ac246da5374d374e4c4845c','En 1938, en Italie, Guido, serveur juif fantasque et plein d\'imagination, s\'éprend de la belle Dora, institutrice. Celle-ci lui donne bientôt un fils, Giosué. Mais la guerre éclate. Guido et sa famille sont déportés vers un camp de concentration. Pou',7,9),(3,'Gladiator','bc4304f1360c44e485c9197e43e56d19','En 180 après Jésus Christ, le général romain Maximus est le plus fidèle soutien de l\'empereur Marc Aurèle. Jaloux du prestige de Maximus, le fils de Marc Aurèle, Commode, s\'arroge brutalement le pouvoir, puis ordonne l\'arrestation du général et son e',2,10),(4,'Le Loup de Wall Street','82c8df3a5734bf690674d792d9b18b5a','L’argent. Le pouvoir. Les femmes. La drogue. Les tentations étaient là, à portée de main, et les autorités n’avaient aucune prise. Aux yeux de Jordan et de sa meute, la modestie était devenue complètement inutile. Trop n’était jamais assez…',7,11),(5,'The Dark Knight - Le Chevalier noir','ef7afd9d64ac2bcdefec4a312e11685e','Avec l\'appui du lieutenant de police Jim Gordon et du procureur de Gotham, Harvey Dent, Batman vise à éradiquer le crime organisé qui pullule dans la ville. Leur association est très efficace, mais elle sera bientôt bouleversée par le chaos déclenché',1,1),(6,'Le Bon, la Brute et le Truand','d98b4c255a1f5d14d44c82ce12d9488a','Un chasseur de primes rejoint deux hommes dans une alliance précaire. Leur but ? Trouver un coffre rempli de pièces d\'or dans un cimetière isolé.',19,2),(7,'Le Parrain','82ad5cfb97964f1f178a362be254cb8c','New York, 1945. Don Vito Corleone règne sur l\'une des familles les plus puissantes de la mafia italo-américaine. Virgil Sollozzo, qui dirige la famille Tattaglia, lui propose de s\'associer sur un nouveau marché prometteur : le trafic de drogue, mais ',9,3),(8,'Le Parrain - 2e Partie','b42f3cb4881c932b0ca9a611aa7d3c1a','En 1901, en Sicile, le tout jeune Vito Andolini voit son père, son frère et sa mère assassinés par un parrain local. Il s\'enfuit vers les États-Unis, où les services de l\'immigration le rebaptisent Vito Corleone... Cinquante ans plus tard, aux États-',9,3),(9,'Interstellar','e689946b568f99d3899462f0a73b636e','Alors que la vie sur Terre touche à sa fin, un groupe d’explorateurs s’attelle à la mission la plus importante de l’histoire de l’humanité : franchir les limites de notre galaxie pour savoir si l’homme peut vivre sur une autre planète…',17,1),(10,'Fight Club','04181c7df65ed571a11a0a4f993c7d80','Insomniaque, désillusionné par sa vie personnelle et professionnelle, un jeune cadre expert en assurances, mène une vie monotone et sans saveur. Face à la vacuité de son existence, son médecin lui conseille de suivre une thérapie afin de relativiser ',1,18),(11,'Astérix & Obélix - Mission Cléopâtre','3e2230fbcda13c0ebc61e5ecb07ea481','A Alexandrie, en 52 av. J.-C., Cléopâtre, désireuse de prouver la supériorité du peuple égyptien, relève le défi lancé par l\'Empereur romain Jules César : construire un palais en trois mois ! Pour ce faire, Cléopâtre fait appel à l\'architecte Numérob',2,19),(12,'Scarface','d96056f3f4c73c07c99ca028dbe0ca6e','Antonio et Manny sont des malfrats expulsés par le régime communiste cubain. Arrivés à Miami, ils se frayent un chemin dans un nouveau monde criminel.',9,4),(13,'American History X','88432432416f3e146d815526f885b475','Dereck, un néo-nazi repenti après un passage en prison, est décidé à changer de vie et à sortir son jeune frère Danny de cette spirale.',9,5),(14,'Braveheart','c49d3396f7511292a0c83cc0fe80c6d2','Au XIIIe siècle, le roi Edouard Ier s\'empare du trône d\'Ecosse et instaure un régime répressif. Après le meurtre de sa femme par les anglais, William Wallace décide de lever une armée de paysans et de prendre la tête de l\'insurrection contre l\'occupa',9,1),(15,'Retour vers le futur','1dbe7d40f68ea149154782d40e6e5da6','En 1985, Marty, un adolescent comme les autres, mène une existence qu\'il juge morne et ennuyeuse. Heureusement, il est épris de la jolie Jennifer et entretient une profonde amitié avec Doc, un savant fou qui prétend avoir inventé une machine à explor',17,8),(16,'Le Seigneur des Anneaux - Le Retour du roi','f470e8f0071671dcc38330f225175cf2','La bataille pour la Terre du Milieu a commencé. Frodon et Sam, guidés par Gollum, poursuivent leur mission à travers les terres du Mordor pour détruire l\'Anneau Unique. Tandis que le pouvoir de Sauron grandit, Aragorn, l\'héritier du trône du Gondor, ',11,7),(17,'Le Fabuleux Destin d\'Amélie Poulain','0062ef38364de984447643e9f3d8fcc6','Amélie n\'est pas une jeune fille comme les autres. Son plus grand plaisir consiste à observer les gens. Amélie est décidée à faire le bien.',7,12),(18,'L\'Empire contre-attaque','d45166d6fd0079b487fc6e69c536087f','Malgré la destruction de l\'Etoile noire, l\'Empire règne toujours sur la galaxie. Un groupe de l\'Alliance rebelle, mené par la princesse Leia se réfugie sur la planète glacée de Hoth. Après avoir subi un assaut des troupes impériales, Leia, Han Solo, ',17,13),(19,'Les Duellistes','48f7f01cfea49ab4790f27dd0498e92c','En 1800, sous le Consulat de Bonaparte, l\'officier Armand d\'Hubert est chargé par le général Treillard de mettre aux arrêts le lieutenant Féraud. Ce dernier est accusé d\'avoir blessé le neveu du maire de Strasbourg lors d\'un duel. Vexé et s\'estimant ',13,10),(20,'Danse avec les loups','0ed5fc10878e6dc901b657b2228a2fd8','John est blessé pendant la guerre de Sécession. Il est alors muté dans un fort de l\'ouest sauvage, où ses seuls compagnons sont un loup solitaire et son cheval, jusqu\'à sa rencontre avec la tribu sioux qui vit aux alentours.',19,14),(21,'American Beauty','b9c0787659084bc1ebd46a0fe9415ce3','Lester Burnham, quadragénaire, mène une existence confortable et rangée. Mais quand il perd son emploi, il remet toute sa vie en question. Il décide de ne plus faire d\'efforts pour supporter son épouse acariâtre et sa fille en pleine crise d\'adolesce',9,15),(22,'Les Infiltrés','ebc13c83243794ead13820514b766054','Billy Costigan, agent de police, a infiltré depuis des années la pègre irlandaise de Boston, dirigée par le redoutable parrain Frank Costello. Colin Sullivan, lui, est un policier corrompu travaillant en sous-main pour le compte de Costello. Mais un ',18,11),(23,'Arrête-moi si tu peux','133498ffff5e710fae1f333f7c731f45','Dans les années soixante, le jeune Frank Abagnale Jr. est passé maître dans l\'art de l\'escroquerie, allant jusqu\'à détourner 2,5 millions de dollars et à figurer sur les listes du FBI comme l\'un des dix individus les plus recherchés des Etats-Unis. V',7,16),(24,'Le Dîner de cons','85d5f4c1a404013b15811e77f75aa988','Le passe-temps préféré d\'une bande d\'amis, satisfaits d\'eux-mêmes, consiste à se retrouver pour un dîner hebdomadaire où chacun doit amener avec lui un simple d\'esprit, dont la stupidité enchantera tout le monde. Pierre Brochant, éditeur en vogue, pe',7,17),(25,'Indiana Jones et le Temple maudit','dc5efcf154c36632ced35d0da6695580','À Shanghai, en 1935, l\'aventurier et archéologue Indiana Jones négocie l\'acquisition d\'une pierre magique avec le caïd Lao Che. Mais le ton monte entre les deux hommes. Aidé par un enfant chinois surnommé Demi-Lune, Indiana Jones prend la fuite en co',2,16);
/*!40000 ALTER TABLE `film` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre` (
  `id_genre` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_genre`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'action'),(2,'aventure'),(3,'anticipation'),(4,'braquage'),(5,'catastrophe'),(6,'capes et épées'),(7,'comédie'),(8,'criminel'),(9,'drame'),(10,'fantastique'),(11,'fantasy'),(12,'horreur'),(13,'historique'),(14,'opéra'),(15,'péplum'),(16,'romance'),(17,'science-fiction'),(18,'thriller'),(19,'western'),(20,'experimental');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `joue`
--

DROP TABLE IF EXISTS `joue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `joue` (
  `Id_film` int(11) NOT NULL,
  `Id_acteur` int(11) NOT NULL,
  PRIMARY KEY (`Id_film`,`Id_acteur`),
  KEY `id_acteur` (`Id_acteur`) USING BTREE,
  CONSTRAINT `joue_ibfk_1` FOREIGN KEY (`Id_film`) REFERENCES `film` (`id_film`) ON DELETE CASCADE,
  CONSTRAINT `joue_ibfk_2` FOREIGN KEY (`Id_acteur`) REFERENCES `acteur` (`Id_acteur`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `joue`
--

LOCK TABLES `joue` WRITE;
/*!40000 ALTER TABLE `joue` DISABLE KEYS */;
/*!40000 ALTER TABLE `joue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realisateur`
--

DROP TABLE IF EXISTS `realisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `realisateur` (
  `id_realisateur` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  `prenom` varchar(250) NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_realisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realisateur`
--

LOCK TABLES `realisateur` WRITE;
/*!40000 ALTER TABLE `realisateur` DISABLE KEYS */;
INSERT INTO `realisateur` VALUES (1,'Nolan','Christopher','fe024bc1e03cf58967a288ee5e6a4b74'),(2,'Leone','Sergio','ec75c0ca6c2d87c26eb529fd9fc31547'),(3,'Ford Coppola','Francis','f77270cd376000e84e1be4603eca18b0'),(4,'De Palma','Brian','e4b71e879e229e148f1b92e0f3f0106c'),(5,'Kaye','Tony','6b5137d00079df7e3e2f6a4d17bf6dfb'),(6,'Gibson','Mel','460651bf06ecc9f0a9b74c8810c8e9a8'),(7,'Jackson','Peter','919f04083a30cb2241a231d5dd717fec'),(8,'Zemeckis','Robert','cd73e9c32db42ba3bb2e61df720c0803'),(9,'Roberto','Benigni','cf223d5a534a0bb7b3afb11a2c24e0ee'),(10,'Scott','Ridley','3420b8cb5d0bd17548a043686eb694e2'),(11,'Scorsese','Martin','837434a06f4d5f8a64147b3aa34803f6'),(12,'Jeunet','Jean-Pierre','8892e7470beae46f61732312f34307d4'),(13,'Kershner','Irvin','18870e1d15d85e337ef2964b1011db69'),(14,'Costner','Kevin','85c74a3dd44861c51bed337443f5e59e'),(15,'Mendes','Sam','c6c96662c8a9c1c67aa3977e0fa31892'),(16,'Spielberg','Steven','a58d401e568b325c1856f2ef7cceb6a2'),(17,'Veber','Francis','75cf8df56873692614f55695c86aec3e'),(18,'Fincher','David','04a50b0b601e4a6ef65e74e204824d39'),(19,'Chabat','Alain','ea9e008154b8d78b27d213bb9a805b04');
/*!40000 ALTER TABLE `realisateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'client',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mousse','Mickey','mickey.mouse@dsny.com','$2a$10$v8lYihQD74wCcp/J6QhZXOFBrBtMTGyR4HMT6dLx3/ku1KueFoyBC','client'),(2,'Tanguy','Laurent','tang.laurent@hotmail.fr','$2a$10$dM3V0vTu1OihzR3slrr5Iudu9Kco3.v6u.M7LByqbnzPXBFLd9RO2','admin'),(3,'sommer','lisa','lisa.sommer@gmail.com','$2a$10$bmpMMcRiFjagftcc0P8fme65mc0WdM.95UoHAT1HPpJ9AA9hWMxSm','client');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-25 11:14:34
