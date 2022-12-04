<?php
$pseudo = isset($_POST('pseudo')) ? $_POST('pseudo') : "";
$password = isset($_POST('lat')) ? $_POST('lien') : "";

if($pseudo != "" && $password != ""){
    require("variables.php");
    $sql = $mysqlClient->prepare('CALL addClient(?,?)');
    $sql->bindParam(1,$pseudo);
    $sql->bindParam(2,$password);
    $sql->excute();
    $message = "Vous avez bien été inscrit !"
    require("acceuil_connexion.php");
}
else{
    require("");
}

?>