function init(){
    linkLogin = document.querySelector("#form-link-login")
    linkLogin2 = document.querySelector("#form-link-login2")
    linkRegister = document.querySelector("#form-link-register")
    linkRegister2 = document.querySelector("#form-link-register2")
    linkLoginOng = document.querySelector("#form-link-login-ong")
    addEventForms();
    getInputForms();
}

function getInputForms(){
    inputLogin = document.getElementsByClassName("login-input")[0]
    btnLogin = document.getElementById("login-submit")
    addEventInput(inputLogin, btnLogin)
    checksForm(inputLogin, btnLogin)
    inputRegister = document.getElementsByClassName("register-input")
    btnRegister = document.getElementById("register-submit")
    addEventInput(inputRegister,btnRegister)
    checksForm(inputRegister, btnRegister)
    inputLoginOng = document.getElementsByClassName("login-input")[1]
    btnLoginOng = document.getElementById("login-ong-submit")
    addEventInput(inputLoginOng, btnLoginOng)
    checksForm(inputLoginOng, btnLoginOng)
}

function addEventInput(input,btn){
    for(i=0;i<input.length;i++){
        input[i].addEventListener("input", ()=>{
            checksForm(input, btn)
        })
    }
}

function checksForm(input,btn){
    var c = true
    for(i=0; i < input.length; i++){
        if(input[i].value=="" || input[i].value == undefined || input[i].value == null) c = false
    }
    if (c) btn.disabled = false
    if (!c) btn.disabled = true
}

function addEventForms(){
    formLogin = document.querySelector("#form-login")
    formLoginOng = document.querySelector("#form-login-ong")
    formRegister = document.querySelector("#form-register")
    window.linkLogin.addEventListener("click", ()=>{
        formLogin.style.display = "block"
        formRegister.style.display = "none"
        formLoginOng.style.display = "none"
    })
    window.linkLogin2.addEventListener("click", ()=>{
        formLogin.style.display = "block"
        formRegister.style.display = "none"
        formLoginOng.style.display = "none"
    })
    window.linkRegister.addEventListener("click", ()=> {
        formRegister.style.display = "block"
        formLogin.style.display = "none"
        formLoginOng.style.display = "none"
    })
    window.linkRegister2.addEventListener("click", ()=> {
        formRegister.style.display = "block"
        formLogin.style.display = "none"
        formLoginOng.style.display = "none"
    })
    window.linkLoginOng.addEventListener("click", ()=> {
        formLoginOng.style.display = "block"
        formLogin.style.display = "none"
        formRegister.style.display = "none"
    })
}

//validations

const name = document.getElementsByClassName("form-input")[2]
const iconName = document.getElementsByClassName("icon-input")[0]
const lastName = document.getElementsByClassName("form-input")[3]
const iconLastName = document.getElementsByClassName("icon-input")[1]
const email = document.getElementsByClassName("form-input")[4]
const iconEmail = document.getElementsByClassName("icon-input")[2]
const password = document.getElementsByClassName("form-input")[5]
const iconPassword = document.getElementsByClassName("icon-input")[3]
const confirmPassword = document.getElementsByClassName("form-input")[6]
const iconConfirmPassword = document.getElementsByClassName("icon-input")[4]
const submit = document.getElementById("register-submit")

name.addEventListener("keyup", validationName)
lastName.addEventListener("keyup", validationLastName)
email.addEventListener("keyup", validationEmail)
password.addEventListener("keyup", validationPassword)
confirmPassword.addEventListener("keyup", validationConfirmPassword)
submit.addEventListener("click", verifyForm)

function verifyForm(e){
    if(!validationName() || !validationLastName() || !validationEmail()
        || !validationPassword() || !validationConfirmPassword()){
        alert("Há campos incorretos ou vazios")
        e.preventDefault()
    }
}