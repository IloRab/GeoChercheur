<?php
session_start();
$pseudo = isset($_POST["pseudo"])? $_POST["pseudo"] : "";
$password = isset($_POST["password"])? $_POST["password"] : "";

if ($pseudo  != "" && $password != "") {
    require("connectServer.php");
    // Récupération des variables à l'aide du client MySQL
    try{
        $usersStatement = $mysqlClient->prepare('SELECT * FROM Client where pseudo = ? and mdp = ?');
        $usersStatement->bindParam(1,$pseudo);
        $usersStatement->bindParam(2,$password);
        $usersStatement->execute();
        $client = $usersStatement->fetchAll();
        if (count($client) > 0 ) {
            $token = "";
            $loggedUser = [
                'pseudo' => $pseudo,
                'token' => $token,
                'icon' => $client['icon'],
                'idClient' => $client['idClient']
            ];
            /**
             * Cookie qui expire dans un an
             */
            setcookie(
                'LOGGED_USER',
                $loggedUser['pseudo'],
                time() + 365*24*3600
            );
            $_SESSION['LOGGED_USER'] = $loggedUser;
            var_dump($_SESSION);
            header("Location: ../jouer.php");
        }
        else{
            echo "<h6><script> alert('Les informations envoyées ne permettent pas de vous identifier ') </script></h6>";
            header("Location: ../login.html");
        }
    }catch(Exception $exception){
        die('Erreur : '.$exception->getMessage());
    }
}



?>
