module.exports = {
    filledField(field){
        if(!field || field == undefined || field == null){
            return false
        }

        if(field.length < 3){
            return false
        }
        return true
    },
    email(email){
        let regex = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
        if(!regex.test(email)){
            return false
        }
        return true
    },
    isCPF(cpf){
        let sum
        let rest
        sum = 0;
        if (cpf == "00000000000") return false
        
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
    },
    isCNPJ(cnpj){
        if(cnpj == '') return false
     
    if (cnpj.length != 14)
        return false
 
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
        return false
         
    size = cnpj.length - 2
    numbers = cnpj.substring(0,size)
    digits = cnpj.substring(size)
    sum = 0
    pos = size - 7
    for (i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--
      if (pos < 2)
            pos = 9
    }
    resultado = sum % 11 < 2 ? 0 : 11 - sum % 11
    if (resultado != digits.charAt(0))
        return false
         
    size = size + 1
    numbers = cnpj.substring(0,size)
    sum = 0
    pos = size - 7
    for (i = size; i >= 1; i--) {
      sum += numbers.charAt(size - i) * pos--;
      if (pos < 2)
            pos = 9
    }
    resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (resultado != digits.charAt(1))
          return false;
           
    return true;
    }
}