-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: productmanagmentdb
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `merchant_id` int NOT NULL,
  `category_id` int NOT NULL,
  `title` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `url` text COLLATE utf8_unicode_ci,
  `price` decimal(10,0) NOT NULL,
  `msrp` decimal(10,0) DEFAULT NULL,
  `available` tinyint NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `merchant_id_idx` (`merchant_id`),
  KEY `category_id_idx` (`category_id`,`merchant_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `merchant_id` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (125,1,1,' golfs','http://www.lifestylelabels.com/womens-golf-shoes.html',159,0,0,'Sporting with style, this is a durable and super-comfortable golf shoe built for performance.','2020-02-10 10:44:03','2020-02-10 12:02:59'),(126,1,1,'womens golf shoes','http://www.lifestylelabels.com/womens-golf-shoes.html',159,0,0,'Sporting with style, this is a durable and super-comfortable golf shoe built for performance.','2020-02-10 10:44:45','2020-02-10 10:44:45'),(127,1,1,'womens golf shoes','http://www.lifestylelabels.com/womens-golf-shoes.html',159,0,0,'Sporting with style, this is a durable and super-comfortable golf shoe built for performance.','2020-02-10 10:46:03','2020-02-10 10:46:03'),(138,1,1,'mens golf shoes','http://www.lifestylelabels.com/womens-golf-shoes.html',159,0,0,'Sporting with style, this is a durable and super-comfortable golf shoe built for performance.','2020-02-10 14:29:04','2020-02-10 14:29:04');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-11  1:00:48
