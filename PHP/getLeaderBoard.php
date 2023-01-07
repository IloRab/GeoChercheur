<?php
    require("connectServer.php");
    $array = array();
    try{
        $usersStatement = $mysqlClient->prepare('SELECT pseudo, SUM(scoreTotal) AS score FROM Scoretotal INNER JOIN Client ON ScoreTotal.idClient = Client.idClient GROUP BY ScoreTotal.idClient');
        $usersStatement->execute();
        $scores = $usersStatement->fetchAll();
        foreach($scores as $s){
            array_push($array, array(
                "pseudo" => $s['pseudo'],
                "score" => intval($s['score']),
            ));
        }
        $columns = array_column($array, 'score');
        array_multisort($columns, SORT_DESC, $array);
        header('Content-Type: application/json;charset=utf-8');
        echo json_encode($array);
    }
    catch(Exception $exception){
        die('Erreur : '.$exception->getMessage());      
    }

?>