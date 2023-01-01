var modal;

window.addEventListener("load", init);

function init(){
    modal = document.getElementById('form');

    var btns = document.getElementsByClassName('focus-grow');
    for(i = 0; i < btns.length; i++){
        btns[i].addEventListener("click",open_form);
        console.log(btns[i].getAttribute("onclick"));
    }
   
    

    icon = document.getElementById("img");
    icon.style.display = "none";

    img = document.getElementById("icon");


    icon.addEventListener("change",function(){
        document.getElementsByClassName("label-file")[0].textContent("Image choisie : " + this.files[0].name);
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
                    image.attr("src", e.target.result);
                }

                // On lit le fichier "picture" uploadé
                reader.readAsDataURL(picture);

                
            }
        }
    });
    document.getElementsByClassName("label-file")[0].click(function(){icon.click();});



    img.addEventListener("change",function(){
        document.getElementsByClassName("label-file")[1].textContent("Image choisie : " + this.files[0].name);
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
                    image.attr("src", e.target.result);
                }

                // On lit le fichier "picture" uploadé
                reader.readAsDataURL(picture);

                
            }
        }
    });
    document.getElementsByClassName("label-file")[1].click(function(){img.click();});

}

function close(){
    var bgs = document.getElementsByClassName("bg-text");
    for(i = 0; i < bgs.length; i++){
        bgs[i].style.display = "none";
    }
}

function open(){
    var bgs = document.getElementsByClassName("bg-text");
    for(i = 0; i < bgs.length; i++){
        bgs[i].style.display = "flex";
    }
}

function open_form(){
    modal.style.display = "flex";
    let el = document.getElementById("idP");
    let p = this.parentElement.parentElement;
    let id = p.parentElement;
    let num = id.getAttribute("id");
    el.setAttribute("value", num);
    close();
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
