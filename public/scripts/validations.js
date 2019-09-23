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
        iconAddress.classList.remove("success-validation")
        iconAddress.classList.add("alert-validation")
        address.focus()
        return false
    }else{
        iconAddress.classList.remove("alert-validation")
        iconAddress.classList.add("success-validation")
        return true
    }
}

function validationCauses(causes){
    let checks = 0
    for(let Cause of causes){
        if(Cause.checked) checks++
    }
    console.log(checks)
    if(checks<1) return false
    else return true
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
        city.focus()
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

function validationCNPJ(cnpj, iconCnpj){

    formatCNPJ(cnpj)
    
    if(!isCNPJ(cnpj.value.replace(/\D/g,""))){
        iconCnpj.classList.remove("success-validation")
        iconCnpj.classList.add("alert-validation")
        cnpj.focus()
        return false
    }else{
        iconCnpj.classList.remove("alert-validation")
        iconCnpj.classList.add("success-validation")
        return true
    }
}

function validationCPF(cpf){
    
    formatCPF(cpf)
    
    if(!isCPF(cpf.value.replace(/\D/g,""))){
        iconCpf.classList.remove("success-validation")
        iconCpf.classList.add("alert-validation")
        cpf.focus()
        return false
    }else{
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

function validationEmail(email, iconEmail){
    let regex = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if(!regex.test(email.value)){
        iconEmail.classList.remove("success-validation")
        iconEmail.classList.add("alert-validation")
        email.focus()
        return false
    }else{
        console.log("passou")
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