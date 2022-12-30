<?php
    require("connectServer.php");
    $array = array();
    try{
        $usersStatement = $mysqlClient->prepare('SELECT idQuestion,latitude,longitude FROM Question AS Q ,Compose AS C,Parours AS P WHERE Q.idQuestion = C.idQuestion AND C.idParcours = P.idParcours AND nomParcours = ?');
        $usersStatement->execute(array($_POST['nomParcours']))
        $questions = $usersStatement->fetchAll();
        foreach($questions as $q){
            array_push($array, array(
                "id_question" => $p['idQuestion'],
                "lat" => $p['latitude'],
                "long" => $p['longitude']
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