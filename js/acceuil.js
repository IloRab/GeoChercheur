function changer_form(){
    var form1 = document.getElementById('SignUp')
    var form2 = document.getElementById('SignIn')

    /*var forminscri = document.getElementById('inscrire')
    var formconnect = document.getElementById('se_connecter')*/

    if (form1.style.display == 'none'){
        form1.style.display= 'inline'
        form2.style.display= 'none'
    }

    if (form2.style.display== 'none' ){
        form2.style.display= 'inline'
        form1.style.display= 'none'
    }

}