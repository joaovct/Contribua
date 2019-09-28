const name = document.getElementsByName("nameVolunteer")[0]
const lastName = document.getElementsByName("lastNameVolunteer")[0]
const email = document.getElementsByName("emailVolunteer")[0]
const userName = document.getElementsByName("userNameVolunteer")[0]
const cpf = document.getElementsByName("cpfVolunteer")[0]
const cep = document.getElementsByName("cepVolunteer")[0]
const city = document.getElementsByName("cityVolunteer")[0]
const district = document.getElementsByName("districtVolunteer")[0]
const address = document.getElementsByName("addressVolunteer")[0]
const date = document.getElementsByName("dateBornVolunteer")[0]
const causes = document.getElementsByClassName("form-checkbox")
const password = document.getElementsByName("passwordVolunteer")[0]
const confirmPassword = document.getElementsByName("confirmPasswordVolunteer")[0]
const submit = document.getElementById("submit")

const iconName = name.parentNode
const iconLastName = lastName.parentNode
const iconEmail = email.parentNode
const iconUserName = userName.parentNode
const iconCpf = cpf.parentNode
const iconCep = cep.parentNode
const iconCity = city.parentNode
const iconAddress = address.parentNode
const iconDate = date.parentNode
const iconDistrict = district.parentNode
const iconPassword = password.parentNode
const iconConfirmPassword = confirmPassword.parentNode

//variables for async functions
let resultEmail
let resultUserName
let resultCpf

name.addEventListener("keyup", () => {
    validationName(name, iconName)
})
lastName.addEventListener("keyup", () => {
    validationLastName(lastName, iconLastName)
})
email.addEventListener("keyup", async () => {
    resultEmail = await validationEmail(email, iconEmail)
})

userName.addEventListener("keyup",  async () => {
    resultUserName = await validationUserName(userName, iconUserName)
})

cpf.addEventListener("keyup", async () => {
    resultCpf = await validationCPF(cpf, iconCpf)
})

cep.addEventListener("keyup", () => {
    if(validationCep(cep, iconCep)){
        city.value = "..."
        district.value = "..."
        address.value = "..."
        let script = document.createElement('script')
        script.src = 'https://viacep.com.br/ws/'+ cep.value + '/json/?callback=fillCep'
        document.body.appendChild(script)
    }else{
        city.value = "";
        district.value = "";
        address.value = ""; 
        validationCity(city, iconCity)
        validationAddress(address, iconAddress)
        validationDistrict(district, iconDistrict)
    }
})

city.addEventListener("keyup", () => {
    validationCity(city, iconCity)
})

district.addEventListener("keyup", () => {
    validationDistrict(district, iconDistrict)
})

address.addEventListener("keyup", () => {
    validationAddress(address, iconAddress)
})

date.addEventListener("keyup", () => {
    validationDateBorn(date, iconDate)
})

password.addEventListener("keyup", () => {
    validationPassword(password, iconPassword)
})

confirmPassword.addEventListener("keyup", () => {
    validationConfirmPassword(confirmPassword, iconConfirmPassword)
})

submit.addEventListener("click", verifyForm)

function verifyForm(e){

    if(!validationName(name, iconName)|| !validationLastName(lastName, iconLastName) || !resultEmail ||
       !validationPassword(password, iconPassword) || !validationConfirmPassword(confirmPassword, iconConfirmPassword) ||
       !resultCpf || !validationCep(cep, iconCep) || !validationCity(city, iconCity) ||
       !validationDistrict(district, iconDistrict) || !validationAddress(address, iconAddress) || !validationCauses(causes) ||
       !resultUserName){
        e.preventDefault()
    }
}

//auto fill cep
function fillCep(conteudo){
    if (!("erro" in conteudo)) {
        city.value = (conteudo.localidade)
        district.value = (conteudo.bairro)
        address.value = (conteudo.logradouro)
    }else{
        city.value = "";
        district.value = "";
        address.value = ""; 
        iconCep.classList.remove("success-validation")
        iconCep.classList.add("alert-validation")
    }
    validationCity(city, iconCity)
    validationAddress(address, iconAddress)
    validationDistrict(district, iconDistrict)
}