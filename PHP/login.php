<?php
session_start();
$pseudo = isset($_POST["pseudo"])? $_POST["pseudo"] : "";
$password = isset($_POST["password"])? $_POST["password"] : "";

if ($pseudo  != "" && $password != "") {
    require("connectServer.php");
    foreach ($clients as $client) {
        if ( $client['pseudo'] === $pseudo && $client['password'] === $password ) {
            $token = "";
            $loggedUser = [
                'pseudo' => $pseudo,
                'token' => $token,
                'idClient' => $client['idClient'],
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
        } else {
            $errorMessage = 'Les informations envoyées ne permettent pas de vous identifier ';
            require("accueil_connecte.html");
        }
    }
}
else {
    $errorMessage = 'Les informations envoyées ne permettent pas de vous identifier ';
    require("accueil_connecte.html");
}

// Si le cookie ou la session sont présentes
if (isset($_COOKIE['LOGGED_USER']) || isset($_SESSION['LOGGED_USER']['pseudo'])) {
    $loggedUser = [
        'pseudo' => $_COOKIE['LOGGED_USER'] ?? $_SESSION['LOGGED_USER']['pseudo'],
    ];
}

?>
