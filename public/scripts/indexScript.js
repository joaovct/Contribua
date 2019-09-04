const email = document.getElementsByClassName("login-input")[0]
const password = document.getElementsByClassName("login-input")[1]
const btn = document.getElementById("login-submit")
const iconEmail = document.getElementsByClassName("icon-input")[0]
// const iconPassword = document.getElementsByClassName("icon-input")[1]
var pass1 = false, pass2 = false

function init(){ 
    email.addEventListener("input", ()=>{
        pass1 = validationEmail(email)})
        validatesForm()
    password.addEventListener("input", ()=>{
        pass2 = validatesPassword(password)
        validatesForm()
    }) 
}

function validatesPassword(password){
    if(password.value.length < 4){
        return false
    }else if(password.value.length >= 4){
        return true
    }
}

function validatesForm(){
    if(pass1 && pass2){
        btn.disabled = false
    }else{
        btn.disabled = true
    }
}