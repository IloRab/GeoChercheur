window.addEventListener("load", dynamic_init);

function dynamic_init() {

  let doc_url = document.baseURI.split("/");
  let doc_filename = doc_url[doc_url.length - 1]

  display_dyn_content(doc_filename)
}

function display_dyn_content(current_page) {

  let contents = {
    "jouer.html": {
      url: "assets/json/liste-parcours.json",
      generate: carte_parcour
    },
    "leaderboard.html": {
      url: "assets/json/classement-par-parcours.json",
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
      const dyn_section = document.getElementById("dynamic-section");
      json.forEach(item => dyn_section.append(dyn_content.generate(item)))
   })
   .catch(function () {
      console.log("Some error jus happened with the fect request for " + dyn_content.url)
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

function carte_parcour(parcour_data) {
  const card = document.createElement("article");
  card.className = "parcours";


  append_new(card, "img",
    {
      src: parcour_data.thumbnail,
      alt: "parcour thumbnail"
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
  append_new(card, "a",
    {
      className: "play",
      textContent: "play",
      href: "#"
    }
  )
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
  parent.append(Object.assign(document.createElement(child_type), child_attributes));
}
