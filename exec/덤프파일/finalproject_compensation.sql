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
-- Table structure for table `compensation`
--

DROP TABLE IF EXISTS `compensation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `compensation` (
  `cid` bigint NOT NULL AUTO_INCREMENT,
  `basic` bit(1) NOT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `pid` bigint NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `FKbw3k6doe26yauj0emlxjd1809` (`pid`),
  CONSTRAINT `FKbw3k6doe26yauj0emlxjd1809` FOREIGN KEY (`pid`) REFERENCES `main_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compensation`
--

LOCK TABLES `compensation` WRITE;
/*!40000 ALTER TABLE `compensation` DISABLE KEYS */;
INSERT INTO `compensation` VALUES (12,_binary '\0','삼국지1','삼국지 읽어주세요',1),(18,_binary '\0','삼국지1','삼국지 읽어주세요',1),(20,_binary '\0','testtest','test 보상입니다.',2),(27,_binary '\0','삼국지 읽기','자기 전 책 한권 더 읽어주기',1),(28,_binary '\0','d','테스트세트스테스트테스트',74),(29,_binary '\0','d','테스토스테론테스트세트테스트',74),(30,_binary '\0','d','감자탕',74),(31,_binary '\0',NULL,'감자탕',74),(36,_binary '\0','','ㅁㅁㅁ',53),(37,_binary '\0','','얘는 왜 안돼',53),(38,_binary '\0','','되네',53),(39,_binary '\0','','모상',53),(45,_binary '\0','','asdf',53),(47,_binary '\0','','ㅁㅁ',53),(49,_binary '\0','','aaaaa',53),(57,_binary '\0','','sss',53),(66,_binary '\0','','마이쭈 1개',53),(67,_binary '\0','','유튜브 영상 1개 시청',53),(68,_binary '\0','','마이쮸 한 개 먹기',83),(69,_binary '\0','','타요 영상 1회 시청',83),(70,_binary '\0','','초콜릿 한 개 먹기',83),(71,_binary '\0','','뿌링클치킨',81),(72,_binary '\0','','1',77),(73,_binary '\0','','2',77),(74,_binary '\0','','3',77),(75,_binary '\0','','4',77),(76,_binary '\0','','test',75),(77,_binary '\0','','ccccc',75),(78,_binary '\0','','qweqwe',75),(79,_binary '\0','','초콜렛 2개 먹기',53),(80,_binary '\0','','ㅈㅂㅈ',84),(81,_binary '\0','','초콜릿 1개',84),(82,_binary '\0','','ddddd',84),(83,_binary '\0','','초콜릿 1개',84),(89,_binary '\0','','자기 전 동화책 읽어 주기',82),(90,_binary '\0','','한 시간 부모님이랑 더 놀기',82),(91,_binary '\0','','마이쭈 하나',53),(92,_binary '\0','','초콜릿 1개',88),(93,_binary '\0','','초콜릿 1개',88);
/*!40000 ALTER TABLE `compensation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18  0:02:38
