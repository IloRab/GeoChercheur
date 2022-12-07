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
        class:"navbar-checkbox"
      }
    );
    navbar.innerHTML = `
          <img class="logo" src="assets/img/tmp-logo2.png" alt="logo">
          <input class="navbar-checkbox" type="checkbox" name="navbar-checkbox" id="navbar-checkbox" checked>
          <label class="navbar-checkbox-label" for="navbar-checkbox"><span></span></label>
          <ul class="navbar-list">
            <li><a href="">Jouer</a></li>
            <li><a href="">Créer</a></li>
            <li><a href="">Classement</a></li>
          </ul>
          <input class="search-bar" type="text" name="" value="">
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
  }

  append_new(parent, child_type, child_attributes){
    parent.append(Object.assign(document.createElement(child_type), child_attributes));
  }
}

customElements.define("nav-bar", NavBar);
