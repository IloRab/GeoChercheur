function logOut(){
    fetch("PHP/deconnexion.php").then(response => {console.log("requette finies avec " + response.ok)});
    location.href = "index.html"
}