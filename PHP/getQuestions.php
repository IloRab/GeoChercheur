<?php
$id = isset($_GET['id']) ? $_GET['id'] : "";
$array = array();
if($id != ""){
    require("connectServer.php");
    try{
        $usersStatement = $mysqlClient->prepare('SELECT q.latitude, q.longitude FROM Question q INNER JOIN Compose c ON q.idQuestion = c.idQuestion WHERE c.idParcours = ?');
        $usersStatement->bindParam(1,$id);
        $usersStatement->execute();
        $questions = $usersStatement->fetchAll();
        $i = 0;
        foreach($questions as $q){
            array_push($array, array(
                "id_question" => $i++,
                "lat" => $q['latitude'],
                "lon" => $q['longitude'],
            ));
        }
        header('Content-Type: application/json;charset=utf-8');
        echo json_encode($array);
        exit();
    }
    catch(Exception $exception){
        die('Erreur : '.$exception->getMessage());
    }
}

?>