var form1;
var form2;
var image;
var e;

$(document).ready(init);

function init(){

    // L'image img#image
    image = $("#image");
    e = $("input[name='icon']");
    e.change();
    let but1 = $("#se_connecter")
    let but2 = $("#inscrire")

    form1 = $('#SignUp');
    form2 = $('#SignIn');

    form2.css("display", 'flex');
    form1.css("display", 'none');

    but1.click(changer_form);
    but2.click(changer_form)

}

function changer_form(){

    if (form1.css("display") == 'none'){
        form1.css("display", 'flex');
        form2.css("display", 'none');
    }else{
        form2.css("display", 'flex');
        form1.css("display", 'none');
    }
}

// La fonction previewPicture
function previewPicture() {
    // e.files contient un objet FileList
    const [picture] = e.files

    // "picture" est un objet File
    if (picture) {
        // Les types de fichier autorisés
        var types = [ "image/jpg", "image/jpeg", "image/png" ];
        
        // Vérification si "picture.type" se trouve dans "types"
        if (types.includes(picture.type)) {
            // On change l'URL de l'image
            image.attr("src", URL.createObjectURL(picture));
        }
    }
} 

