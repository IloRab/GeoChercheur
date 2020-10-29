window.addEventListener("load", init);

function init() {
  const parcours = JSON.parse('[ { "id_parcour": 1, "nom_parcour": "brown", "thumbnail": "assets/img/doggos/brown.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." }, { "id_parcour": 2, "nom_parcour": "headphones", "thumbnail": "assets/img/doggos/headphones.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." }, { "id_parcour": 3, "nom_parcour": "pug", "thumbnail": "assets/img/doggos/pug.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." }, { "id_parcour": 4, "nom_parcour": "mad", "thumbnail": "assets/img/doggos/mad.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." } ] ')
  const ranks = JSON.parse('[ {"pseudo": "bob", "score":900}, {"pseudo": "john", "score":899}, {"pseudo": "rick", "score":800} ]');
  const section_parcours = document.getElementById("section-parcours");
  const section_classment = document.getElementById("section-leaderboard");

  if (section_parcours != null) {
    parcours.forEach(parcour => section_parcours.append(carte_parcour(parcour)))
  }
  if (section_classment != null) {
    ranks.forEach(rank => section_classment.append(ligne_rang(rank)))
  }
  leaflet()
}

function ligne_rang(rank_data) {
  const rank = document.createElement("article");
  rank.className = "classement-item";
  rank.append(Object.assign(document.createElement("h3"),
    {
      className: "classement-item-username",
      textContent: rank_data.pseudo
    }
  ))

  rank.append(Object.assign(document.createElement("p"),
    {
      className: "classement-item-score",
      textContent: rank_data.score
    }
  ))

  return rank
}

// TODO: tout refaire en object assign
function carte_parcour(parcour_data) {
  const card = document.createElement("article");
  const img = document.createElement("img");
  const title = document.createElement("h3");
  const desc = document.createElement("p");
  const score = document.createElement("p");
  const score_text = document.createElement("span");
  const score_nb = document.createElement("span");

  title.textContent = parcour_data.nom_parcour;
  desc.textContent = parcour_data.description_parcours;
  score_nb.textContent = "0";
  score_text.textContent = " questions répondues";
  img.src = parcour_data.thumbnail;
  img.alt = "parcours thumbnail";

  card.className = "parcours";
  title.className = "title-parcours";
  desc.className = "description-parcours";
  score.className = "score";
  score_nb.className = "score-nb";

  card.append(img);
  card.append(title);
  card.append(desc);
  card.append(
    Object.assign(document.createElement("a"),
      {
        className: "play",
        textContent: "play",
        href: "#"
      })
  );
  card.append(document.createElement("hr"))
  score.append(score_nb);
  score.append(score_text);

  card.append(score);

  return card;
}


