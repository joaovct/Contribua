function init(){
    form = document.getElementsByName("form-registerNGO")
    forms = document.getElementsByClassName("registerNGO")
    steps = document.getElementsByClassName("step")
    btns = document.getElementsByClassName("form-submit")
    addEventClick(steps)
    addEventClick(btns)
    addEventInput()
    // console.log(form)
}

function addEventClick(el){
    for(i=0;i<el.length; i++){
        el[i].order = i
        // console.log(el[i].order)
        el[i].addEventListener("click", (e) => {
            if(e.target.order != undefined){
                changeForm(e.target.order, "btn")
                console.log("AEEEee")
            }else{
                e = e.path[1].title
                e = parseInt(e) - 1
                changeForm(e, "step")
            }
        })
    }
}

function addEventInput(f){
    inputs = document.getElementsByClassName("form-input")
    btnSubmit = document.getElementById("registerNGO-submit")
    for(i=0;i<inputs.length;i++){
        inputs[i].addEventListener("input", () => {
            checksForm(inputs, btnSubmit)
        })
    }
}

function checksForm(inputs, btn){
    var c = true;
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "" || inputs[i].value == null || inputs[i].value == undefined) c = false;
    }
    if (c) btn.disabled = false;
    if (!c) btn.disabled = true;
}

function changeForm(n, format){
    // console.log(n, format)
    if(n>=0){
        if(format == "step"){
            for(i=0;i<forms.length;i++){
                if(i==n) forms[n].style.display = "block"
                else forms[i].style.display = "none"
            }
            animatesStep(n)
        }else{
            if(n<2){
                forms[n+1].style.display = "block"
                forms[n].style.display = "none"
                animatesStep(n+1)
            } 
        }
    }
}

function animatesStep(n){
    for(i=0;i<steps.length;i++){
        if(i!=n) steps[i].classList.add("disabled")
        else{
            steps[i].classList.remove("disabled")
        }
    }
}

//Validations
const name = document.getElementsByClassName("form-input")[0]
const iconName = document.getElementsByClassName("icon-input")[0]
const address = document.getElementsByClassName("form-input")[1]
const iconAddress = document.getElementsByClassName("icon-input")[1]
const cnpj = document.getElementsByClassName("form-input")[3]
const iconCnpj = document.getElementsByClassName("icon-input")[2]
const telephone = document.getElementsByClassName("form-input")[4]
const iconTelephone = document.getElementsByClassName("icon-input")[3]
const email = document.getElementsByClassName("form-input")[5]
const iconEmail = document.getElementsByClassName("icon-input")[4]
const password = document.getElementsByClassName("form-input")[6]
const iconPassword = document.getElementsByClassName("icon-input")[5]
const confirmPassword = document.getElementsByClassName("form-input")[7]
const iconConfirmPassword = document.getElementsByClassName("icon-input")[6]
const submit = document.getElementById("registerNGO-submit")
let err = 0;

name.addEventListener("keyup", validationName)
address.addEventListener("keyup", validationAddress)
cnpj.addEventListener("keydown", validationCNPJ)
telephone.addEventListener("keydown", validationTelephone)
email.addEventListener("keyup", validationEmail)
password.addEventListener("keyup", validationPassword)
confirmPassword.addEventListener("keyup", validationConfirmPassword)
submit.addEventListener("click", verifyForm)

function verifyForm(e){
    if(err > 0){
        alert("Há campos incorretos ou vazios")
        e.preventDefault()
    }else{
        telephone.value = telephone.value.replace(/\D/g,"")
        cnpj.value = cnpj.value.replace(/\D/g,"")
    }
}

function validationName(){
    if(name.value.length < 4){
        iconName.classList.remove("success-validation")
        iconName.classList.add("alert-validation")
        err++
    }else{
        iconName.classList.remove("alert-validation")
        iconName.classList.add("success-validation")
    }
}

function validationAddress(){
    if(address.value.length < 5){
        iconAddress.classList.remove("success-validation")
        iconAddress.classList.add("alert-validation")
        err++
    }else{
        iconAddress.classList.remove("alert-validation")
        iconAddress.classList.add("success-validation")
    }
}

function validatioCases(){
}

function validationCNPJ(){

    formatCNPJ(cnpj)
    
    if(!isCNPJ(cnpj.value.replace(/\D/g,""))){
        iconCnpj.classList.remove("success-validation")
        iconCnpj.classList.add("alert-validation")
        err++
    }else{
        iconCnpj.classList.remove("alert-validation")
        iconCnpj.classList.add("success-validation")
    }
}

function validationTelephone(){
    formatTelephone(telephone)
    if(telephone.value.length < 14){
        iconTelephone.classList.remove("success-validation")
        iconTelephone.classList.add("alert-validation")
        err++
    }else{
        iconTelephone.classList.remove("alert-validation")
        iconTelephone.classList.add("success-validation")
    }
}

function validationEmail(){
    let regex = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if(!regex.test(email.value)){
        iconEmail.classList.remove("success-validation")
        iconEmail.classList.add("alert-validation")
        err++
    }else{
        iconEmail.classList.remove("alert-validation")
        iconEmail.classList.add("success-validation")
    }
}

function validationPassword(){
    let lowerWord = new RegExp(/[a-z]+/)
    let upperWord = new RegExp(/[A-Z]+/)
    let numbers = new RegExp(/\d/)
    let force = 0

    if(password.value.length >= 4){
        force++
    }

    if(lowerWord.test(password.value)){
        force++
    }

    if(upperWord.test(password.value)){
        force++
    }

    if(numbers.test(password.value)){
        force++
    }

    if(force < 2){
        iconPassword.classList.remove("success-validation")
        iconPassword.classList.remove("caution-validation")
        iconPassword.classList.add("alert-validation")
        err++
    }else if(force < 4){
        iconPassword.classList.remove("success-validation")
        iconPassword.classList.remove("alert-validation")
        iconPassword.classList.add("caution-validation")
        err++
    }else if(force === 4){
        iconPassword.classList.remove("caution-validation")
        iconPassword.classList.remove("alert-validation")
        iconPassword.classList.add("success-validation")
    }
    validationConfirmPassword()
}

function validationConfirmPassword(){
    if(confirmPassword.value === password.value){
        iconConfirmPassword.classList.remove("alert-validation")
        iconConfirmPassword.classList.add("success-validation")
    }else{
        iconConfirmPassword.classList.remove("success-validation")
        iconConfirmPassword.classList.add("alert-validation")
        err++
    }
}

//gambiarra 
function isCNPJ(cnpj) {
    let base = cnpj.substr(0, 12).split("")
    let dvs = cnpj.substr(12, 14).split("")
    let weights = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    let baseMultiplied = []
    let baseSum
    let dv1
    let dv2

    if(cnpj === "00000000000000" || cnpj === "11111111111111" ||
    cnpj === "22222222222222" || cnpj === "33333333333333" ||
    cnpj === "44444444444444" || cnpj === "55555555555555" ||
    cnpj === "66666666666666" || cnpj === "77777777777777" ||
    cnpj === "88888888888888" || cnpj === "99999999999999" ||
    cnpj.length != 14){
        return false
    }

    //dv1
    baseMultiplied = base.map((elem, i) => {
        return weights[i] * parseInt(base[i])
    })

    baseSum = baseMultiplied.reduce((prevVal, elem) => {
        return prevVal + elem
    }, 0)

    dv1 = (baseSum%11)
    if(dv1 < 11){
        dv1 = 11-dv1
    }else{
        dv1 = dv1-11
    }

    base.push(dv1.toString())
    weights.unshift(6)

    //dv2
    baseMultiplied = base.map((elem, i) => {
        return weights[i] * parseInt(base[i])
    })

    baseSum = baseMultiplied.reduce((prevVal, elem) => {
        return prevVal + elem
    }, 0)

    dv2 = (baseSum%11)
    if(dv2 < 11){
        dv2 = 11 - dv2
    }else{
        dv2 = dv2 - 11
    }

    //verify dvs
    if(dv1.toString() != dvs[0]){
        return false
    }

    if(dv2.toString() != dvs[1]){
        return false
    }

    return true
}

//formatations
function formatCNPJ(cnpj){
    cnpj.value = cnpj.value.replace(/\D/g,"")
    cnpj.value = cnpj.value.replace(/^(\d{2})(\d)/,"$1.$2")
    cnpj.value = cnpj.value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
    cnpj.value = cnpj.value.replace(/\.(\d{3})(\d)/,".$1/$2")
    cnpj.value = cnpj.value.replace(/(\d{4})(\d)/,"$1-$2")
}

function formatTelephone(telephone){
    telephone.value = telephone.value.replace(/\D/g,"")                 
    telephone.value = telephone.value.replace(/^(\d\d)(\d)/g,"($1) $2")
    if(telephone.value.length === 14){
        telephone.value = telephone.value.replace(/(\d{5})(\d)/,"$1-$2")
    }else{
        telephone.value = telephone.value.replace(/(\d{4})(\d)/,"$1-$2")
    }
}