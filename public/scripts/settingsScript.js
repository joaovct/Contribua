//preview perfil
const inputPhoto = document.getElementsByName("photo")[0]
const preview = document.getElementsByClassName("label-profile-pic")[0]
const cep = document.getElementsByName("cep")[0]
const city = document.getElementsByName("city")[0]
const district = document.getElementsByName("district")[0]
const address = document.getElementsByName("address")[0]

inputPhoto.addEventListener("change", previewPhoto)

cep.addEventListener("keyup", () => {
    city.value = "..."
    district.value = "..."
    address.value = "..."
    let script = document.createElement('script')
    script.src = 'https://viacep.com.br/ws/'+ cep.value + '/json/?callback=fillCep'
    document.body.appendChild(script)
})

function fillCep(conteudo){
    if (!("erro" in conteudo)) {
        city.value = (conteudo.localidade)
        district.value = (conteudo.bairro)
        address.value = (conteudo.logradouro)
    }else{
        city.value = ""
        district.value = ""
        address.value = ""
    }
}