<?php
$idP = isset($_GET['idP']) ? $_GET['idP'] : "";
$score = isset($_GET['score']) ? $_GET['score'] : "";
$idClient =  isset($_COOKIE['idClient']) ? $_COOKIE['idClient'] : "";

if($idP != "" && $idClient != "" && $score != ""){
    require("connectServer.php");
    try{
        $sql = $mysqlClient->prepare('CALL sauvegarde(?, ?, ?)');
        $sql->bindParam(1,$idClient);
        $sql->bindParam(2,$idP);
        $sql->bindParam(3,$score);
        $sql->execute();    
        echo "<script> alert('Le score a bien été ajouté'); </script>";
    }catch(Exception $exception){
        die('Erreur : '.$exception->getMessage());
    }
    
}
else{
    echo "<script> alert('Les informations donnée ne sont pas correcte'); </script>";
}

?>
