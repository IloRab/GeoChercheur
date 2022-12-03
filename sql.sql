DROP DATABASE IF EXISTS geomap;
CREATE DATABASE geomap;
USE geomap;

DROP TABLE IF EXISTS Client;
DROP TABLE IF EXISTS Question;
DROP TABLE IF EXISTS Parcours;
DROP TABLE IF EXISTS historique;
DROP TABLE IF EXISTS ScoreTotal;
DROP TABLE IF EXISTS Compose;






CREATE TABLE Client(
   idClient INT AUTO_INCREMENT,
   pseudo VARCHAR(50) NOT NULL,
   mdp VARCHAR(50) NOT NULL,
   CONSTRAINT PK_Client PRIMARY KEY(idClient),
   CONSTRAINT U_Pseudo UNIQUE(pseudo)
);

CREATE TABLE Question(
   idQuestion INT AUTO_INCREMENT,
   coordonnees GEOMETRY NOT NULL,
   lienImage VARCHAR(500) NOT NULL,
   idClient INT,
   CONSTRAINT PK_Question PRIMARY KEY(idQuestion),
   CONSTRAINT FK_Question_Client FOREIGN KEY(idClient) REFERENCES Client(idClient) ON DELETE CASCADE
);

CREATE TABLE Parcours(
   idParcours INT AUTO_INCREMENT,
   nomParcours VARCHAR(50) NOT NULL,
   idClient INT NOT NULL,
   CONSTRAINT PK_Parcours PRIMARY KEY(idParcours),
   CONSTRAINT U_nomparcours UNIQUE(nomParcours),
   CONSTRAINT FK_Parcours_Client FOREIGN KEY(idClient) REFERENCES Client(idClient) ON DELETE CASCADE
);

CREATE TABLE historique(
   idClient INT,
   idParcours INT,
   score INT NOT NULL,
   CONSTRAINT PK_historique PRIMARY KEY(idClient, idParcours),
   CONSTRAINT FK_historique_Client FOREIGN KEY(idClient) REFERENCES Client(idClient) ON DELETE CASCADE,
   CONSTRAINT FK_historique_Parcours FOREIGN KEY(idParcours) REFERENCES Parcours(idParcours) ON DELETE CASCADE
);

CREATE TABLE ScoreTotal(
   idClient INT,
   scoreTotal INT NOT NULL,
   meilleurScore INT NOT NULL,
   nbParties INT NOT NULL,
   CONSTRAINT PK_ScoreTotal PRIMARY KEY(idClient),
   CONSTRAINT FK_ScoreTotal_Client FOREIGN KEY(idClient) REFERENCES Client(idClient) ON DELETE CASCADE
);

CREATE TABLE Compose(
   idQuestion INT,
   idParcours INT,
   CONSTRAINT PK_Compose PRIMARY KEY(idQuestion, idParcours),
   CONSTRAINT FK_Compose_Question FOREIGN KEY(idQuestion) REFERENCES Question(idQuestion) ON DELETE CASCADE,
   CONSTRAINT FK_Compose_Parcours FOREIGN KEY(idParcours) REFERENCES Parcours(idParcours) ON DELETE CASCADE
);


DROP PROCEDURE IF EXISTS addClient;
DROP PROCEDURE IF EXISTS addParcours;
DROP PROCEDURE IF EXISTS addQuestion;
DROP PROCEDURE IF EXISTS addQuestionsAParcours;
DROP FUNCTION IF EXISTS getMeilleurScore;
DROP PROCEDURE IF EXISTS sauvegarde;

DELIMITER $
CREATE PROCEDURE addClient(nvPseudo VARCHAR(50), nvMdp VARCHAR(50))
BEGIN
	INSERT INTO Client (idClient, pseudo, mdp) VALUES (NULL, nvPseudo, nvMdp);
   INSERT INTO ScoreTotal(idClient, score, meilleurScore, nbParties) VALUES ((SELECT LAST_INSERT_ID() FROM Client),0,0,0);
END $


DELIMITER $
CREATE PROCEDURE addQuestion(coordonnees_ VARCHAR(50), lienImage_ VARCHAR(50), idClient_ INT)
BEGIN
	INSERT INTO Question (idQuestion, coordonnees, lienImage, idClient) VALUES (NULL, coordonnees_, lienImage_, idClient_);
END $


DELIMITER $
CREATE PROCEDURE addParcours(nom VARCHAR(50), idCreateur INT)
BEGIN
	INSERT INTO Parcours (idParcours, nomParcours, idClient) VALUES (NULL, nom, idCreateur);
END $



DELIMITER $
CREATE PROCEDURE addQuestionsAParcours(idQuest INT, idNewParc INT)
BEGIN
	INSERT INTO compose (idQuestion, idParcours) VALUES (idQuest, idNewParc);
END $

DELIMITER $
CREATE FUNCTION  getMeilleurScore(idClient_ INT) 
RETURNS INT 
BEGIN
   DECLARE  score INT;
   SET score = (SELECT MAX(score)  FROM historique 
   WHERE idClient = idClient_);
   RETURN score;
END $


DELIMITER $
CREATE PROCEDURE sauvegarde(idClient_ INT, idParcours INT, score_ INT)
BEGIN
   INSERT INTO historique(idClient, idParcours, score) VALUES (idClient_,idParcours_,score_);
   UPDATE ScoreTotal 
   SET scoreTotal = scoreTotal + score_, nbParties = nbParties + 1, meilleurScore = getMeilleurScore(idClient_)
   WHERE idClient = idClient_;
END $

