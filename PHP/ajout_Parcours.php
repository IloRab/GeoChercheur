// chemin d'accès à votre fichier JSON
$file = '../json/liste_parcours.json'; 
// mettre le contenu du fichier dans une variable
$data = file_get_contents($file); 
// décoder le flux JSON
$obj = json_decode($data); 
// accéder à l'élément approprié
require("connectServer.php");
// Récupération des variables à l'aide du client MySQL
$usersStatement = $mysqlClient->prepare('CALL addParcours(?,?,?,?)');
$usersStatement->bindParam(1,$obj->nom_parcours);
$usersStatement->bindParam(2,$_SESSION['LOGGED_USER']['idClient']);
$usersStatement->bindParam(3,$obj->description_parcours);
$usersStatement->bindParam(4,$obj->thumbnail);
$usersStatement->execute();
