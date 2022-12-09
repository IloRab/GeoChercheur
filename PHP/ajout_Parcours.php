// chemin d'accès à votre fichier JSON
$file = '../json/liste_parcours.json'; 
// mettre le contenu du fichier dans une variable
$data = file_get_contents($file); 
// décoder le flux JSON
$obj = json_decode($data); 
// accéder à l'élément approprié
require("connectServer.php");
