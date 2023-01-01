window.addEventListener("load", dynamic_init);

function dynamic_init() {

  let doc_url = document.baseURI.split("/");
  let doc_filename = doc_url[doc_url.length - 1]

  display_dyn_content(doc_filename)
}

function display_dyn_content(current_page) {

  let contents = {
    "jouer.html": {
      url: "PHP/getParcours.php",
      generate: carte_parcour
    },
    "creer.html": {
      url: "PHP/getParcours.php",
      generate: add_parcours
    },
    "leaderboard.html": {
      url: "PHP/getLeaderBoard.php",
      generate: ligne_rang
    }
  }

  let dyn_content = contents[current_page]

   fetch(dyn_content.url)
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
      let dyn_section;
      if(current_page == "creer.html"){
        dyn_section = document.getElementsByClassName("cards")[0];
      }
      else{
        dyn_section = document.getElementById("dynamic-section");
      }
      json.forEach(item => dyn_section.append(dyn_content.generate(item)));
   })
   .catch(error => {
      console.log("Some error jus happened with the fect request for " + dyn_content.url + " and " + current_page);
      console.log(error);
   })
}

function ligne_rang(rank_data) {
  const rank = document.createElement("article");
  rank.className = "classement-item";
  append_new(rank, "h3",
    {
      className: "classement-item-username",
      textContent: rank_data.pseudo
    }
  )

  append_new(rank, "p",
    {
      className: "classement-item-score",
      textContent: rank_data.score
    }
  )

  return rank
}

function add_parcours(data){
  const card = document.createElement("div");
  card.className = "container";
  card.setAttribute("id", data.id_parcour);
  card.style.backgroundImage = "url("+ data.thumbnail +")";
  append_new(card, "div",{
    className: "bg-text",
    textContent: data.nom_parcour
  });
  
  const middel = document.createElement("div");
  middel.className = "middle";

  const text = document.createElement("div");
  text.className = "text";

  append_new(text, "button",{
    className: "button focus-grow",
    textContent: "Ajouter",
  });

  middel.append(text);
  card.append(middel);
  return card;

}

function carte_parcour(parcour_data) {
  const card = document.createElement("article");
  card.className = "parcours focus-grow";
  card.setAttribute("id", parcour_data.id_parcour);

  append_new(card, "img",
    {
      src: parcour_data.thumbnail,
      alt: "Thumbnail pour le parcours " + parcour_data.nom_parcour
    }
  )
  append_new(card, "h3",
    {
      className: "title-parcours",
      textContent: parcour_data.nom_parcour
    }
  );

  append_new(card, "p",
    {
      className: "description-parcours centered-padded-text",
      textContent: parcour_data.description_parcour
    }
  )
  let button = append_new(card, "button",
    {
      className: "button focus-grow play",
      textContent: "play",
<<<<<<< HEAD
      href: "jeu.html"
=======
      href: "#"
      
>>>>>>> 878be99aae1cf18c06f8ede345d9df1e9f48ca2a
    }
  )
  button.setAttribute("data-nom-parcours",parcour_data.nom_parcour) 
  button.addEventListener("click",play)
  card.append(document.createElement("hr"))
 


  const score = document.createElement("p");
  score.className = "score";

  append_new(score, "span",
    {
      className: "score-nb",
      textContent: "0"
    }
  )
  append_new(score, "span",
    {
      className: "score-text",
      textContent: " questions répondues"
    })

  card.append(score);

  return card;
}

function append_new(parent, child_type, child_attributes) {
  let child = Object.assign(document.createElement(child_type), child_attributes)
  parent.append(child);
  return child;
}

function play(){
  let ppname = this.getAttribute("data-nom-parcours")
  fetch("PHP/getQuestions.php", 
  { 
    method: 'POST',
    body: 'nomParcours=' + encodeURIComponent(ppname),
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
   .then(response => {
      console.log(response)
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.text();
   })
   .then(json => {
    console.log(json)
    }
   )
   .catch(function (error) {
      console.log("Some error jus happened with the fect request for " + "PHP/getQuestions.php")
      console.log(error)
   })
}
