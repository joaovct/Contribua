function validationName(name, iconName){
    if(name.value.length < 4){
        iconName.classList.remove("success-validation")
        iconName.classList.add("alert-validation")
        return false
    }else{
        iconName.classList.remove("alert-validation")
        iconName.classList.add("success-validation")
        return true
    }
}

function validationLastName(){
    if(lastName.value.length < 4){
        iconLastName.classList.remove("success-validation")
        iconLastName.classList.add("alert-validation")
        return false
    }else{
        iconLastName.classList.remove("alert-validation")
        iconLastName.classList.add("success-validation")
        return true
    }
}

function validationAddress(address, iconAddress){
    if(address.value.length < 5){
        iconAddress.classList.remove("success-validation")
        iconAddress.classList.add("alert-validation")
        return false
    }else{
        iconAddress.classList.remove("alert-validation")
        iconAddress.classList.add("success-validation")
        return true
    }
}

function validationCases(cases){
    let checks = 0
    for(let Case of cases){
        if(Case.checked) checks++
    }
    console.log(checks)
    if(checks<2) return false
    else return true
}

function validationDescription(description){
    return true
}

function validationCep(cep, iconCep){
    return true
}

function validationCNPJ(cnpj, iconCnpj){

    formatCNPJ(cnpj)
    
    if(!isCNPJ(cnpj.value.replace(/\D/g,""))){
        iconCnpj.classList.remove("success-validation")
        iconCnpj.classList.add("alert-validation")
        return false
    }else{
        iconCnpj.classList.remove("alert-validation")
        iconCnpj.classList.add("success-validation")
        return true
    }
}

function validationTelephone(telephone, iconTelephone){
    formatTelephone(telephone)
    if(telephone.value.length < 14){
        iconTelephone.classList.remove("success-validation")
        iconTelephone.classList.add("alert-validation")
        return false
    }else{
        iconTelephone.classList.remove("alert-validation")
        iconTelephone.classList.add("success-validation")
        return true
    }
}

function validationEmail(email, iconEmail){
    let regex = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if(!regex.test(email.value)){
        iconEmail.classList.remove("success-validation")
        iconEmail.classList.add("alert-validation")
        return false
    }else{
        iconEmail.classList.remove("alert-validation")
        iconEmail.classList.add("success-validation")
        return true
    }
}

function validationPassword(password, iconPassword){
    let lowerWord = new RegExp(/[a-z]+/)
    let upperWord = new RegExp(/[A-Z]+/)
    let numbers = new RegExp(/\d/)
    let force = 0

    // validationConfirmPassword()

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
        return false
    }else if(force < 4){
        iconPassword.classList.remove("success-validation")
        iconPassword.classList.remove("alert-validation")
        iconPassword.classList.add("caution-validation")
        return true
    }else if(force === 4){
        iconPassword.classList.remove("caution-validation")
        iconPassword.classList.remove("alert-validation")
        iconPassword.classList.add("success-validation")
        return true
    }
}

function validationConfirmPassword(confirmPassword, iconConfirmPassword){
    if(confirmPassword.value === password.value && confirmPassword.value.length != 0){
        iconConfirmPassword.classList.remove("alert-validation")
        iconConfirmPassword.classList.add("success-validation")
        return true
    }else{
        iconConfirmPassword.classList.remove("success-validation")
        iconConfirmPassword.classList.add("alert-validation")
        return false
    }
}

//gambiarra 
function isCNPJ(cnpj, iconCnpj) {
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