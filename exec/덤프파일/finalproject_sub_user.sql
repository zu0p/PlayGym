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
-- Table structure for table `sub_user`
--

DROP TABLE IF EXISTS `sub_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_user` (
  `sid` int unsigned NOT NULL AUTO_INCREMENT,
  `age` int NOT NULL,
  `exp` int NOT NULL,
  `nick_name` varchar(255) NOT NULL,
  `tall` int NOT NULL,
  `weight` int NOT NULL,
  `cid` bigint DEFAULT NULL,
  `mainuser` bigint NOT NULL,
  `level` int DEFAULT NULL,
  `max` int NOT NULL DEFAULT '100',
  PRIMARY KEY (`sid`),
  KEY `FK2xcuo05afjc42jlbmnt6es30x` (`cid`),
  KEY `FKfbcrkvl80i11gtir9dawm6q60` (`mainuser`),
  CONSTRAINT `FK2xcuo05afjc42jlbmnt6es30x` FOREIGN KEY (`cid`) REFERENCES `get_ct` (`id`),
  CONSTRAINT `FKfbcrkvl80i11gtir9dawm6q60` FOREIGN KEY (`mainuser`) REFERENCES `main_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_user`
--

LOCK TABLES `sub_user` WRITE;
/*!40000 ALTER TABLE `sub_user` DISABLE KEYS */;
INSERT INTO `sub_user` VALUES (1,5,0,'사빠',90,22,1,73,1,100),(2,5,0,'child1',130,20,2,72,1,100),(3,3,100,'test122',90,20,3,71,1,100),(4,3,0,'유니유니',178,83,4,74,1,100),(5,3,0,'니유니유',90,20,5,74,1,100),(6,5,0,'ssafy의1',100,20,6,2,1,100),(7,6,0,'주영이',100,67,52,53,3,250),(8,3,0,'test',101,25,8,70,1,100),(28,3,200,'etst1',90,20,14,75,3,200),(30,4,0,'cheeck',99,33,16,75,1,100),(31,3,150,'유니니유',90,20,17,77,3,200),(33,3,0,'1633',90,20,19,78,1,100),(34,7,0,'tom',112,12,20,73,1,100),(36,6,30,'ryan',80,20,22,73,1,100),(37,5,0,'scott',70,15,23,73,1,100),(44,7,90,'test123',171,68,30,81,1,100),(54,3,0,'ssafy1',90,20,80,53,2,150),(56,3,0,'응애',104,19,75,82,2,150),(58,4,0,'봉봉이',98,39,47,83,1,100),(59,3,0,'붕붕이',79,21,48,83,1,100),(60,5,0,'붕붕이',105,33,49,83,1,100),(61,3,0,'sss',90,20,50,53,6,350),(62,3,175,'asdasd',90,20,58,77,1,100),(65,3,0,'check',112,30,63,84,1,100),(66,3,0,'qwe123',90,20,64,84,1,100),(67,3,0,'qwe123',91,24,65,84,1,100),(68,3,0,'qwe123',93,27,66,75,1,100),(69,6,0,'삼삼이',157,73,70,53,1,100),(70,6,0,'aaa',107,84,71,53,1,100),(73,3,30,'키큰이',90,20,77,88,1,100),(74,5,0,'서녕이바보',139,58,81,53,1,100);
/*!40000 ALTER TABLE `sub_user` ENABLE KEYS */;
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
