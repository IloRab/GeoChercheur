<?php
    $id = isset($_GET['id'])? $_GET['id'] : "";
    if($id!=""){
        require("connectServer.php");
        $array = array();
        try{
            $usersStatement = $mysqlClient->prepare('SELECT pseudo, getMeilleurScore(idClient, ?) AS score FROM Client ');
            $usersStatement->bindParam(1,$id);
            $usersStatement->execute();
            $scores = $usersStatement->fetchAll();
            foreach($scores as $s){
                array_push($array, array(
                    "pseudo" => $s['pseudo'],
                    "score" => $s['score']
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
    }
    

?>