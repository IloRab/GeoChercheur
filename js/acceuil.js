function changer_form(){
    console.log("izeuhfuiozhfozef")
    var form1 = document.getElementById('SignUp')
    var form2 = document.getElementById('SignIn')

    /*var forminscri = document.getElementById('inscrire')
    var formconnect = document.getElementById('se_connecter')*/
    console.log(form1.style)

    if (form1.style.display == 'none'){
        form1.style.display= 'block'
        form2.style.display= 'none'
        console.log(1)
    }

    console.log(form1.style.display)
    if (form2.style.display== 'none' ){
        form2.style.display= 'block'
        form1.style.display= 'none'
        console.log(2)
    }
}

window.addEventListener("load",init)

function init(){
    let but1 = document.getElementById("se_connecter")
    let but2 = document.getElementById("inscrire")

    var form1 = document.getElementById('SignUp')
    var form2 = document.getElementById('SignIn')

    form1.style.display = 'block'
    form2.style.display = 'none'

    but1.addEventListener("click",changer_form)
    but2.addEventListener("click",changer_form)
}