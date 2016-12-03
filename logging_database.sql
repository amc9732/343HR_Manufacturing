-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: logging_database
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accountinglog`
--

DROP TABLE IF EXISTS `accountinglog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accountinglog` (
  `id` int(11) NOT NULL,
  `severity` int(11) DEFAULT NULL,
  `message` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accountinglog`
--

LOCK TABLES `accountinglog` WRITE;
/*!40000 ALTER TABLE `accountinglog` DISABLE KEYS */;
INSERT INTO `accountinglog` VALUES (0,6,'Report Created - December 2016');
/*!40000 ALTER TABLE `accountinglog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customersupportlog`
--

DROP TABLE IF EXISTS `customersupportlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customersupportlog` (
  `id` int(11) NOT NULL,
  `severity` int(11) DEFAULT NULL,
  `message` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customersupportlog`
--

LOCK TABLES `customersupportlog` WRITE;
/*!40000 ALTER TABLE `customersupportlog` DISABLE KEYS */;
INSERT INTO `customersupportlog` VALUES (0,6,'Ticket: 000000001 resolved');
/*!40000 ALTER TABLE `customersupportlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `humanresourceslog`
--

DROP TABLE IF EXISTS `humanresourceslog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `humanresourceslog` (
  `id` int(11) NOT NULL,
  `severity` int(11) DEFAULT NULL,
  `message` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `humanresourceslog`
--

LOCK TABLES `humanresourceslog` WRITE;
/*!40000 ALTER TABLE `humanresourceslog` DISABLE KEYS */;
INSERT INTO `humanresourceslog` VALUES (0,6,'Employee: Kenn Martinez added to system');
/*!40000 ALTER TABLE `humanresourceslog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventorylog`
--

DROP TABLE IF EXISTS `inventorylog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inventorylog` (
  `id` int(11) NOT NULL,
  `severity` int(11) DEFAULT NULL,
  `message` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventorylog`
--

LOCK TABLES `inventorylog` WRITE;
/*!40000 ALTER TABLE `inventorylog` DISABLE KEYS */;
INSERT INTO `inventorylog` VALUES (0,5,'Low Quantity: Black Body'),(1,6,'Shipment Received: Black Body - 1000 units');
/*!40000 ALTER TABLE `inventorylog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturinglog`
--

DROP TABLE IF EXISTS `manufacturinglog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manufacturinglog` (
  `id` int(11) NOT NULL,
  `severity` int(11) DEFAULT NULL,
  `message` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturinglog`
--

LOCK TABLES `manufacturinglog` WRITE;
/*!40000 ALTER TABLE `manufacturinglog` DISABLE KEYS */;
INSERT INTO `manufacturinglog` VALUES (0,6,'Wearable ID:WF0000000BB Sucessfully Manufactured'),(1,5,'Low Quantity: Touch Screen');
/*!40000 ALTER TABLE `manufacturinglog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saleslog`
--

DROP TABLE IF EXISTS `saleslog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `saleslog` (
  `id` int(11) NOT NULL,
  `severity` int(11) DEFAULT NULL,
  `message` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saleslog`
--

LOCK TABLES `saleslog` WRITE;
/*!40000 ALTER TABLE `saleslog` DISABLE KEYS */;
INSERT INTO `saleslog` VALUES (0,6,'Order: 0000001 Completed');
/*!40000 ALTER TABLE `saleslog` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-02 22:25:48
