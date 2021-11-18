-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: k5d205.p.ssafy.io    Database: finalproject
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followme_asset`
--

DROP TABLE IF EXISTS `followme_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followme_asset` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `img_link` varchar(255) DEFAULT NULL,
  `level` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `followme_model_id` bigint NOT NULL,
  `followme_model` bigint NOT NULL,
  `class_number` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKyoge5jc22kmdgivs5219q3c0` (`level`),
  CONSTRAINT `FKyoge5jc22kmdgivs5219q3c0` FOREIGN KEY (`level`) REFERENCES `followme_model` (`level`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followme_asset`
--

LOCK TABLES `followme_asset` WRITE;
/*!40000 ALTER TABLE `followme_asset` DISABLE KEYS */;
INSERT INTO `followme_asset` VALUES (1,'https://k5d205.p.ssafy.io/api/img/followme1/crane2.PNG',1,'학',0,0,1,NULL),(2,'https://k5d205.p.ssafy.io/api/img/followme1/butterfly.png',1,'나비',0,0,2,NULL),(3,'https://k5d205.p.ssafy.io/api/img/followme1/dog.png',1,'강아지',0,0,3,NULL),(4,'https://k5d205.p.ssafy.io/api/img/followme1/chicken.png',1,'닭',0,0,4,NULL),(5,'https://k5d205.p.ssafy.io/api/img/followme1/gorilla.png',1,'고릴라',0,0,5,NULL),(7,'https://k5d205.p.ssafy.io/api/img/followme1/eagle.png',1,'독수리',0,0,6,NULL),(17,'https://k5d205.p.ssafy.io/api/img/followme1/bearexc.png',1,'곰',0,0,7,NULL),(18,'https://k5d205.p.ssafy.io/api/img/followme1/swan.png',1,'백조',0,0,8,NULL),(19,'https://k5d205.p.ssafy.io/api/img/followme1/alligator.png',1,'악어',0,0,9,NULL);
/*!40000 ALTER TABLE `followme_asset` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18  0:02:40
