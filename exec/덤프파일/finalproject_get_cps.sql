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
-- Table structure for table `get_cps`
--

DROP TABLE IF EXISTS `get_cps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `get_cps` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `cpsid` bigint NOT NULL,
  `subid` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKj8cckvojnsa8909t553jxdxi` (`cpsid`),
  KEY `FKaxa477l7rdixs86fx685b6qlm` (`subid`),
  CONSTRAINT `FKaxa477l7rdixs86fx685b6qlm` FOREIGN KEY (`subid`) REFERENCES `sub_user` (`sid`),
  CONSTRAINT `FKj8cckvojnsa8909t553jxdxi` FOREIGN KEY (`cpsid`) REFERENCES `compensation` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `get_cps`
--

LOCK TABLES `get_cps` WRITE;
/*!40000 ALTER TABLE `get_cps` DISABLE KEYS */;
INSERT INTO `get_cps` VALUES (1,'Request',18,6),(2,'Wait',12,6),(3,'Wait',20,6),(10,'Wait',27,1),(11,'Wait',28,4),(12,'Wait',29,4),(13,'Wait',30,4),(14,'Wait',31,4),(49,'Request',66,7),(50,'Request',67,7),(51,'Wait',68,58),(52,'Wait',69,58),(53,'Wait',70,59),(54,'Wait',71,44),(55,'Request',72,31),(56,'Request',73,31),(57,'Wait',74,31),(58,'Wait',75,31),(59,'Request',76,28),(60,'Wait',77,30),(61,'Request',78,28),(62,'Wait',79,7),(63,'Wait',80,65),(64,'Wait',81,65),(65,'Wait',82,66),(66,'Wait',83,67),(72,'Request',89,56),(73,'Wait',90,56),(74,'Wait',91,54),(75,'Wait',92,73);
/*!40000 ALTER TABLE `get_cps` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18  0:02:35
