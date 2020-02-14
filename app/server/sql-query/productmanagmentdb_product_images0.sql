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
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `product_image_id` int NOT NULL AUTO_INCREMENT,
  `image` text COLLATE utf8_unicode_ci,
  `product_id` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_image_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (48,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/s/msh001.jpg',154,'2020-02-13 14:26:53','2020-02-13 14:26:53'),(49,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',154,'2020-02-13 14:26:53','2020-02-13 14:26:53'),(50,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',154,'2020-02-13 14:26:53','2020-02-13 14:26:53'),(54,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/w/d/wd009.jpeg',156,'2020-02-13 14:28:27','2020-02-13 14:28:27'),(55,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',156,'2020-02-13 14:28:27','2020-02-13 14:28:27'),(56,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',156,'2020-02-13 14:28:27','2020-02-13 14:28:27'),(57,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/w/d/wd009.jpeg',157,'2020-02-13 14:28:50','2020-02-13 14:28:50'),(58,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',157,'2020-02-13 14:28:50','2020-02-13 14:28:50'),(59,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',157,'2020-02-13 14:28:50','2020-02-13 14:28:50'),(63,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/w/d/wd009.jpeg',159,'2020-02-13 14:29:05','2020-02-13 14:29:05'),(64,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',159,'2020-02-13 14:29:05','2020-02-13 14:29:05'),(65,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',159,'2020-02-13 14:29:05','2020-02-13 14:29:05'),(66,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/w/d/wd009.jpeg',160,'2020-02-13 14:29:14','2020-02-13 14:29:14'),(67,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',160,'2020-02-13 14:29:14','2020-02-13 14:29:14'),(68,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',160,'2020-02-13 14:29:14','2020-02-13 14:29:14'),(102,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/w/d/wd009.jpeg',172,'2020-02-13 14:35:03','2020-02-13 14:35:03'),(103,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',172,'2020-02-13 14:35:03','2020-02-13 14:35:03'),(104,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',172,'2020-02-13 14:35:03','2020-02-13 14:35:03'),(105,NULL,NULL,'2020-02-13 19:04:57','2020-02-13 19:04:57'),(106,NULL,NULL,'2020-02-13 19:04:57','2020-02-13 19:04:57'),(107,NULL,NULL,'2020-02-13 19:04:57','2020-02-13 19:04:57'),(108,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/s/msh001.jpg',173,'2020-02-13 19:52:22','2020-02-13 19:52:22'),(109,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',173,'2020-02-13 19:52:22','2020-02-13 19:52:22'),(110,'http://lifestylelabels.com/pub/media/catalog/product/cache/1/small_image/240x300/beff4985b56e3afdbeabfc89641a4582/m/v/mv001.jpg',173,'2020-02-13 19:52:22','2020-02-13 19:52:22'),(111,NULL,NULL,'2020-02-13 21:11:00','2020-02-13 21:11:00'),(112,NULL,NULL,'2020-02-13 21:11:00','2020-02-13 21:11:00'),(113,NULL,NULL,'2020-02-13 21:11:00','2020-02-13 21:11:00'),(114,NULL,NULL,'2020-02-13 21:41:52','2020-02-13 21:41:52'),(115,NULL,NULL,'2020-02-13 21:41:52','2020-02-13 21:41:52'),(116,NULL,NULL,'2020-02-13 21:41:52','2020-02-13 21:41:52'),(117,NULL,NULL,'2020-02-13 21:52:08','2020-02-13 21:52:08'),(118,NULL,NULL,'2020-02-13 21:52:08','2020-02-13 21:52:08'),(119,NULL,NULL,'2020-02-13 21:52:08','2020-02-13 21:52:08');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-14  1:33:15
