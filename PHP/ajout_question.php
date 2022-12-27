<?php
session_start();
$idP = isset($_GET('id'))? $_GET('id') : "";
$lon = isset($_GET('lon')) ? $_GET('lon') : "";
$lat = isset($_GET('lat')) ? $_GET('lien') : "";
$src = isset($_GET('src')) ?  $_GET('src') : "";
// chemin d'accès à votre fichier JSON
$file = 'getDataPlayer.php'; 
// mettre le contenu du fichier dans une variable
$data = file_get_contents($file); 
// décoder le flux JSON
$obj = json_decode($data); 
// accéder à l'élément approprié
$idClient =  isset($obj[0]->idClient)? $obj[0]->idClient : "";

if($lon != "" && $lat != "" && src!= "" && $idClient!= ""){
    require("connectServer.php");
    try{
        $sql = $mysqlClient->prepare('CALL addQuestion(?,?,?,?)');
        $sql->bindParam(1,$lat)
        $sql->bindParam(2,$lon);
        $sql->bindParam(3,$src);
        $sql->bindParam(4,$idClient);
        $sql->excute();

        $sql = $mysqlClient->prepare('SELECT LAST_INSERT_ID() FROM Client');
        $sql->execute();
        $idQuest = $sql->fetchAll();

        $sql = $mysqlClient->prepare('CALL addQuestionsAParcours(?,?)');
        $sql->bindParam(1,$idQuest);
        $sql->bindParam(2,$idP);
        $sql->execute();
        
        echo "la question a bien été ajouté"

    }catch(Exception $exception){
        die('Erreur : '.$exception->getMessage());
    }
    
}
else{
    echo "Les informations donnée ne sont pas correcte";
}

?>