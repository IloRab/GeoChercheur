window.addEventListener("load", dynamic_init);

function dynamic_init() {

  let doc_url = document.baseURI.split("/");
  let doc_filename = doc_url[doc_url.length - 1]

  const dyn_section = document.getElementById("dynamic-section");
  let dyn_content = query_dyn_content("", doc_filename)
  dyn_content.data.forEach(item => dyn_section.append(dyn_content.generate(item)))

}

function query_dyn_content(api_url, request) {
  // This is temporary, waiting util php is finished
  // TODO: turn this into a fetch request
  
  const parcours = JSON.parse('[ { "id_parcour": 1, "nom_parcour": "brown", "thumbnail": "assets/img/doggos/brown.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." }, { "id_parcour": 2, "nom_parcour": "headphones", "thumbnail": "assets/img/doggos/headphones.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." }, { "id_parcour": 3, "nom_parcour": "pug", "thumbnail": "assets/img/doggos/pug.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." }, { "id_parcour": 4, "nom_parcour": "mad", "thumbnail": "assets/img/doggos/mad.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." } ] ')
  const ranks = JSON.parse('[ {"pseudo": "bob", "score":900}, {"pseudo": "john", "score":899}, {"pseudo": "rick", "score":800} ]');

  let contents = {
    "jouer.html": {
      data: parcours,
      generate: carte_parcour
    },
    "leaderboard.html": {
      data: ranks,
      generate: ligne_rang
    }
  }

  return contents[request]
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
      className: "description-parcours",
      textContent: parcour_data.description_parcours
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
