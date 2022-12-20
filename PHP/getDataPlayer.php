<?php
    session_start();
    $idClient = isset($_SESSION['LOGGED_USER']['idClient'])? $_SESSION['LOGGED_USER']['idClient'] : "";
    $icon = isset($_SESSION['LOGGED_USER']['icon']) ? $_SESSION['LOGGED_USER']['icon'] : "assets/img/doggos/pug.jpg";
    if($idClient != "")
    {
        require("connectServer.php");
        try{
            $usersStatement = $mysqlClient->prepare('SELECT SUM(scoreTotal) AS score FROM Scoretotal where idClient = ?');
            $usersStatement->bindParam(1,$idClient);
            $usersStatement->execute();
            $player = $usersStatement->fetchAll();
            $array = array(
                "icon" => $icon,
                "score" => $player['score'],
            );
            header('Content-Type: application/json;charset=utf-8');
            echo json_encode($array);
            exit();
        }
        catch(Exception $exception){
            die('Erreur : '.$exception->getMessage());
            
        }
    }else{
        $array = array(
            "icon" => $icon,
            "score" => 0,
        );
        header('Content-Type: application/json;charset=utf-8');
        echo json_encode($array);
        exit();
    }


?>