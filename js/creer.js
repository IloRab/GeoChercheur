var modal;


window.addEventListener("load", init);

function init(){
    modal = document.getElementById('form');
    var btns = document.getElementsByClassName('button focus-grow');
    console.log(btns);
    for(i = 1; i < btns.length; i++){
        btns[i].addEventListener("click",function(e){
            modal.style.display = "block";
            const el = document.getElementsByTagName("input[type=hidden")[1];
            console.log(el);
            let id = el.closest("#container").getAttribute("id");
            el.setAttribute("value", id);
            document.getElementsByClassName("bg-text").style.display = none;
        });
    }

    icon = document.getElementById("img");
    icon.style.display = "none"

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
                    image.attr("src", e.target.result)
                }

                // On lit le fichier "picture" uploadé
                reader.readAsDataURL(picture)

                
            }
        }
    });
    document.getElementsByClassName("label-file")[0].click(function(){icon.click()});
}


