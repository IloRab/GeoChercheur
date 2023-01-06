<?php
unset($_COOKIE["LOGGED_USER"]);
unset($_COOKIE["idClient"]);

header("Location: ../index.html");

exit();

?>