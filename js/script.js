window.addEventListener("load", init);

function init() {
  const themes = JSON.parse('{ "parcours" : [ { "id_parcour": 1, "nom_parcour": "brown", "thumbnail": "assets/img/doggos/brown.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." }, { "id_parcour": 2, "nom_parcour": "headphones", "thumbnail": "assets/img/doggos/headphones.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." }, { "id_parcour": 3, "nom_parcour": "pug", "thumbnail": "assets/img/doggos/pug.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." }, { "id_parcour": 4, "nom_parcour": "mad", "thumbnail": "assets/img/doggos/mad.jpg", "description_parcours": "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat." } ] } ')
  const section_parcours = document.getElementById("section-parcours");
  themes.parcours.forEach(theme => {
    console.log(theme)
      section_parcours.append(carte_parcour(theme))
  });
}

function carte_parcour(parcour_data) {
  const card = document.createElement("article");
  const img = document.createElement("img");
  const title = document.createElement("h2");
  const desc = document.createElement("p");
  const score = document.createElement("p");
  const score_nb = document.createElement("span");

  title.textContent = parcour_data.nom_parcour;
  desc.textContent = parcour_data.description_parcours;
  score_nb.textContent = "0";
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
    Object.assign(document.createElement("button"),
      {
        className: "play",
        type: "button",
        textContent: "play"
      })
  );
  card.append(document.createElement("hr"))
  score.append(score_nb);
  // TODO: set up question terminees

  score.textContent = "questions terminées";
  card.append(score);

  // document.getElementById("section-parcours").append(card);
  return card;
}
