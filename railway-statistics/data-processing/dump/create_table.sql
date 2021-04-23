-- MySQL dump 10.13  Distrib 5.7.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: railway_statistics
-- ------------------------------------------------------
-- Server version	5.7.30

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
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `company_id` int(10) unsigned NOT NULL,
  `company_code` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `company_name_alias` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `company_name_kana` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `company_type_id` int(10) unsigned NOT NULL,
  `length` float NOT NULL,
  `line_num` smallint(5) unsigned NOT NULL,
  `station_num` smallint(5) unsigned NOT NULL,
  `prefecture_id` int(10) unsigned NOT NULL,
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `corporate_color` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_UN` (`company_code`),
  KEY `FK_company_prefecture` (`prefecture_id`),
  KEY `FK_company_company_type` (`company_type_id`),
  CONSTRAINT `FK_company_company_type` FOREIGN KEY (`company_type_id`) REFERENCES `company_type` (`company_type_id`),
  CONSTRAINT `FK_company_prefecture` FOREIGN KEY (`prefecture_id`) REFERENCES `prefecture` (`prefecture_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_name_alias`
--

DROP TABLE IF EXISTS `company_name_alias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_name_alias` (
  `company_id` int(10) unsigned NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  UNIQUE KEY `company_name` (`company_name`),
  KEY `FK_company_name_alias_company` (`company_id`),
  CONSTRAINT `FK_company_name_alias_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_name_hist`
--

DROP TABLE IF EXISTS `company_name_hist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_name_hist` (
  `company_name_hist` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company_id` int(10) unsigned NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`company_name_hist`),
  KEY `FK_company_name_hist_company` (`company_id`),
  CONSTRAINT `FK_company_name_hist_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_statistics`
--

DROP TABLE IF EXISTS `company_statistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_statistics` (
  `company_id` int(10) unsigned NOT NULL,
  `year` year(4) NOT NULL,
  `transport_passengers_teiki_tsukin` int(10) unsigned DEFAULT NULL,
  `transport_passengers_teiki_tsugaku` int(10) unsigned DEFAULT NULL,
  `transport_passengers_teiki_total` int(10) unsigned DEFAULT NULL,
  `transport_passengers_teiki_percent` int(10) unsigned DEFAULT NULL,
  `transport_passengers_teikigai` int(10) unsigned DEFAULT NULL,
  `transport_passengers_teikigai_percent` int(10) unsigned DEFAULT NULL,
  `transport_passengers_sum` int(10) unsigned DEFAULT NULL,
  `transport_revenue_passenger_teiki_tsukin` int(10) unsigned DEFAULT NULL,
  `transport_revenue_passenger_teiki_tsugaku` int(10) unsigned DEFAULT NULL,
  `transport_revenue_passenger_teiki_total` int(10) unsigned DEFAULT NULL,
  `transport_revenue_passenger_teiki_percent` int(10) unsigned DEFAULT NULL,
  `transport_revenue_passenger_teikigai` int(10) unsigned DEFAULT NULL,
  `transport_revenue_passenger_teikigai_percent` int(10) unsigned DEFAULT NULL,
  `transport_revenue_passenger_total` int(10) unsigned DEFAULT NULL,
  `transport_revenue_passenger_baggage` int(10) unsigned DEFAULT NULL,
  `transport_revenue_passenger_total2` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`company_id`,`year`),
  CONSTRAINT `FK_company_statistics_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_type`
--

DROP TABLE IF EXISTS `company_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_type` (
  `company_type_id` int(10) unsigned NOT NULL,
  `company_type_code` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `company_type_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`company_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `line`
--

DROP TABLE IF EXISTS `line`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `line` (
  `line_id` int(10) unsigned NOT NULL,
  `line_code` varchar(50) COLLATE utf8mb4_bin NOT NULL,
  `company_id` int(10) unsigned NOT NULL,
  `line_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `line_name_alias` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `line_name_kana` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `status_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `station_num` int(10) unsigned DEFAULT NULL,
  `operating_kilo` float unsigned DEFAULT NULL,
  `real_kilo` float unsigned DEFAULT NULL,
  `gauge` int(10) unsigned DEFAULT NULL,
  `open_date` date DEFAULT NULL,
  `close_date` date DEFAULT NULL,
  PRIMARY KEY (`line_id`),
  UNIQUE KEY `line_code` (`line_code`),
  KEY `FK_line_company` (`company_id`),
  KEY `FK_line_status` (`status_id`),
  CONSTRAINT `FK_line_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`),
  CONSTRAINT `FK_line_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `line_section`
--

DROP TABLE IF EXISTS `line_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `line_section` (
  `line_id` int(10) unsigned NOT NULL,
  `section_id` int(10) unsigned NOT NULL,
  `line_section_name` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL,
  `start_station_id` int(10) unsigned NOT NULL,
  `end_station_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`line_id`,`section_id`),
  CONSTRAINT `FK_line_section_line` FOREIGN KEY (`line_id`) REFERENCES `line` (`line_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `line_section_line_station`
--

DROP TABLE IF EXISTS `line_section_line_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `line_section_line_station` (
  `line_id` int(10) unsigned NOT NULL,
  `section_id` int(10) unsigned NOT NULL,
  `sort_no` int(10) unsigned NOT NULL,
  `station_id` int(10) unsigned NOT NULL,
  `op_kilo` float unsigned DEFAULT NULL,
  `op_kilo_between` float unsigned DEFAULT NULL,
  `real_kilo` float unsigned DEFAULT NULL,
  `real_kilo_between` float unsigned DEFAULT NULL,
  PRIMARY KEY (`line_id`,`section_id`,`sort_no`),
  KEY `FK_line_section_line_station_line_station` (`line_id`,`station_id`),
  KEY `FK_line_section_line_station_station` (`station_id`),
  CONSTRAINT `FK_line_section_line_station_line_station` FOREIGN KEY (`line_id`, `station_id`) REFERENCES `line_station` (`line_id`, `station_id`),
  CONSTRAINT `FK_line_section_line_station_station` FOREIGN KEY (`station_id`) REFERENCES `station` (`station_id`),
  CONSTRAINT `FK_line_station_line_section` FOREIGN KEY (`line_id`, `section_id`) REFERENCES `line_section` (`line_id`, `section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `line_station`
--

DROP TABLE IF EXISTS `line_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `line_station` (
  `line_id` int(10) unsigned NOT NULL,
  `station_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`line_id`,`station_id`),
  KEY `FK_line_station_station` (`station_id`),
  CONSTRAINT `FK_line_station_line` FOREIGN KEY (`line_id`) REFERENCES `line` (`line_id`),
  CONSTRAINT `FK_line_station_station` FOREIGN KEY (`station_id`) REFERENCES `station` (`station_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `line_system`
--

DROP TABLE IF EXISTS `line_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `line_system` (
  `system_line_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `system_line_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`system_line_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `m_api_station`
--

DROP TABLE IF EXISTS `m_api_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `m_api_station` (
  `station_id` int(10) unsigned NOT NULL,
  `id` int(11) NOT NULL,
  `station_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `station_name_kana` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `line_id` int(10) unsigned NOT NULL,
  `prefecture_id` int(10) unsigned NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `status` tinyint(3) unsigned NOT NULL,
  `open_date` date DEFAULT NULL,
  `close_date` date DEFAULT NULL,
  `sort_no` int(10) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `uuid_aggr` bigint(20) unsigned DEFAULT NULL,
  `uuid` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`station_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `prefecture`
--

DROP TABLE IF EXISTS `prefecture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prefecture` (
  `prefecture_id` int(10) unsigned NOT NULL,
  `prefecture_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `region_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`prefecture_id`),
  KEY `FK_prefecture_region` (`region_id`),
  CONSTRAINT `FK_prefecture_region` FOREIGN KEY (`region_id`) REFERENCES `region` (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `region` (
  `region_id` int(10) unsigned NOT NULL,
  `region_code` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  `region_name` varchar(255) COLLATE utf8mb4_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `station`
--

DROP TABLE IF EXISTS `station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `station` (
  `station_id` int(10) unsigned NOT NULL,
  `company_id` int(10) unsigned NOT NULL,
  `station_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `station_name_kana` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `station_name_wiki` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `prefecture_id` int(10) unsigned NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `status_id` tinyint(3) unsigned NOT NULL,
  `open_date` date DEFAULT NULL,
  `close_date` date DEFAULT NULL,
  PRIMARY KEY (`station_id`),
  KEY `FK_station_company` (`company_id`),
  KEY `FK_station_prefecture` (`prefecture_id`),
  KEY `FK_station_status` (`status_id`),
  CONSTRAINT `FK_station_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`company_id`),
  CONSTRAINT `FK_station_prefecture` FOREIGN KEY (`prefecture_id`) REFERENCES `prefecture` (`prefecture_id`),
  CONSTRAINT `FK_station_status` FOREIGN KEY (`status_id`) REFERENCES `status` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `station_group`
--

DROP TABLE IF EXISTS `station_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `station_group` (
  `station_group_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`station_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `station_group_station`
--

DROP TABLE IF EXISTS `station_group_station`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `station_group_station` (
  `station_group_id` int(10) unsigned NOT NULL,
  `station_id` int(10) unsigned NOT NULL,
  KEY `FK__station_group` (`station_group_id`),
  KEY `FK__station` (`station_id`),
  CONSTRAINT `FK__station` FOREIGN KEY (`station_id`) REFERENCES `station` (`station_id`),
  CONSTRAINT `FK__station_group` FOREIGN KEY (`station_group_id`) REFERENCES `station_group` (`station_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `status_id` tinyint(3) unsigned NOT NULL,
  `status_name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_passengers`
--

DROP TABLE IF EXISTS `t_passengers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_passengers` (
  `station_id` bigint(20) unsigned NOT NULL,
  `year` smallint(5) unsigned NOT NULL,
  `num_i` int(10) unsigned DEFAULT NULL,
  `num_o` int(10) unsigned DEFAULT NULL,
  `num_io` int(10) unsigned DEFAULT NULL,
  `reference_title` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `reference_url` text COLLATE utf8mb4_bin,
  `reference_last_access_date` date DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_bin,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`station_id`,`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-16 23:31:50
