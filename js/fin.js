window.addEventListener("load",init)

function init(){
  
  let score = Cookies.get("ScoreTotal")
  let affichage = document.getElementById("score")
  console.log(affichage)
  affichage.innerHTML = score
  fetch("PHP/ajout_score.php?idP="+Cookies.get("idP")+"&score="+score)
}
