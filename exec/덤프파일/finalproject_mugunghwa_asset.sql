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
-- Table structure for table `mugunghwa_asset`
--

DROP TABLE IF EXISTS `mugunghwa_asset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mugunghwa_asset` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `img_link` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `level` bigint NOT NULL,
  `class_number` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp8nx5rx540qaxehqp05016hhg` (`level`),
  CONSTRAINT `FKp8nx5rx540qaxehqp05016hhg` FOREIGN KEY (`level`) REFERENCES `mugunghwa_model` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mugunghwa_asset`
--

LOCK TABLES `mugunghwa_asset` WRITE;
/*!40000 ALTER TABLE `mugunghwa_asset` DISABLE KEYS */;
INSERT INTO `mugunghwa_asset` VALUES (31,'https://k5d205.p.ssafy.io/api/img/mugung1/1.png','1번자세',1,1,'허리를 굽히고 팔을 뻗자!'),(32,'https://k5d205.p.ssafy.io/api/img/mugung1/2.png','2번자세',1,2,'달리기를 하듯이'),(33,'https://k5d205.p.ssafy.io/api/img/mugung1/3.png','3번자세',1,3,'한쪽 다리를 굽히고 팔은 하늘위로'),(34,'https://k5d205.p.ssafy.io/api/img/mugung1/4.png','4번자세',1,4,NULL),(35,'https://k5d205.p.ssafy.io/api/img/mugung1/5.png','5번자세',1,5,NULL),(36,'https://k5d205.p.ssafy.io/api/img/mugung1/6.png','6번자세',1,6,NULL),(37,'https://k5d205.p.ssafy.io/api/img/mugung1/7.png','7번자세',1,7,NULL),(38,'https://k5d205.p.ssafy.io/api/img/mugung1/8.png','8번자세',1,8,NULL),(39,'https://k5d205.p.ssafy.io/api/img/mugung1/9.png','9번자세',1,9,'양반다리를 하고 허리를 쫙'),(40,'https://k5d205.p.ssafy.io/api/img/mugung1/10.png','10번자세',1,10,'');
/*!40000 ALTER TABLE `mugunghwa_asset` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18  0:02:34
