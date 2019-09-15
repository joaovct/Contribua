const name = document.getElementsByName("nameVolunteer")[0]
const lastName = document.getElementsByName("lastNameVolunteer")[0]
const email = document.getElementsByName("emailVolunteer")[0]
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
const iconCpf = cpf.parentNode
const iconCep = cep.parentNode
const iconCity = city.parentNode
const iconAddress = address.parentNode
const iconDate = date.parentNode
const iconDistrict = district.parentNode
const iconPassword = password.parentNode
const iconConfirmPassword = confirmPassword.parentNode

name.addEventListener("keyup", () => {
    validationName(name, iconName)
})
lastName.addEventListener("keyup", () => {
    validationLastName(lastName, iconLastName)
})
email.addEventListener("keyup", () => {
    validationEmail(email, iconEmail)
})
cpf.addEventListener("keyup", () => {
    validationCPF(cpf, iconCpf)
})

cep.addEventListener("keyup", () => {
    validationCep(cep, iconCep)
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
    if(!validationName(name, iconName)|| !validationLastName(lastName, iconLastName) || !validationEmail(email, iconEmail) ||
       !validationPassword(password, iconPassword) || !validationConfirmPassword(confirmPassword, iconConfirmPassword) ||
       !validationCPF(cpf, iconCpf) || !validationCep(cep, iconCep) || !validationCity(city, iconCity) ||
       !validationDistrict(district, iconDistrict), !validationAddress(address, iconAddress), !validationNumber(num, iconNum) ||
       !validationDateBorn(date) || !validationCauses(causes)){
        e.preventDefault()
    }
}