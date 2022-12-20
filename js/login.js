
window.addEventListener("load", init);

function init(){
var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var pseudo = document.getElementById("pseudo");

myInput.addEventListener("focusin",function() {
  document.getElementById("message").style.display = "block";
});

myInput.addEventListener("focusout",function() {
  document.getElementById("message").style.display = "none";
});

myInput.addEventListener("input",function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
});

pseudo.addEventListener("input", function(){
  var nom = document.getElementById("nom");
  fetch("PHP/getNamePlayer.php")
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(function(json) {
      if(json.find(item => item == pseudo.value && pseudo.value != "")){
          nom.classList.remove("isvalid");
          nom.classList.add("novalid");
          nom.innerHTML= "Pseudo <b>invalide</b>, il est déja pris ";
        } else {
          nom.classList.remove("novalid");
          nom.classList.add("isvalid");
          nom.innerHTML = "Pseudo <b>valide</b> ";

        }
    })
    .catch(function (e) {
       console.log("Some error happened with the fect request for PHP/getNamePlayer.php : " + e.message)
    });
});

pseudo.addEventListener("focusin", function(){
  document.getElementById("messageNom").style.display = "block";
})

pseudo.addEventListener("focusout", function(){
  document.getElementById("messageNom").style.display = "none";
})

var form = document.getElementById("SignUp");

form.addEventListener("submit",function(e){
  var nom = document.getElementById("nom");
  if(nom.getAttribute("class") == "novalid"){
    alert("Vous devez inscrire un pseudo valide !");
    e.stopPropagation();
    pseudo.focus();
  }
    
});

}

function myFunction() {
    var p = document.getElementById("myInput");
    if (p.type === "password") {
      p.type = "text";
    } else {
      p.type = "password";
    }
} 



