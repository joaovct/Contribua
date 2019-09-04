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
const cnpj = document.getElementsByClassName("form-input")[2]
const iconCnpj = document.getElementsByClassName("icon-input")[2]
const telephone = document.getElementsByClassName("form-input")[3]
const iconTelephone = document.getElementsByClassName("icon-input")[3]
const email = document.getElementsByClassName("form-input")[4]
const iconEmail = document.getElementsByClassName("icon-input")[4]
const password = document.getElementsByClassName("form-input")[5]
const iconPassword = document.getElementsByClassName("icon-input")[5]
const confirmPassword = document.getElementsByClassName("form-input")[6]
const iconConfirmPassword = document.getElementsByClassName("icon-input")[6]
const submit = document.getElementById("registerNGO-submit")

name.addEventListener("keyup", validationName)
address.addEventListener("keyup", validationAddress)
cnpj.addEventListener("keyup", validationCNPJ)
telephone.addEventListener("keyup", validationTelephone)
email.addEventListener("keyup", validationEmail)
password.addEventListener("keyup", validationPassword)
confirmPassword.addEventListener("keyup", validationConfirmPassword)
submit.addEventListener("click", verifyForm)

function verifyForm(e){
    if(!validationName() || !validationAddress() || !validationCNPJ() || !validationEmail() || !validationTelephone()
       || !validationPassword() || !validationConfirmPassword()){
        alert("Há campos incorretos ou vazios")
        e.preventDefault()
    }else{
        telephone.value = telephone.value.replace(/\D/g,"")
        cnpj.value = cnpj.value.replace(/\D/g,"")
    }
}
