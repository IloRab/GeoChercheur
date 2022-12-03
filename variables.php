<?php

const MYSQL_HOST = 'localhost';
const MYSQL_PORT = 3306;
const MYSQL_NAME = 'geomap';
const MYSQL_USER = 'root';
const MYSQL_PASSWORD = 'root';

try {
    $mysqlClient = new PDO(
        sprintf('mysql:host=%s;dbname=%s;port=%s', MYSQL_HOST, MYSQL_NAME, MYSQL_PORT),
        MYSQL_USER,
        MYSQL_PASSWORD
    );
    $mysqlClient->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(Exception $exception) {
    die('Erreur : '.$exception->getMessage());
}

// Récupération des variables à l'aide du client MySQL
$usersStatement = $mysqlClient->prepare('SELECT * FROM Client');
$usersStatement->execute();
$clients = $usersStatement->fetchAll();

$usersStatement = $mysqlClient->prepare('SELECT * FROM Question');
$usersStatement->execute();
$questions = $usersStatement->fetchAll();

$usersStatement = $mysqlClient->prepare('SELECT * FROM Parcours');
$usersStatement->execute();
$parcours = $usersStatement->fetchAll();

$usersStatement = $mysqlClient->prepare('SELECT * FROM Historique h, Parcours p, Client c WHERE h.idClient = c.idClient and h.idParcours = p.idParcours');
$usersStatement->execute();
$historiques = $usersStatement->fetchAll();

$usersStatement = $mysqlClient->prepare('SELECT * FROM ScoreTotal s, Client c WHERE s.idClient = c.idClient');
$usersStatement->execute();
$scores = $usersStatement->fetchAll();

$usersStatement = $mysqlClient->prepare('SELECT * FROM Compose c, Parcours p, Question q WHERE p.idParcours = c.idParcours and c.idQuestion = q.idQuestion');
$usersStatement->execute();
$composes = $usersStatement->fetchAll();

// Si le cookie est présent
if (isset($_COOKIE['LOGGED_USER']) || isset($_SESSION['LOGGED_USER'])) {
    $loggedUser = [
        'pseudo' => $_COOKIE['LOGGED_USER'] ?? $_SESSION['LOGGED_USER'],
    ];
}



?>
