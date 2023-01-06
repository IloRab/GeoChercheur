<?php
$idP = isset($_POST['id'])? $_POST['id'] : "";
$lon = isset($_POST['lon']) ? $_POST['lon'] : "";
$lat = isset($_POST['lat']) ? $_POST['lat'] : "";
$idClient =  isset($_COOKIE['idClient']) ? $_COOKIE['idClient'] : "";

if($lon != "" && $lat != "" && $idP!= "" && $idClient!= ""){
    require("connectServer.php");
    try{
        $sql = $mysqlClient->prepare('CALL addQuestion(?,?,?)');
        $sql->bindParam(1,$lat);
        $sql->bindParam(2,$lon);
        $sql->bindParam(3,$idClient);
        $sql->execute();

        $sql = $mysqlClient->prepare('SELECT idQuestion FROM Question WHERE latitude = ? and longitude =?');
        $sql->bindParam(1,$lat);
        $sql->bindParam(2,$lon);
        $sql->execute();
        $idQuest = $sql->fetchAll();

        $sql = $mysqlClient->prepare('CALL addComposition(?,?)');
        $sql->bindParam(1,$idQuest[0]['idQuestion']);
        $sql->bindParam(2,$idP);
        $sql->execute();
        
        echo "<script> alert('la question a bien été ajouté'); </script>";
        header("Location: ../creer.html");

    }catch(Exception $exception){
        die('Erreur : '.$exception->getMessage());
    }
    
}
else{
    echo "<script> alert('Les informations donnée ne sont pas correcte'); </script>";
    header("Location: ../creer.html");
}

?>