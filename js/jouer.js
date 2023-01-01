<<<<<<< HEAD
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
=======

>>>>>>> 878be99aae1cf18c06f8ede345d9df1e9f48ca2a

