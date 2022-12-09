class NavBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(){
    // Create a shadow root
    this.attachShadow({ mode: "open" }); 

    const navbar = document.createElement("nav");
    navbar.className = "main-navbar";
    this.append_new(navbar, "img",
      {
        class: "logo",
        src: "assets/img/tmp-logo2.png",
        alt: "logo"
      }
    );

    this.append_new(navbar, "input",
      {
        className:"navbar-checkbox",
        type: "checkbox",
        name: "navbar-checkbox",
        id: "navbar-checkbox",
      }
    );

    this.append_new(navbar, "label", 
      {
        className: "navbar-checkbox-label",
        for: "navbar-checkbox",
        innerHTML: "<span></span>"
      }
    );

    this.append_new(navbar, "ul",
      {
        className: "navbar-list",
        innerHTML: `
            <li><a href="jouer.html">Jouer</a></li>
            <li><a href="">Créer</a></li>
            <li><a href="leaderboard.html">Classement</a></li>`
      }
    )

    this.append_new(navbar, "input",
      {
        id: "search-bar",
        className: "search-bar",
        type: "text",
      }
    )

    navbar.innerHTML = `
          <img class="logo" src="assets/img/tmp-logo2.png" alt="logo">
          <input class="navbar-checkbox" type="checkbox" name="navbar-checkbox" id="navbar-checkbox" checked>
          <label class="navbar-checkbox-label" for="navbar-checkbox"><span></span></label>
          <ul class="navbar-list">
            <li><a href="jouer.html">Jouer</a></li>
            <li><a href="">Créer</a></li>
            <li><a href="leaderboard.html">Classement</a></li>
          </ul>
          <input id="search-bar" class="search-bar" type="text" name="" value="">
          <a class="account" href="#">
            <img src="assets/img/doggos/pug.jpg" alt="icon">
            <p class="account-score">100</p>
          </a>`;



    this.append_new(this.shadowRoot, "link", 
      {
          rel: "stylesheet",
          href: "css/navbar.css"
      }
    );

    this.shadowRoot.append(navbar);

    let search_bar = this.shadowRoot.getElementById("search-bar");

    search_bar.addEventListener("change", () => {
      search(search_bar.value);
    });
  }

  append_new(parent, child_type, child_attributes){
    parent.append(Object.assign(document.createElement(child_type), child_attributes));
  }
}

customElements.define("nav-bar", NavBar);

function search(search_str) {
    let articles = Array.from(document.querySelectorAll(".searchable-section article"));

    for (const article of articles) {
      let title = article.getElementsByTagName("h3")[0].textContent.toLowerCase();
      let in_query = title.includes(search_str.toLowerCase()) || search_str === "";

      article.style.visibility = (in_query)? "visible" : "hidden";
      article.style.maxHeight =  (in_query)? "1000px" : 0;
      article.style.maxWidth = (in_query)? "1000px" : 0;
    }
}
