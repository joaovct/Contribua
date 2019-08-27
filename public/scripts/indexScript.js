function init(){
    linkLogin = document.querySelector("#form-link-login")
    linkRegister = document.querySelector("#form-link-register")
    addEventForms();
    getInputForms();
}

function getInputForms(){
    inputLogin = document.getElementsByClassName("login-input")
    btnLogin = document.getElementById("login-submit")
    addEventInput(inputLogin, btnLogin)
    checksForm(inputLogin, btnLogin)
    inputRegister = document.getElementsByClassName("register-input")
    btnRegister = document.getElementById("register-submit")
    addEventInput(inputRegister,btnRegister)
    checksForm(inputRegister, btnRegister)
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
    formRegister = document.querySelector("#form-register")
    window.linkLogin.addEventListener("click", ()=>{
        formLogin.style.display = "block"
        formRegister.style.display = "none"
    })
    window.linkRegister.addEventListener("click", ()=> {
        formRegister.style.display = "block"
        formLogin.style.display = "none"
        
    })
}