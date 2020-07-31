-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: jobConvos
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.13-MariaDB-1:10.4.13+maria~bionic

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
-- Table structure for table `applicationstatus`
--

DROP TABLE IF EXISTS `applicationstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applicationstatus` (
  `applicationStatusID` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(100) DEFAULT NULL,
  `progression` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`applicationStatusID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contactlist`
--

DROP TABLE IF EXISTS `contactlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contactlist` (
  `contactID` int(11) NOT NULL AUTO_INCREMENT,
  `lastName` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `needsFollowup` tinyint(4) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `contactType` int(11) DEFAULT NULL,
  `linkedIn` varchar(255) DEFAULT NULL,
  `streetAddressOne` varchar(255) DEFAULT NULL,
  `streetAddress2` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `zip` varchar(12) DEFAULT NULL,
  `remark` varchar(1069) DEFAULT NULL,
  `resumeLastSent` date DEFAULT NULL,
  PRIMARY KEY (`contactID`),
  KEY `contactType` (`contactType`),
  CONSTRAINT `contactlist_ibfk_1` FOREIGN KEY (`contactType`) REFERENCES `contacttype` (`contactTypeID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=269 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contacttype`
--

DROP TABLE IF EXISTS `contacttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacttype` (
  `contactTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`contactTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `conversationmaintable`
--

DROP TABLE IF EXISTS `conversationmaintable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversationmaintable` (
  `conversationID` int(11) NOT NULL AUTO_INCREMENT,
  `conversationType` int(11) DEFAULT NULL,
  `conversationDate` date DEFAULT NULL,
  `conversationTime` time DEFAULT NULL,
  `specificPositionID` int(11) DEFAULT NULL,
  `contactID` int(11) DEFAULT NULL,
  `remark` varchar(1069) DEFAULT NULL,
  PRIMARY KEY (`conversationID`),
  KEY `conversationType` (`conversationType`),
  KEY `specificPositionID` (`specificPositionID`),
  KEY `contactID` (`contactID`),
  CONSTRAINT `conversationmaintable_ibfk_1` FOREIGN KEY (`conversationType`) REFERENCES `conversationtype` (`conversationTypeID`) ON UPDATE CASCADE,
  CONSTRAINT `conversationmaintable_ibfk_5` FOREIGN KEY (`specificPositionID`) REFERENCES `specificposition` (`positionID`) ON UPDATE CASCADE,
  CONSTRAINT `conversationmaintable_ibfk_6` FOREIGN KEY (`contactID`) REFERENCES `contactlist` (`contactID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=926 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `conversationtype`
--

DROP TABLE IF EXISTS `conversationtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversationtype` (
  `conversationTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) DEFAULT NULL,
  `contactLevel` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`conversationTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employer`
--

DROP TABLE IF EXISTS `employer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employer` (
  `employerID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `remarks` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`employerID`)
) ENGINE=InnoDB AUTO_INCREMENT=171 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `employerrecruitersites`
--

DROP TABLE IF EXISTS `employerrecruitersites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employerrecruitersites` (
  `siteID` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(1069) DEFAULT NULL,
  `recruiterid` int(11) DEFAULT NULL,
  `employerID` int(11) DEFAULT NULL,
  `remarks` varchar(1069) DEFAULT NULL,
  PRIMARY KEY (`siteID`),
  KEY `employerid` (`employerID`),
  KEY `recruiterid` (`recruiterid`),
  CONSTRAINT `employerrecruitersites_ibfk_1` FOREIGN KEY (`employerID`) REFERENCES `employer` (`employerID`) ON UPDATE CASCADE,
  CONSTRAINT `employerrecruitersites_ibfk_2` FOREIGN KEY (`recruiterid`) REFERENCES `recruiter` (`recruiterID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recruiter`
--

DROP TABLE IF EXISTS `recruiter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `recruiter` (
  `recruiterID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `remarks` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`recruiterID`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `resumeVersions`
--

DROP TABLE IF EXISTS `resumeVersions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `resumeVersions` (
  `resumeVersionID` int(11) NOT NULL AUTO_INCREMENT,
  `resumeVersionTag` varchar(50) DEFAULT NULL,
  `resumeRemarks` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`resumeVersionID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COMMENT='Stores resume versions with other info such as remarks and perhaps eventually resumes themselves as blobs';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `roletypes`
--

DROP TABLE IF EXISTS `roletypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roletypes` (
  `roleTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roleTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `specificposition`
--

DROP TABLE IF EXISTS `specificposition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `specificposition` (
  `positionID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `recruiter` int(11) DEFAULT NULL,
  `employer` int(11) DEFAULT NULL,
  `roleType` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `lastStatusChange` datetime DEFAULT NULL,
  `link` varchar(1069) DEFAULT NULL,
  `remarks` varchar(1069) DEFAULT NULL,
  `durationInWeeks` int(11) DEFAULT NULL,
  `resumeVersion` int(11) DEFAULT 1,
  PRIMARY KEY (`positionID`),
  KEY `recruiter` (`recruiter`),
  KEY `employer` (`employer`),
  KEY `roleType` (`roleType`),
  KEY `status` (`status`),
  CONSTRAINT `specificposition_ibfk_1` FOREIGN KEY (`recruiter`) REFERENCES `recruiter` (`recruiterID`) ON UPDATE CASCADE,
  CONSTRAINT `specificposition_ibfk_2` FOREIGN KEY (`employer`) REFERENCES `employer` (`employerID`) ON UPDATE CASCADE,
  CONSTRAINT `specificposition_ibfk_3` FOREIGN KEY (`roleType`) REFERENCES `roletypes` (`roleTypeID`) ON UPDATE CASCADE,
  CONSTRAINT `specificposition_ibfk_4` FOREIGN KEY (`status`) REFERENCES `applicationstatus` (`applicationStatusID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-07-30 22:15:50
