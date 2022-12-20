<?php
    
        require("connectServer.php");
        try{
            $usersStatement = $mysqlClient->prepare('SELECT pseudo  FROM Client ORDER BY pseudo');
            $usersStatement->execute();
            $player = $usersStatement->fetchAll();
            $array = array();
            foreach($player as $p){
                array_push($array, $p['pseudo']);
            }
            header('Content-Type: application/json;charset=utf-8');
            echo json_encode($array);
            exit();
        }
        catch(Exception $exception){
            die('Erreur : '.$exception->getMessage());
            
        }


?>