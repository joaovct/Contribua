// import { InvalidConnectionError } from "sequelize/types"

function validationName(name, iconName){
    if(name.value.length < 4){
        iconName.classList.remove("success-validation")
        iconName.classList.add("alert-validation")
        name.focus()
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
        lastName.focus()
        return false
    }else{
        iconLastName.classList.remove("alert-validation")
        iconLastName.classList.add("success-validation")
        return true
    }
}

function validationAddress(address, iconAddress){
    if(address.value.length < 5){
        iconError(iconAddress)
        // address.focus()
        return false
    }else{
        iconSuccess(iconAddress)
        return true
    }
}

function validationAddressNumber(addressNumber, iconNumber){
    if(addressNumber.value.length < 1){
        iconNumber.classList.remove("success-validation")
        iconNumber.classList.add("alert-validation")
        addressNumber.focus()
        return false
    }else{
        iconNumber.classList.remove("alert-validation")
        iconNumber.classList.add("success-validation")
        return true
    }
}

function validationCauses(causes){
    let checks = 0
    for(let Cause of causes){
        if(Cause.checked) checks++
    }
    if(checks<1) return false
    else return true
}

function getOptionChoose(radio){
    if(validationCauses(radio)){
        for(let r of radio){
            if(r.checked) return r
        }
    }else{
        return false
    }
}

function validationDescription(description){
    return true
}

function validationCep(cep, iconCep){
    formatCEP(cep)
    if(cep.value.length < 8){
        iconCep.classList.remove("success-validation")
        iconCep.classList.add("alert-validation")
        cep.focus()
        return false
    }else{
        iconCep.classList.add("alert-validation")
        iconCep.classList.add("success-validation")
        return true
    }
}

function validationCity(city, iconCity){
    if(city.value.length < 4){
        iconCity.classList.remove("success-validation")
        iconCity.classList.add("alert-validation")
        // city.focus()
        return false
    }
    iconCity.classList.remove("alert-validation")
    iconCity.classList.add("success-validation")
    return true
}

function validationDistrict(district, iconDistrict){
    if(district.value.length < 4){
        iconDistrict.classList.remove("success-validation")
        iconDistrict.classList.add("alert-validation")
        return false
    }
    iconDistrict.classList.remove("alert-validation")
    iconDistrict.classList.add("success-validation")
    return true
}

function validationDateBorn(date){
    if(date){
        return true
    }
    return false
}

function validationPunctualDate(pDStart, pHStart, pHEnd){
    var vDate = true
    var dStart = new Date(pDStart.value+ " " + pHStart.value)
    var dEnd = new Date(pDStart.value+ " " +pHEnd.value)
    var dCurrent = new Date()
    if(dStart <= dCurrent){
        callAlert("Ocorreu um erro", "A data de início do evento não pode ser menor que a data atual.", "error")
        vDate = false
    }
    if(dStart >= dEnd){
        callAlert("Data inválida", "A data de início não pode ser maior ou igual que a data de término.", "error")
        vDate = false
    }

    if(dStart == "Invalid Date" || dEnd == "Invalid Date" || dStart == "" || dEnd == ""){
        callAlert("Ocorreu um erro", "A(s) data digitada é inválida.", "error")
        vDate = false
    }
    return vDate
}

function validationRecurrentDate(rDStart, rHStart, rDEnd){
    var vDate = true
    var dStart = new Date(rDStart.value+ " " + rHStart.value)
    var dEnd = new Date(rDEnd.value)
    var dCurrent = new Date()

    if(dStart <= dCurrent){
        callAlert("Ocorreu um erro", "A data de início do evento não pode ser menor que a data atual.", "error")
        vDate = false
    }
    if(dStart >= dEnd){
        callAlert("Data inválida", "A data de início não pode ser maior ou igual que a data prevista de término.", "error")
        vDate = false
    }
    if(dStart == "Invalid Date" || dEnd == "Invalid Date" || dStart == "" || dEnd == ""){
        callAlert("Ocorreu um erro", "A(s) data digitada é inválida.", "error")
        vDate = false
    }
    
    return vDate 
}

function validationCNPJ(cnpj, iconCnpj){
    let bool = false
    formatCNPJ(cnpj)
    
    if(!isCNPJ(cnpj.value.replace(/\D/g,""))){
        iconCnpj.classList.remove("success-validation")
        iconCnpj.classList.add("alert-validation")
        cnpj.focus()
        bool = false
    }else{
        //ajax aqui
        $.get("http://localhost:3000/ajax-checkers?cnpj="+cnpj.value.replace(/\D/g,""))
        .done(() => {
            iconCnpj.classList.remove("success-validation")
            iconCnpj.classList.add("alert-validation")
            cnpj.focus()
            bool = false
        })
        .fail(() => {
            iconCnpj.classList.remove("alert-validation")
            iconCnpj.classList.add("success-validation")
            bool = true
        })
        
    }
    return bool
}

async function validationCPF(cpf){
    try{
        let bool = false
        formatCPF(cpf)
        
        if(!isCPF(cpf.value.replace(/\D/g,""))){
            iconCpf.classList.remove("success-validation")
            iconCpf.classList.add("alert-validation")
            cpf.focus()
            bool = false
        }else{
            const result = await $.get("http://localhost:3000/ajax-checkers?cpf="+cpf.value.replace(/\D/g,""))
            if(result){
                iconCpf.classList.remove("success-validation")
                iconCpf.classList.add("alert-validation")
                bool = false
            }
        }
        return bool
    }catch(err){
        iconCpf.classList.remove("alert-validation")
        iconCpf.classList.add("success-validation")
        return true
    }
}

function validationTelephone(telephone, iconTelephone){
    formatTelephone(telephone)
    if(telephone.value.length < 14){
        iconTelephone.classList.remove("success-validation")
        iconTelephone.classList.add("alert-validation")
        telephone.focus()
        return false
    }else{
        iconTelephone.classList.remove("alert-validation")
        iconTelephone.classList.add("success-validation")
        return true
    }
}

async function validationEmail(email, iconEmail){
    try{
        let bool
        let regex = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
        if(!regex.test(email.value)){
            iconEmail.classList.remove("success-validation")
            iconEmail.classList.add("alert-validation")
            email.focus()
            bool = false
        }else{
            const result = await $.get("http://localhost:3000/ajax-checkers?email="+email.value)
            if(result){
                iconEmail.classList.remove("success-validation")
                iconEmail.classList.add("alert-validation")
                bool = false
            }
        }
        return bool
    }catch(err){
        iconEmail.classList.remove("alert-validation")
        iconEmail.classList.add("success-validation")
        return true
    }
}

async function validationUserName(userName, iconUserName){
    try{
        let bool = false
        let regex = new RegExp(/\s+/)
        if(regex.test(userName.value) || userName.value.length < 3){
            iconUserName.classList.remove("success-validation")
            iconUserName.classList.add("alert-validation")
            userName.focus()
            bool = false
        }else{
            const result = await $.get("http://localhost:3000/ajax-checkers?userName="+userName.value)
            if(result){
                iconUserName.classList.remove("success-validation")
                iconUserName.classList.add("alert-validation")
                bool = false
            }
        }
        return bool
    }catch(err){
        iconUserName.classList.remove("alert-validation")
        iconUserName.classList.add("success-validation")
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
        password.focus()
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
        confirmPassword.focus()
        return false
    }
}

//gambiarra 
function isCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return false;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    size = cnpj.length - 2
    numbers = cnpj.substring(0,size);
    digits = cnpj.substring(size);
    sum = 0;
    pos = size - 7;
    for (i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (resultado != digits.charAt(0))
        return false;
         
    size = size + 1;
    numbers = cnpj.substring(0,size);
    sum = 0;
    pos = size - 7;
    for (i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (resultado != digits.charAt(1))
          return false;
           
    return true;
}

function isCPF(cpf){
    let sum
    let rest
    sum = 0;
    if (cpf === "00000000000") return false
    if (cpf === "11111111111") return false
    if (cpf === "22222222222") return false
    if (cpf === "33333333333") return false
    if (cpf === "44444444444") return false
    if (cpf === "55555555555") return false
    if (cpf === "66666666666") return false
    if (cpf === "77777777777") return false
    if (cpf === "88888888888") return false
    if (cpf === "99999999999") return false
     
    for (i=1; i<=9; i++){
        sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i)
        rest = (sum * 10) % 11;
    }
   
    if ((rest == 10) || (rest == 11))  rest = 0
    if (rest != parseInt(cpf.substring(9, 10)) ) return false
   
    sum = 0
    for (i = 1; i <= 10; i++){
        sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)
        rest = (sum * 10) % 11
    }
   
    if ((rest == 10) || (rest == 11)) rest = 0
    if (rest != parseInt(cpf.substring(10, 11))) return false;
    return true;
}

//formatations
function formatCNPJ(cnpj){
//     cnpj.value = cnpj.value.replace(/^(\d{2})(\d)/,"$1.$2")
//     cnpj.value = cnpj.value.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")
//     cnpj.value = cnpj.value.replace(/\.(\d{3})(\d)/,".$1/$2")
//     cnpj.value = cnpj.value.replace(/(\d{4})(\d)/,"$1-$2")
    cnpj.value = cnpj.value.replace(/\D/g,"")
    cnpj.value = cnpj.value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
}

function formatCPF(cpf){
    cpf.value = cpf.value.replace(/\D/g,"")
    cpf.value = cpf.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4")
}

function formatCEP(cep){
    cep.value = cep.value.replace(/\D/g, "")
    cep.value = cep.value.replace(/^([\d]{2})\.*([\d]{3})-*([\d]{3})/, "$1$2-$3")
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

function iconError(icon){
    icon.classList.remove("success-validation")
    icon.classList.add("alert-validation")
}

function iconSuccess(icon){
    icon.classList.remove("alert-validation")
    icon.classList.add("success-validation")
}

function iconClear(icon){
    icon.classList.remove('alert-validation')
    icon.classList.remove('success-validation')
}