<?php
session_start();
$lon = isset($_GET('lon')) ? $_GET('lon') : "";
$lat = isset($_GET('lat')) ? $_GET('lien') : "";
$src = isset($_GET('src')) ?  $_GET('src') : "";
$idClient = isset($_SESSION['LOGGED_USER']['idClient']) ? $_SESSION['LOGGED_USER']['idClient'] : "";

if($lon != "" && $lat != "" && src!= "" && $idClient!= ""){
    require("connectServer.php");
    try{
        $sql = $mysqlClient->prepare('CALL addQuestion(?,?,?,?)');
        $sql->bindParam(1,$lat)
        $sql->bindParam(2,$lon);
        $sql->bindParam(3,$src);
        $sql->bindParam(4,$idClient);
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