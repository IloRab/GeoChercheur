<?php
<<<<<<< HEAD

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
=======
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
>>>>>>> 878be99aae1cf18c06f8ede345d9df1e9f48ca2a
            ));
        }
        header('Content-Type: application/json;charset=utf-8');
        echo json_encode($array);
        exit();
    }
    catch(Exception $exception){
<<<<<<< HEAD
        die('Erreur : '.$exception->getMessage());
        
    }
}

=======
        header('Content-Type: application/json;charset=utf-8');
        echo json_encode($array);
        die('Erreur : '.$exception->getMessage());
        
    }
>>>>>>> 878be99aae1cf18c06f8ede345d9df1e9f48ca2a
?>