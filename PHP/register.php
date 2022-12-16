<?php
session_start();
$pseudo = isset($_POST['pseudo']) ? $_POST['pseudo'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";

if($pseudo != "" && $password != ""){
    require("connectServer.php");
    try{
        $sql = $mysqlClient->prepare('CALL addClient(?,?,"assets/img/doggos/brown.jpg")');
        $sql->bindParam(1,$pseudo);
        $sql->bindParam(2,$password);
        $sql->execute();
        $token = "";
        $sql = $mysqlClient->prepare('SELECT LAST_INSERT_ID() FROM Client');
        $sql->execute();
        $idClient = $sql->fetchAll();
        $loggedUser = [
            'pseudo' => $pseudo,
            'token' => $token,
            'idClient' => $idClient,
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
        header("Location: ../jouer.html");
    }catch(Exception $exception){
        die('Erreur : '.$exception->getMessage());
    }
   
}
else{
    header("Location: ../login.html");
}


?>
