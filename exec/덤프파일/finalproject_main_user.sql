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
-- Table structure for table `main_user`
--

DROP TABLE IF EXISTS `main_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ioky918eo39yuh3hcdms2365` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_user`
--

LOCK TABLES `main_user` WRITE;
/*!40000 ALTER TABLE `main_user` DISABLE KEYS */;
INSERT INTO `main_user` VALUES (1,'ssafy@ssafy.com','admin','{bcrypt}$2a$10$8iovVyOcrzd3wvi.MmkS1OjmbwHSWs8ZsOndad23IcqD3w4Hq7LFO','123','admin'),(2,'ssafy@ssafy.com','문영화','{bcrypt}$2a$10$VedaRyL/cyHhenOQDTTF1e11J.UZcNgNv2/F7czeWCsqBxbL4i5je','01012345678','ssafy1'),(6,'0522305@ssafy.com','여정동','{bcrypt}$2a$10$J516EJ/OKkHlONx4D/FT/e6SBkaU316kbArQNXouCXlMZ9rMIz1Ie','01038747571','jeongdong'),(7,'0522305@ssafy.com','여정동','{bcrypt}$2a$10$jZ3jIyL/9n3zXfNVZAyN6eqx7CQSah25JUr9FAyAPGS0rFQD7Pqya','01038747571','jeongdong2'),(8,'0522305@ssafy.com','여정동','{bcrypt}$2a$10$0GgfifZnrBhv3igHBvSW8uZGG.LlmQYNG0Zh/yTh4S.iPq98GA0I.','01038747571','jeongdong4'),(9,'juyeong@ssafy.com','박주영이','{bcrypt}$2a$10$nLJsAJZAP6nsqQ.U0VdhBOHRXaUq1U85lqjVee50EDwvz47fRSFX.','01033334444','ssafyssafy'),(19,'ssafy@ssafy.com','박주영','{bcrypt}$2a$10$8J8WCN7/dmJMsyzcu/Q4jeeAfUmQ/kxJvbjO3.AvBtGVIw7PjLMOO','01012341234','ssafyssafy9'),(21,'ssafy@ssafy.com','박주영','{bcrypt}$2a$10$zlLbLVLH1.TO2LAoKIcrGuq91l13KLX2DmtnSMBomGyUxuVaBckbW','01012341234','ssafyssafy10'),(22,'ssafy@ssafy.com','박주영','{bcrypt}$2a$10$/y6vUYca2O7ayOkyLsyfhOI.Q0jbWyC1yiDHlKAn6wDte8VHvxOcC','01012341234','ssafyssafy11'),(24,'ssafy@ssafy.com','박주영','{bcrypt}$2a$10$Trxzozhg12KTek2sKuYakuZA5m6BduXS2NR4LxlA3Ioaky4pLtTSK','01012341234','ssafyssafy12'),(25,'ssafy@ssafy.com','박주영','{bcrypt}$2a$10$jV.NPA1alZUjEC3RAYMm/u8eXNvcjafXpym5YGkMjw9znPz4F0CbG','01012341234','ssafyssafy14'),(26,'ssafy@ssafy.com','박주영','{bcrypt}$2a$10$ouszuzRhUQ.KpNENfb/lkuJDklMCBRGe6p2Vvi8yvwfq5k6gfYcie','01012341234','ssafyssafy15'),(27,'ssafy@ssafy.com','박주영','{bcrypt}$2a$10$yyYvO4Pc/fLXGMhYBuUYhekx8meYFr8WwR76gly9B2aA5s.fZ8pky','01012341234','ssafyssafy16'),(33,'ssafy@ssafy.com','여정동','{bcrypt}$2a$10$BPEfjjRREijvWV45vGpQCujxuoyDov3ZqteV9wR.f4DIw83B.pCYK','01012341234','dongdong'),(38,'ssafy@ssafy.com','박주영','{bcrypt}$2a$10$cSavfJQb39ycVsGA7AQB9.acdNc.D31AtRk6kkUNpvBvKdlCvF3hm','asdfasdfasdf','ssafyssafy24'),(40,'ssafy@ssafy.com','박주영이','{bcrypt}$2a$10$OKE.Cs2cmtPC7h6iYks4yukJwCWHTKRLXCCs7Ff8Y8hL/8F6KIsbi','01012341234','ssafyssafy26'),(47,'ssafy@ssafy.com','admin','{bcrypt}$2a$10$wVgAQqsEnKJIxjsPkS55e./C.TaBOkPEAYiKQ9RSI00InsDMJI1Fq','123','ansansans2'),(51,'asdasdasd@asd.com','asdasdasd','{bcrypt}$2a$10$4Ovoy8fMTbMUufhdgsqh/OtJkhqG1bMxby44MAlumNC7UKE5bI.t6','01099661931','asdasdasd'),(53,'zu0p@ssafy.com','박주영이','{bcrypt}$2a$10$aA6LUF/iq72obTqQWD7a/OT7xmKIS.3FFCHZSmRk3cQ4W1ki.VpoW','01012345678','ssafyssafy30'),(54,'asd@asd.com','asdasd','{bcrypt}$2a$10$GmqXeyHkYfSXwjDEyAKX2.wVw9u3/MG4Si1huoovPx672Bmwgiu8K','01099661931','testest1'),(56,'asdasd@asdasd.com','나나','{bcrypt}$2a$10$IZhm.gmqtktmbaR3rZNdUul.OCBXwtvLMEu.fR.x5.VRfhQcwQnWK','01099661931','asdasd'),(60,'ssafy33@ssafy.com','test','{bcrypt}$2a$10$8NAEhouv2Lz3/YjWT0FuMOE2yVbCO9MITQMkNqCiYUisRxL9wh2Fy','01012345678','testtest'),(61,'ssafy33@ssafy.com','test','{bcrypt}$2a$10$9k79MRuQ/djrNTSrYI9.h.Z45EWJiBXcn0lH1DnjjYaqHY3LkYCSy','01012345678','testtest1'),(62,'ssafy33@ssafy.com','test','{bcrypt}$2a$10$/Da/XIBKgfxDPgSWbZFqAO0Ddc/WLlJMplFRsB90YNFus0v7LxZQO','01012345678','testtest13'),(66,'ssafy33@ssafy.com','test','{bcrypt}$2a$10$zoB2GZSTgdgBRU/0augU/e5IkJDtNalSroxWxkpFsezACSGPuCkVS','01012345678','testtest134'),(69,'ssafy33@ssafy.com','test','{bcrypt}$2a$10$4rsnE1Xe9Jwyj661uwCL5uP.HBDJsaaNSBX09mTa5qX0OosjBs9YW','01012345678','testtest5'),(70,'ssafy33@ssafy.com','test','{bcrypt}$2a$10$TyXQpBjPje72Www78AVdce9VRD2xop7az69OM9jLZ3rg177aN7K36','01012345678','testtest55'),(71,'cember@test.com','최정훈','{bcrypt}$2a$10$brcTjmEtVxJ2ZidWUicJA.TQ1/f8Z2.0xnTWNQssdtUzE2k5a9zVS','01049498707','cember123'),(72,'asdj@asd.com','김동윤','{bcrypt}$2a$10$uNG/DPr61vymC9XktPxkf.I64cK2EgQjOj2AhAGaGmSDUUNtjW4Wq','01099661931','asdasd1'),(73,'ssafy@ssafy.com','김동윤','{bcrypt}$2a$10$FpT5J38crpvDNJ2Mh4SeyOdRYhePwcr6Q0PiD1gPlTUEVrAOw21G.','01012341234','ssafyssafy100'),(74,'zxcoihjasd@asioldj.com','김동윤','{bcrypt}$2a$10$Z.sO.xswqq06051gllEy5e/GliWR7xaweSwMhdyVYWdAFEBX9kpFq','01099661931','asdasd2'),(75,'test21@test.com','최정훈','{bcrypt}$2a$10$NBqDnmlgX0abIBweNYoUM.6cBa9IspCN3vAwp9O2N5dwYX4rI0blW','01011112222','test123'),(76,'asda2@asda.com','김동윤','{bcrypt}$2a$10$QMMp5JSrumOPxmwQNaFCpexF0k3slYXdLPQHxCzOHp6jyhZoGuWvW','01099661931','asdasd3'),(77,'asdasd@casd.ocm','김동윤','{bcrypt}$2a$10$xH0OwJpqi6n4GZwufsEGXuTguHuePjht/tV64kV5PeQa96n5RZTk6','01099661931','asdasd4'),(78,'asdas@asd.com','rlaehddbs','{bcrypt}$2a$10$KPB2SFR.5yd5pi3kzlUzIONMjNHBlC.xG863MnbEA2bPyXVTlyg9K','01099661931','asdasd5'),(80,'test@test.com','test','{bcrypt}$2a$10$A/5hvPBUg/t8y47.iSReLuzQTGVC8qwWzMCS.YOMGAMxg6XNkc.um','01010000000','test'),(81,'test@test.com','test','{bcrypt}$2a$10$BKeHT/h/Yj2tpVgCQjWQleAlc2aEqTrBF0M/YXcz0VpLXIzT.hnoe','01000000000','test12345'),(82,'anqdl@naver.com','문영화이','{bcrypt}$2a$10$79Im47bYBIenvEdA0KB15uYUpzBSXvfxU3b6rS0CwYzqCrPefBTui','01068581589','ansdudghk'),(83,'fortest@ssafy.com','테스트','{bcrypt}$2a$10$wMihluqyAzLXgi966XbZxe6HYG8cQGe/k4cM0YM0iIud5kN4vQJUm','01012345678','fortest'),(84,'test1@test1.com','test1','{bcrypt}$2a$10$DYDxYAlc1yYOq6SmwjbJX.1txeM4.pSAR5Qkqg51lp20XulEgBByW','010-1111-1111','test12'),(85,'qwer123@naver.com','최정훈','{bcrypt}$2a$10$adGutxgJpfGvV2g.ccW5vOrFQfQ1mPNt1LkJZRyYoXSok9k/0zxaO','010-4444-5555','qwer1234'),(86,'cember123@gmai.com','최정훈','{bcrypt}$2a$10$oLjh/uTc8r/PG6Pbyn8EIO5olARvEsPT2EIKLzE.BuSthWvPW7CTq','010-1233-4567','wjdgns123'),(88,'cember12@gmail.com','최정훈','{bcrypt}$2a$10$YaVC0Yl49/xMj9oCZ6GHUOKzZJEMNEMXitf14V5hjf.VZnayV7l.i','010-1111-4444','wjdgns12');
/*!40000 ALTER TABLE `main_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18  0:02:37
