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
            <li><a href="">Jouer</a></li>
            <li><a href="">Créer</a></li>
            <li><a href="">Classement</a></li>`
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
            <li><a href="">Jouer</a></li>
            <li><a href="">Créer</a></li>
            <li><a href="">Classement</a></li>
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
    search_bar.addEventListener("keydown", () => {
      search(search_bar.value);
    });
  }

  append_new(parent, child_type, child_attributes){
    parent.append(Object.assign(document.createElement(child_type), child_attributes));
  }
}

customElements.define("nav-bar", NavBar);

function search(search_str) {
  let parcours = Array.from(document.getElementsByClassName("parcours"));

  parcours.forEach(p => {
    let title = p.getElementsByTagName("h2")[0].textContent;

    if (!title.includes(search_str) && search_str !== "") {
      p.style.display = "none";
    } else {
      p.style.display = "flex";
    }
  });
}
