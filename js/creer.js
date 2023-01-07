var lat ;
var lon ;
window.addEventListener("load", init);

function init(){
    var myInput = document.getElementsByName("lat")[0];
    var myInput2 = document.getElementsByName("lon")[0];
    lat = document.getElementById("lat");
    lon = document.getElementById("lon");

    var btn = document.getElementById("btn");

    btn.addEventListener("click",function(e){
        if(!isLatitude(lat) && !isLongitude(lat)){
            e.stopPropagation();
            alert("La latitude et la longitude doivent être valide !");
        }
    })

    myInput.addEventListener("focusin",function() {
        document.getElementById("messagelat").style.display = "block";
      });
    
      myInput.addEventListener("focusout",function() {
        document.getElementById("messagelat").style.display = "none";
      });
      
      myInput2.addEventListener("focusin",function() {
        document.getElementById("messagelon").style.display = "block";
      });
    
      myInput2.addEventListener("focusout",function() {
        document.getElementById("messagelon").style.display = "none";
      });
    
      lat.addEventListener("input", function(){
        if(isLatitude(lat.value)){
            lat.classList.remove("novalid");
            lat.classList.add("isvalid");
            lat.innerHTML = "Latitude <b>valide</b>"
        }else{
            lat.classList.remove("isvalid");
            lat.classList.add("novalid");
            lat.innerHTML = "Latitude <b>invalide</b>"
        }
      })

      lon.addEventListener("input", function(){
        if(isLongitude(lon.value)){
            lon.classList.remove("novalid");
            lon.classList.add("isvalid");
            lon.innerHTML = "Longitude <b>valide</b>"
        }else{
            lon.classList.remove("isvalid");
            lon.classList.add("novalid");
            lon.innerHTML = "Longitude <b>invalide</b>"
        }
      })
    var img = document.getElementById("icon");

    img.addEventListener("change",function(){
        document.getElementById("label-file").textContent = "Image choisie : " + this.files[0].name;
        // e.files contient un objet FileList
        const picture = this.files[0];

        // "picture" est un objet File
        if (picture) {
            // Les types de fichier autorisés
            var types = [ "image/jpg", "image/jpeg", "image/png" ];
            
            // Vérification si "picture.type" se trouve dans "types"
            if (types.includes(picture.type)) {
                // L'objet FileReader
                var reader = new FileReader();

                // L'événement déclenché lorsque la lecture est complète
                reader.onload = function (e) {
                    // On change l'URL de l'image (base64)
                    document.getElementById("image").setAttribute("src", e.target.result);
                }

                // On lit le fichier "picture" uploadé
                reader.readAsDataURL(picture);

                
            }
        }
    });
    document.getElementById("label-file").addEventListener("click",function(){img.click();});

}

function close(){
    var bgs = document.getElementsByClassName("bg-text");
    for(var i = 0; i < bgs.length; i++){
        bgs[i].style.display = "none";
    }
}

function open_form(){
    close();
    document.getElementById('form').style.display = "block";
    var el = document.getElementById("idP");
    var num = this.id;
    console.log(num);
    el.setAttribute("value", num);
    
}



function open(){
    var bgs = document.getElementsByClassName("bg-text");
    for(var i = 0; i < bgs.length; i++){
        bgs[i].style.display = "flex";
    }
}


function btn1(){
    document.getElementById('form').style.display ='none'; 
    open();
}

function btn2(){
    document.getElementById('form2').style.display ='none'; 
    open();
}

function btn3(){
    document.getElementById('form2').style.display ='block'; 
    close();
}

function isLatitude(lat) {
    let pattern = new RegExp('^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}');
    return pattern.test(lat);
  }
  
function isLongitude(lng) {
    let pattern = new RegExp('^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}');
    return pattern.test(lng);
}