const inputPhoto = document.getElementsByName("thumbnail")[0]
const preview = document.getElementById("preview")

inputPhoto.addEventListener("change", previewPhoto)

const btnAccepted = document.getElementsByClassName("accepted")
const btnRefused = document.getElementsByClassName("refuse")
const row = document.getElementsByClassName("row-subscribe")

for(let i = 0; i < btnAccepted.length; i++){
    btnAccepted[i].addEventListener("click", async () => {
        socket.emit('accept-subscribe', row[i].dataset.id)
        $(row[i]).slideUp("fast")
        await $.post("http://localhost:3000/event/accept-event?accepted=true&idActionVolunteer="+row[i].dataset.id)
    })
}

for(let i = 0; i < btnRefused.length; i++){
    btnRefused[i].addEventListener("click", async () => {
        socket.emit('refuse-subscribe', row[i].dataset.id)
        $(row[i]).slideUp("fast")
        await $.post("http://localhost:3000/event/accept-event?refuse=true&idActionVolunteer="+row[i].dataset.id)
    })
}

const cep = document.getElementById("cep")
const addressPreview = document.getElementById("address-preview")
const number = document.getElementById("number")
const address = document.getElementsByName("address")[0]
const district = document.getElementsByName("district")[0]
const city = document.getElementsByName("city")[0]

cep.addEventListener("keyup", () => {
    addressPreview.innerHTML = "..."
    addressPreview.style.background = "#3171e0"
    let script = document.createElement('script')
    script.src = 'https://viacep.com.br/ws/'+ cep.value + '/json/?callback=fillCep'
    document.body.appendChild(script)
})

function fillCep(conteudo){
    if (!("erro" in conteudo)) {
        addressPreview.innerHTML = conteudo.logradouro+", "+number.value+" - "+conteudo.bairro+", "+conteudo.localidade
        city.value = "..."
        district.value = "..."
        address.value = "..."
    }else{
        addressPreview.innerHTML = "CEP não encontrado"
        addressPreview.style.background = "#e42200"
        city.value = ""
        district.value = ""
        address.value = ""
    }
}

function showTable (table, btn){
    $(table).slideToggle('fast')
     rotate90(btn)
}