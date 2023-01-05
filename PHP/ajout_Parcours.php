<?php
$desc = isset($_POST['desc']) ? $_POST['desc'] : "";
$nom = isset($_POST['nom']) ? $_POST['nom'] : "";
$src = isset($_FILES['src']) ?  $_FILES['src'] : "";
$idClient =  isset($_COOKIE['idClient']) ? $_COOKIE['idClient'] : "";

if($lon != "" && $lat != "" && $src!= "" && $idClient!= ""){
    require("connectServer.php");
    try{
        $sql = $mysqlClient->prepare('CALL addParcours(?,?,?,?)');
        $sql->bindParam(1,$nom);
        $sql->bindParam(2,$idClient);
        $sql->bindParam(3,$desc);

        $dossier = '../assets/img/parcours/';
        $fichier = basename($src['name']);
        if(move_uploaded_file($src['tmp_name'], $dossier . $fichier)) //Si la fonction renvoie TRUE, c'est que ça a fonctionné...
        {
            $src = $dossier . $fichier;
            $sql->bindParam(4,$src);
        }
        else //Sinon (la fonction renvoie FALSE).
        {
            $src = "../assets/img/tmp-logo.png";
            $sql->bindParam(4,$src);
        }

        $sql->execute();    
          
        echo "<script> alert('Le parcours a bien été ajouté'); </script>";
        header("Location: ../creer.html");
    }catch(Exception $exception){
        die('Erreur : '.$exception->getMessage());
    }
    
}
else{
    echo "<script> alert('Les informations donnée ne sont pas correcte'); </script>";
    header("Location: ../creer.html");}

?>
