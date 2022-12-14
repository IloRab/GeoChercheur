<?php
session_start();
$pseudo = isset($_POST('pseudo')) ? $_POST('pseudo') : "";
$password = isset($_POST('password')) ? $_POST('password') : "";

if($pseudo != "" && $password != ""){
    require("connectServer.php");
    $sql = $mysqlClient->prepare('CALL addClient(?,?,?)');
    $sql->bindParam(1,$pseudo);
    $sql->bindParam(2,$password);
    $sql->bindParam(2,$password);
    $sql->excute();
    $token = "";
    $loggedUser = [
        'pseudo' => $pseudo,
        'token' => $token,
        'idClient' => $mysqlClient->prepare('SELECT LAST_INSERT_ID() FROM Client').excute(),
    ];
    /**
    * Cookie qui expire dans un an
     */
    setcookie(
        'LOGGED_USER',
        $loggedUser['pseudo'],
        [
            'expires' => time() + 365*24*3600,
            'secure' => true,
            'httponly' => true,
        ]
    );

    $_SESSION['LOGGED_USER'] = $loggedUser;
    require("jouer.html");
}
else{
   require("acceuil_connecte.html");
}

// Si le cookie ou la session sont présentes
if (isset($_COOKIE['LOGGED_USER']) || isset($_SESSION['LOGGED_USER']['pseudo'])) {
    $loggedUser = [
        'pseudo' => $_COOKIE['LOGGED_USER'] ?? $_SESSION['LOGGED_USER']['pseudo'],
    ];
}

?>
