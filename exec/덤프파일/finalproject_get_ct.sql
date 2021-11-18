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
-- Table structure for table `get_ct`
--

DROP TABLE IF EXISTS `get_ct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `get_ct` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `ctid` bigint NOT NULL,
  `sid` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdcy5i8prnfhshwqloyg1ye0cp` (`ctid`),
  KEY `FKgrt93qgq62ib6uj202rtig70x` (`sid`),
  CONSTRAINT `FKdcy5i8prnfhshwqloyg1ye0cp` FOREIGN KEY (`ctid`) REFERENCES `characters` (`id`),
  CONSTRAINT `FKgrt93qgq62ib6uj202rtig70x` FOREIGN KEY (`sid`) REFERENCES `sub_user` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `get_ct`
--

LOCK TABLES `get_ct` WRITE;
/*!40000 ALTER TABLE `get_ct` DISABLE KEYS */;
INSERT INTO `get_ct` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,2,5),(6,1,6),(7,1,7),(8,1,8),(14,1,28),(16,2,30),(17,1,31),(19,1,33),(20,2,34),(22,4,36),(23,1,37),(30,1,44),(35,2,31),(41,2,54),(43,3,31),(44,4,31),(45,1,56),(47,1,58),(48,2,59),(49,3,60),(50,3,61),(51,2,7),(52,3,7),(53,4,7),(54,2,28),(55,3,28),(56,4,28),(57,2,62),(58,1,62),(59,3,62),(60,4,62),(63,1,65),(64,2,66),(65,3,67),(66,1,68),(67,1,61),(68,2,61),(69,4,61),(70,1,69),(71,1,70),(73,2,56),(74,3,56),(75,4,56),(77,1,73),(78,1,54),(79,3,54),(80,4,54),(81,2,74);
/*!40000 ALTER TABLE `get_ct` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18  0:02:42
