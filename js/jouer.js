let btns;

$(document).ready(init);

function init(){
    btns = $('.button focus-grow');
    btns.click(function(e){
        e.stopPropagation();
        console.log("Ca marche");
        let p = this.parent();
        let id = p.attr("id"); 
        console.log(id);
        $.ajax({ 
            method: 'GET',
            url : "PHP/getQuestions.php",
            data :{"id" : id},
            success : function(){
                console.log("Requête réussie !");
            },
            error : function (e) {
                console.log("Some error just happened with the fect request for PHP/getQuestions.php" + e);
            }
        });
    });
    
    console.log(btns);
}

