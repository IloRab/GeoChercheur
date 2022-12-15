
var form1;
var form2;

$(document).ready(init);

function init(){
    let but1 = $("#se_connecter")
    let but2 = $("#inscrire")

    form1 = $('#SignUp');
    form2 = $('#SignIn');

    form2.css("display", 'flex');
    form1.css("display", 'none');

    but1.click(changer_form);
    but2.click(changer_form)

    form1.submit(function(){
        $.ajax({
            type: "POST",
            url: "PHP/register.php",
            data : form1.serialize(),
            success : function(){
                console.log("Requete reussi !");
            }
        })
    });

    form2.submit(function () {
        $.ajax({
            type: "POST",
            url: "PHP/login.php",
            data: form2.serialize(),
            success: function () {
                console.log("Requete reussi !");
            }
        });
    })
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


