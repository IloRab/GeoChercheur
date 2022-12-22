<?php
    $pseudo = isset($_COOKIE['LOGGED_USER']) ? $_COOKIE['LOGGED_USER'] : "";
    if($pseudo != "")
    {
        require("connectServer.php");
        try{
            $usersStatement = $mysqlClient->prepare('SELECT c.idClient, c.icon, SUM(scoreTotal) AS score FROM Scoretotal s INNER JOIN Client c ON s.idClient = c.idClient WHERE c.pseudo = ?');
            $usersStatement->bindParam(1,$pseudo);
            $usersStatement->execute();
            $player = $usersStatement->fetchAll();
            if(count($player) > 0){
                $array = array(
                    "idClient" => $player[0]['idClient'],
                    "icon" => $player[0]['icon'],
                    "score" => $player[0]['score'],
                );
            }
            else{
                try{
                     $usersStatement = $mysqlClient->prepare('SELECT idClient, icon FROM Client WHERE pseudo = ?');
                    $usersStatement->bindParam(1,$pseudo);
                    $usersStatement->execute();
                    $player = $usersStatement->fetchAll();
                    $array = array(
                        "idClient" => $player[0]['idClient'],
                        "icon" => $player[0]['icon'],
                        "score" =>  0,
                    );
                }
                catch(Exception $exception){
                    die('Erreur : '.$exception->getMessage());
                    
                }
            }
            header('Content-Type: application/json;charset=utf-8');
            echo json_encode($array);
            exit();
        }
        catch(Exception $exception){
            die('Erreur : '.$exception->getMessage());
            
        }
    }else{
        $array = array(
            "icon" => "assets/img/doggos/brown.jpg",
            "score" => 0,
        );
        header('Content-Type: application/json;charset=utf-8');
        echo json_encode($array);
        exit();
    }


?>