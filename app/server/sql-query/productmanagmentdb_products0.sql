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
  `available` tinyint NOT NULL DEFAULT '0',
  `description` text COLLATE utf8_unicode_ci,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `default_image` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `merchant_id_idx` (`merchant_id`),
  KEY `category_id_idx` (`category_id`,`merchant_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `merchant_id` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`merchant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (154,2,5,'retert','ouioui',98,8,1,'eqweqwe','2020-02-13 14:26:53','2020-02-13 14:26:53','http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/w/s/wsn001.jpg'),(156,2,5,'good dress','jkh',768,0,1,'22321312rdgfd','2020-02-13 14:28:27','2020-02-13 19:04:57','http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/w/d/wd009.jpeg'),(157,2,3,'nice','jkh',768,0,1,'22321312rdgfd','2020-02-13 14:28:50','2020-02-13 21:41:52','http://lifestylelabels.com/pub/media/catalog/product/cache/1/image/e9c3970ab036de70892d86c6d221abfe/i/s/istock_90539235_large_1.jpg'),(159,2,3,'jacket','jkh',768,0,1,'22321312rdgfd','2020-02-13 14:29:05','2020-02-13 21:10:59','http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg'),(160,2,3,'kjkj','jkh',768,0,1,'22321312rdgfd','2020-02-13 14:29:14','2020-02-13 14:29:14','http://lifestylelabels.com/pub/media/catalog/product/cache/1/image/e9c3970ab036de70892d86c6d221abfe/i/s/istock_90539235_large_1.jpg'),(172,2,3,'kjkj','jkh',768,0,1,'22321312rdgfd','2020-02-13 14:35:03','2020-02-13 14:35:03','http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/w/s/wsn001.jpg'),(173,3,7,'test','Bag',768,0,1,'ewew','2020-02-13 19:52:22','2020-02-13 21:52:07','http://lifestylelabels.com/pub/media/catalog/product/cache/1/image/e9c3970ab036de70892d86c6d221abfe/i/s/istock_90539235_large_1.jpg');
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

-- Dump completed on 2020-02-14  1:33:18
