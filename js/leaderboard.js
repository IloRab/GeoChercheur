window.addEventListener("load", derouler);

function derouler(){
    fetch("PHP/getParcours.php")
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
      var select = document.getElementById("meilleurscore");
      append_new(select,"option",{
        textContent: "Choisissez un parcours"
      })
      json.forEach(item => select.add(ajoutSelect(item)));
      console.log(select)
   })
   .catch(error => {
      console.log("Some error jus happened with the fect request for getParcours.php ");
      console.log(error);
   })

   var ops = document.getElementById("meilleurscore")
   ops.addEventListener("change",function(e){
        var id = this.options[this.selectedIndex].id;
        console.log(id)
        fetch("PHP/getMeilleurScore.php?id="+id)
        .then(response => {
          if (!response.ok) {
              throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then(json => {
          console.log(json)
          let dyn_section = document.getElementById("dynamic-section2");
          deleteChild(dyn_section)
          append_new(dyn_section, 'h1',{
            textContent: this.value
          });
          json.forEach(item => dyn_section.append(ajout(item)));
        })
        .catch(error => {
          console.log("Some error jus happened with the fect request for getMeilleurScore.php");
          console.log(error);
        })
   })
   console.log(ops);
}


function deleteChild(e) {
  var first = e.firstElementChild;
  while (first) {
      first.remove();
      first = e.firstElementChild;
  }
}

function ajout(data){
  const rank = document.createElement("article");
  rank.className = "classement-item";
  append_new(rank, "h3",
    {
      className: "classement-item-username",
      textContent: data.pseudo
    }
  )

  append_new(rank, "p",
    {
      className: "classement-item-score",
      textContent: data.score
    }
  )
  return rank
}

function ajoutSelect(data){
  var op = document.createElement('option');
  op.id = data.id_parcour;
  op.value = data.nom_parcour;
  op.textContent = data.nom_parcour;
  return op;
}