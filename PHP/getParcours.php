<?php
    require("connectServer.php");
    $array = array();
    try{
        $usersStatement = $mysqlClient->prepare('SELECT nomParcours, descriptionParcours, imageP FROM Parcours');
        $usersStatement->execute();
        $parcours = $usersStatement->fetchAll();
        foreach($parcours as $p){
            array_push($array, array(
                "nom_parcour" => $p['nomParcours'],
                "thumbnail" => $p['imageP'],
                "description_parcour" => $p['descriptionParcours']
            ));
        }
        header('Content-Type: application/json;charset=utf-8');
        echo json_encode($array);
        exit();
    }
    catch(Exception $exception){
        header('Content-Type: application/json;charset=utf-8');
        echo json_encode($array);
        die('Erreur : '.$exception->getMessage());
        
    }

?>