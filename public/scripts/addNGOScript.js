//Validations
const name = document.getElementsByName('ngoName')
const iconName = name[0].parentNode
const cep = document.getElementsByName('ngoCEP')
const iconCep = cep[0].parentNode
const city = document.getElementsByName("ngoCity")
const iconCity = city[0].parentNode
const district = document.getElementsByName("ngoDistrict")
const iconDistrict = district[0].parentNode
const address = document.getElementsByName('ngoAddress')
const iconAddress = address[0].parentNode
const cases = document.getElementsByClassName('form-checkbox')
const cnpj = document.getElementsByName('ngoCNPJ')
const iconCnpj = cnpj[0].parentNode

const telephone = document.getElementsByName('ngoTelephone')
const iconTelephone = telephone[0].parentNode
const email = document.getElementsByName('ngoEmail')
const iconEmail = email[0].parentNode
const userName = document.getElementsByName("ngoUserName")[0]
const iconUserName = userName.parentNode

const ngoDescription = document.getElementsByName('ngoDescription')

const submit = document.getElementsByName('registerNGO-submit')

//variables for async functions
let resultEmail
let resultUserName
let resultCnpj

name[0].addEventListener("input", () => {
    validationName(name[0], iconName)
})
for(let Case of cases){
    Case.addEventListener("click", () => {
        validationCases(cases)
    })
}
cep[0].addEventListener('keyup', ()=>{
    if(validationCep(cep[0], iconCep)){
        let script = document.createElement('script')
        script.src = 'https://viacep.com.br/ws/'+ cep[0].value + '/json/?callback=fillCep'
        document.body.appendChild(script)
    }else{
        city[0].value = ""
        district[0].value = ""
        address[0].value = ""
        validationCity(city[0], iconCity)
        validationAddress(address[0], iconAddress)
        validationDistrict(district[0], iconDistrict)
    }
})
address[0].addEventListener("keyup", () => {
    validationAddress(address[0], iconAddress)
})
cnpj[0].addEventListener("keyup", async () => {
    resultCnpj = await validationCNPJ(cnpj[0], iconCnpj)
})
telephone[0].addEventListener("keyup", () => {
    validationTelephone(telephone[0], iconTelephone)
})
email[0].addEventListener("keyup", async () => {
    resultEmail = await validationEmail(email[0], iconEmail)
})
userName.addEventListener("keyup", async () => {
   resultUserName = await validationUserName(userName, iconUserName)
})
ngoDescription[0].addEventListener("keyup", ()=>{
    validationDescription(ngoDescription)
})
submit[0].addEventListener("click", verifyForm)

function verifyForm(e){
    if(!validationName(name, iconName) || !validationAddress(address, iconAddress) || !validationCep(cep, iconCep) || 
       !validationCases(cases) || !resultCnpj || !validationTelephone(telephone, iconTelephone) ||
       !resultEmail || !validationDescription(description) || !resultUserName){
        e.preventDefault()
    }else{
        telephone.value = telephone.value.replace(/\D/g,"")
        cnpj.value = cnpj.value.replace(/\D/g,"")
    }
}

//Auto Fill cep

function fillCep(conteudo){
    if (!("erro" in conteudo)) {
        city[0].value = (conteudo.localidade)
        district[0].value = (conteudo.bairro)
        address[0].value = (conteudo.logradouro)
    }else{
        city[0].value = ""
        district[0].value = ""
        address[0].value = ""
        iconCep.classList.remove("success-validation")
        iconCep.classList.add("alert-validation")
    }
    validationCity(city[0], iconCity)
    validationAddress(address[0], iconAddress)
    validationDistrict(district[0], iconDistrict)
}
