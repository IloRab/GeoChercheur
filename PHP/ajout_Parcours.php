<?php
session_start();
$desc = isset($_POST['description']) ? $_POST['description'] : "";
$nom = isset($_POST['nom']) ? $_POST['lien'] : "";
$src = isset($_POST['src']) ?  $_POST['src'] : "";
$idClient = isset($_SESSION['LOGGED_USER']['idClient']) ? $_SESSION['LOGGED_USER']['idClient'] : "";

if($lon != "" && $lat != "" && src!= "" && $idClient!= ""){
    require("connectServer.php");
    try{
        $sql = $mysqlClient->prepare('CALL addParcours(?,?,?,?)');
        $sql->bindParam(1,$nom)
        $sql->bindParam(2,$idClient);
        $sql->bindParam(3,$desc);
        $sql->bindParam(4,$src);
        $sql->excute();
        $message = "la question a bien été ajouté"
    }catch(Exception $exception){
        $message = "Les informations donnée ne sont pas correcte";
        die('Erreur : '.$exception->getMessage());
    }
    
}
else{
    $message = "Les informations donnée ne sont pas correcte";
}

?>
