<?php
unset($_COOKIE["LOGGED_USER"]);
unset($_COOKIE["idClient"]);
unset($_COOKIE["idP"]);
unset($_COOKIE["question"]);
unset($_COOKIE["scoreTotal"]);
unset($_COOKIE["question_actuelle"]);
unset($_COOKIE["taille"]);

header("Location: ../index.html");

exit;

?>