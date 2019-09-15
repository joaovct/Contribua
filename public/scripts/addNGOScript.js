//Validations
const name = document.getElementsByName('ngoName')
const iconName = name[0].parentNode
const cep = document.getElementsByName('ngoCEP')
const iconCep = cep[0].parentNode
const address = document.getElementsByName('ngoAddress')
const cases = document.getElementsByClassName('form-checkbox')
const iconAddress = address[0].parentNode
const cnpj = document.getElementsByName('ngoCNPJ')
const iconCnpj = cnpj[0].parentNode

const telephone = document.getElementsByName('ngoTelephone')
const iconTelephone = telephone[0].parentNode
const email = document.getElementsByName('ngoEmail')
const iconEmail = email[0].parentNode

const ngoDescription = document.getElementsByName('ngoDescription')

const submit = document.getElementsByName('registerNGO-submit')

name[0].addEventListener("input", () => {
    validationName(name[0], iconName)
})
for(let Case of cases){
    Case.addEventListener("click", () => {
        validationCases(cases)
    })
}
cep[0].addEventListener('keyup', ()=>{
    validationCep(cep[0], iconCep)
})
address[0].addEventListener("keyup", () => {
    validationAddress(address[0], iconAddress)
})
cnpj[0].addEventListener("keyup", () => {
    validationCNPJ(cnpj[0], iconCnpj)
})
telephone[0].addEventListener("keyup", () => {
    validationTelephone(telephone[0], iconTelephone)
})
email[0].addEventListener("keyup", () => {
    validationEmail(email, iconEmail)
})
ngoDescription[0].addEventListener("keyup", ()=>{
    validationDescription(ngoDescription)
})
submit[0].addEventListener("click", verifyForm)

function verifyForm(e){
    if(!validationName(name, iconName) || !validationAddress(address, iconAddress) || !validationCep(cep, iconCep) || 
       !validationCases(cases) || !validationCNPJ(cnpj, iconCnpj) || !validationTelephone(telephone, iconTelephone) ||
       !validationEmail(email, iconEmail) || !validationDescription(description)){
        e.preventDefault()
    }else{
        telephone.value = telephone.value.replace(/\D/g,"")
        cnpj.value = cnpj.value.replace(/\D/g,"")
    }
}
