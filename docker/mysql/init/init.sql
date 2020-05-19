-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: laravel_sandbox
-- ------------------------------------------------------
-- Server version	8.0.20

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
-- Table structure for table `prefecture`
--

DROP TABLE IF EXISTS `prefecture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prefecture` (
  `prefecture_id` int unsigned NOT NULL,
  `region_id` int unsigned NOT NULL,
  `prefecture_name` varchar(255) NOT NULL,
  `prefecture_name_kana` varchar(255) NOT NULL,
  PRIMARY KEY (`prefecture_id`),
  KEY `FK_prefecture_region` (`region_id`),
  CONSTRAINT `FK_prefecture_region` FOREIGN KEY (`region_id`) REFERENCES `region` (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prefecture`
--

LOCK TABLES `prefecture` WRITE;
/*!40000 ALTER TABLE `prefecture` DISABLE KEYS */;
INSERT INTO `prefecture` VALUES (1,1,'北海道','ホッカイドウ'),(2,2,'青森県','アオモリケン'),(3,2,'岩手県','イワテケン'),(4,2,'宮城県','ミヤギケン'),(5,2,'秋田県','アキタケン'),(6,2,'山形県','ヤマガタケン'),(7,2,'福島県','フクシマケン'),(8,3,'茨城県','イバラキケン'),(9,3,'栃木県','トチギケン'),(10,3,'群馬県','グンマケン'),(11,3,'埼玉県','サイタマケン'),(12,3,'千葉県','チバケン'),(13,3,'東京都','トウキョウト'),(14,3,'神奈川県','カナガワケン'),(15,4,'新潟県','ニイガタケン'),(16,4,'富山県','トヤマケン'),(17,4,'石川県','イシカワケン'),(18,4,'福井県','フクイケン'),(19,4,'山梨県','ヤマナシケン'),(20,4,'長野県','ナガノケン'),(21,4,'岐阜県','ギフケン'),(22,4,'静岡県','シズオカケン'),(23,4,'愛知県','アイチケン'),(24,5,'三重県','ミエケン'),(25,5,'滋賀県','シガケン'),(26,5,'京都府','キョウトフ'),(27,5,'大阪府','オオサカフ'),(28,5,'兵庫県','ヒョウゴケン'),(29,5,'奈良県','ナラケン'),(30,5,'和歌山県','ワカヤマケン'),(31,6,'鳥取県','トットリケン'),(32,6,'島根県','シマネケン'),(33,6,'岡山県','オカヤマケン'),(34,6,'広島県','ヒロシマケン'),(35,6,'山口県','ヤマグチケン'),(36,7,'徳島県','トクシマケン'),(37,7,'香川県','カガワケン'),(38,7,'愛媛県','エヒメケン'),(39,7,'高知県','コウチケン'),(40,8,'福岡県','フクオカケン'),(41,8,'佐賀県','サガケン'),(42,8,'長崎県','ナガサキケン'),(43,8,'熊本県','クマモトケン'),(44,8,'大分県','オオイタケン'),(45,8,'宮崎県','ミヤザキケン'),(46,8,'鹿児島県','カゴシマケン'),(47,8,'沖縄県','オキナワケン');
/*!40000 ALTER TABLE `prefecture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `region_id` int unsigned NOT NULL,
  `region_name` varchar(255) NOT NULL,
  `region_name_kana` varchar(255) NOT NULL,
  PRIMARY KEY (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'北海道','ホッカイドウ'),(2,'東北','トウホク'),(3,'関東','カントウ'),(4,'中部','チュウブ'),(5,'近畿','キンキ'),(6,'中国','チュウゴク'),(7,'四国','シコク'),(8,'九州','キュウシュウ');
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-19 16:38:25
