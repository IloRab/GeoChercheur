<?php
$lon = isset($_GET('lon')) ? $_GET('lon') : "";
$lat = isset($_GET('lat')) ? $_GET('lien') : "";
$src = isset($_GET('src')) ?  $_GET('src') : "";
$idClient = isset($_SESSION['LOGGED_USER']['idClient']) ? $_SESSION['LOGGED_USER']['idClient'] : "";

if($lon != "" && $lat != "" && src!= "" && $idClient!= ""){
    require("variables.php");
    $sql = $mysqlClient->prepare('CALL addQuestion(?,?,?)');
    $sql->bindParam(1,new Point($lat,$lon));
    $sql->bindParam(2,$src);
    $sql->bindParam(3,$idClient);
    $sql->excute();
    $message = "la question a bien été ajouté"
    require("");
}
else{
    require("");
}

?>