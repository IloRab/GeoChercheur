<?php
session_start();
$pseudo = isset($_POST['pseudo']) ? $_POST['pseudo'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";
$icon = isset($_FILES['icon']) ? $_FILES['icon'] : "assets/img/doggos/brown.jpg";

if($pseudo != "" && $password != ""){
    require("connectServer.php");
    try{
        $sql = $mysqlClient->prepare('CALL addClient(?,?,?)');
        $sql->bindParam(1,$pseudo);
        $sql->bindParam(2,$password);
        if($icon != "assets/img/doggos/brown.jpg"){
            $dossier = '../assets/img/icons/';
            $fichier = basename($icon['name']);
            if(move_uploaded_file($icon['tmp_name'], $dossier . $fichier)) //Si la fonction renvoie TRUE, c'est que ça a fonctionné...
            {
                $icon = "assets/img/icons/" . $fichier;
                $sql->bindParam(3,$icon);
            }
            else //Sinon (la fonction renvoie FALSE).
            {
                $icon = "assets/img/doggos/brown.jpg";
                $sql->bindParam(3,$icon);
            }
        }
        else
            $sql->bindParam(3,$icon);
        $sql->execute();
        $token = "";
        $sql = $mysqlClient->prepare('SELECT LAST_INSERT_ID() FROM Client');
        $sql->execute();
        $idClient = $sql->fetchAll();
        $loggedUser = [
            'pseudo' => $pseudo,
            'token' => $token,
            'icon' => $icon,
            'idClient' => $idClient,
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
        header("Location: ../jouer.php");
    }catch(Exception $exception){
        die('Erreur : '.$exception->getMessage());
    }
   
}


?>
