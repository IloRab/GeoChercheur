<?php
session_start();
$pseudo = isset($_POST['pseudo']) ? $_POST['pseudo'] : "";
$password = isset($_POST['password']) ? $_POST['password'] : "";
$icon = isset($_FILES['icon']) ? $_FILES['aicon'] : "";

if($pseudo != "" && $password != ""){
    require("connectServer.php");
    try{
        $sql = $mysqlClient->prepare('CALL addClient(?,?,?)');
        $sql->bindParam(1,$pseudo);
        $sql->bindParam(2,$password);
        if($icon != ""){
            $dossier = 'assets/img/icons';
            $fichier = basename($icon['name']);
            if(move_uploaded_file($icon['tmp_name'], $dossier . $fichier)) //Si la fonction renvoie TRUE, c'est que ça a fonctionné...
            {
                $sql->bindParam(3,$fichier);
            }
            else //Sinon (la fonction renvoie FALSE).
            {
                $sql->bindParam(3,NULL);
            }
        }
        else
            $sql->bindParam(3,NULL);
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
