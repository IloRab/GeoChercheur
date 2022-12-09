<?php
$pseudo = isset($_POST('pseudo')) ? $_POST('pseudo') : "";
$password = isset($_POST('password')) ? $_POST('password') : "";

if($pseudo != "" && $password != ""){
    require("connectServer.php");
    $sql = $mysqlClient->prepare('CALL addClient(?,?,?)');
    $sql->bindParam(1,$pseudo);
    $sql->bindParam(2,$password);
    $sql->bindParam(2,$password);
    $sql->excute();
    $message = "Vous avez bien été inscrit !"
    require("acceuil_connecte.php");
}
else{
   require("acceuil_connexion.php");
}

?>
