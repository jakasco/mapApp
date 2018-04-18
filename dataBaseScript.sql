DROP DATABASE IF EXISTS map3;
CREATE DATABASE map3;
USE map3;

GRANT SELECT, INSERT, UPDATE, DELETE ON map3.* TO dbuser@localhost;

drop table if exists marker;
CREATE TABLE marker
(
  PlaceId INT NOT NULL,
  Title VARCHAR(50) NOT NULL,
  Description VARCHAR(500) NOT NULL,
  Coordinates INT NOT NULL,
  Openhours INT NOT NULL,
  Keywords VARCHAR(100)
);

drop table if exists keywords;
CREATE TABLE keywords
(
	  Keyword VARCHAR(40) NOT NULL,
	  Place VARCHAR(50) NOT NULL
);
