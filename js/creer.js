
window.addEventListener("load", init);

function init(){
    var btns = document.getElementsByClassName('button focus-grow');
        
    btns.onclick = open_form();
    console.log(btns);
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
    for(i = 0; i < bgs.length; i++){
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
    for(i = 0; i < bgs.length; i++){
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
