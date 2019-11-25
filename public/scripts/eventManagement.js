"use strict"

const idAction = document.getElementById('keeper-idAction').dataset.idaction
let inputIdVacancies = document.getElementsByName('idVacancies')
inputIdVacancies = Array.from(inputIdVacancies)
const idVacancies = inputIdVacancies.map(id=>{
    return id.value
})

async function addEventToButtons () {
    let btnRequest = document.getElementsByClassName('btn-request')
    btnRequest = Array.from(btnRequest)
    btnRequest.map((btn)=>{
        btn.addEventListener('click', async ()=>{
            let type = btn.dataset.type
            let id = btn.dataset.id

            let doUpdateTable = btn.dataset.updatevacancy

            if (await type==="accept"){
                await acceptRequest(id)
            } 
            else if(await type==="refuse"){
                await refuseRequest(id)
            }

            console.log(doUpdateTable)
            updateTable()
            if(doUpdateTable){
                idVacancies.map(id=>{
                    updateTable(id)
                })
            }
        })
    })
}

addEventToButtons()

async function acceptRequest (idActionVolunteer) {
    socket.emit('accept-subscribe', idActionVolunteer)
    $.post(`http://localhost:3000/event/accept-event?accepted=true&idActionVolunteer=${idActionVolunteer}`)
}

async function refuseRequest (idActionVolunteer) {
    socket.emit('refuse-subscribe', idActionVolunteer)
    $.post(`http://localhost:3000/event/accept-event?refuse=true&idActionVolunteer=${idActionVolunteer}`)
}

async function updateTable(idVacancy){
    setTimeout(async () => { 
        if(idVacancy == undefined) idVacancy = null
        await $.post(`http://localhost:3000/event/${idAction}/management/subscribers/${idVacancy}`, async (data)=>{
            writeVacanciesRequests(data.vacanciesRequests, idVacancy)
            writeVacanciesAccepted(data.vacanciesAccepted, idVacancy)
            writeVacanciesRejected(data.vacanciesRejected, idVacancy)
            writeNumbersData(data, idVacancy)
            addEventToButtons()
        })
     }, 100);
}

async function writeVacanciesRequests(vacancies, idVacancy){
    let title, table, tableBody, updateTable
    if(idVacancy){
        title = $(`#title-table-requets-${idVacancy}`)
        table = $(`#table-requests-${idVacancy}`)
        tableBody = $(`#table-body-requests-${idVacancy}`)
        updateTable = "data-updatevacancy='true'"
    }else{
        title = $("#title-table-requests")
        table = $("#table-requests")
        tableBody = $("#table-body-requests")
        updateTable = ""
    }

    if(vacancies === undefined) vacancies = []
    Array.from(vacancies)

    $(title).html(`Solicitações (${vacancies.length})`)
    tableBody.empty()
    
    if(vacancies.length){

        vacancies.map((vacancy,i)=>{
            tableBody.append(`
            <div class="row row-subscribe">
                <div class="full-width display-flex">
                    <div class="flex-row">
                        <figure class="table-pic">
                            <img src="/temp/uploads/profile/${vacancy.photoVolunteer}" />
                        </figure>
                        <article class="margin-left1">${vacancy.nameVolunteer}
                                ${vacancy.lastNameVolunteer}</h1>
                            <p class="gray smallest-text margin0 padding0">${vacancy.cityVolunteer}</p>
                        </article>
                    </div>
                    <div class="flex-row">
                        <p class="text">${vacancy.nameVacancy}</p>
                    </div>
                    <div class="flex-row">${vacancy.averageStarVolunteer}</div>
                    <div class="flex-row justifyContent-end">
                        <button data-type="refuse" data-id="${vacancy.idActionVolunteer}" ${updateTable} class="btn-danger-outlined margin-right2 btn-request">Recusar</button>
                        <button data-type="accept" data-id="${vacancy.idActionVolunteer}" ${updateTable} class="btn-primary btn-request">Aceitar inscrição</button>
                    </div>
                </div>
            </div>
            `)
        })
    }
}

async function writeVacanciesAccepted(vacancies, idVacancy){
    let title, table, tableBody, updateTable, repeated

    if(idVacancy){
        title = $(`#title-table-accepted-${idVacancy}`)
        table = $(`#table-accepted-${idVacancy}`)
        tableBody = $(`#table-body-accepted-${idVacancy}`)
        updateTable = "data-updatevacancy='true'"
        repeated = "-repeated"
    }else{
        title = $("#title-table-accepted")
        table = $("#table-accepted")
        tableBody = $("#table-body-accepted")
        updateTable = ""
        repeated = ""
    }

    if(vacancies === undefined) vacancies = []
    Array.from(vacancies)

    $(title).html(`Inscrições aceitas (${vacancies.length})`)
    tableBody.empty()
    
    if(vacancies.length){
        vacancies.map((vacancy,i)=>{
                tableBody.append(`
                <div class="row row-action">
                        <div class="full-width display-flex">
                            <div class="flex-row">
                                <figure class="table-pic">
                                    <img src="/temp/uploads/profile/${vacancy.photoVolunteer}" />
                                </figure>
                                <article class="margin-left1">
                                    <h1 class="small-text medium-weight-text margin0 padding0">${vacancy.nameVolunteer}
                                        ${vacancy.lastNameVolunteer}</h1>
                                    <p class="gray smallest-text margin0 padding0">${vacancy.cityVolunteer}</p>
                                </article>
                            </div>
                            <div class="flex-row">
                                <p class="text">${vacancy.nameVacancy}</p>
                            </div>
                            <div class="flex-row">${vacancy.averageStarVolunteer}</div>
                            <div class="flex-row">
                                <p class="green-rounded margin0 margin-right4">Aceito</p>
                                <figure onclick="hideOptions('.member-options-${vacancy.idActionVolunteer}${repeated}')"
                                    class="member-options-icon">
                                    <img src="/assets/imgs/threedots.svg">
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="member-options member-options-${vacancy.idActionVolunteer}${repeated}">
                    <ul class="items">
                        <li data-type="refuse" data-id="${vacancy.idActionVolunteer}" ${updateTable} class="item red btn-request">Cancelar inscrição</li>
                    </ul>
                </div>
                `)
        })
    }
}

async function writeVacanciesRejected(vacancies, idVacancy){
    let title, table, tableBody, updateTable, repeated

    if(idVacancy){
        title = $(`#title-table-rejected-${idVacancy}`)
        table = $(`#table-rejected-${idVacancy}`)
        tableBody = $(`#table-body-rejected-${idVacancy}`)
        updateTable = "data-updatevacancy='true'"
        repeated = "-repeated"
    }else{
        title = $("#title-table-rejected")
        table = $("#table-rejected")
        tableBody = $("#table-body-rejected")
        updateTable
        repeated = ""
    }

    if(vacancies === undefined) vacancies = []
    Array.from(vacancies)

    $(title).html(`Inscrições não aceitas (${vacancies.length})`)
    tableBody.empty()
    
    if(vacancies.length){

            vacancies.map((vacancy,i)=>{
                tableBody.append(`
                <div class="row row-action">
                        <div class="full-width display-flex">
                            <div class="flex-row">
                                <figure class="table-pic">
                                    <img src="/temp/uploads/profile/${vacancy.photoVolunteer}" />
                                </figure>
                                <article class="margin-left1">
                                    <h1 class="small-text medium-weight-text margin0 padding0">${vacancy.nameVolunteer}
                                        ${vacancy.lastNameVolunteer}</h1>
                                    <p class="gray smallest-text margin0 padding0">${vacancy.cityVolunteer}</p>
                                </article>
                            </div>
                            <div class="flex-row">
                                <p class="text">${vacancy.nameVacancy}</p>
                            </div>
                            <div class="flex-row">${vacancy.averageStarVolunteer}</div>
                            <div class="flex-row">
                                <p class="red-rounded margin0 margin-right4">Não aceito</p>
                                <figure onclick="hideOptions('.member-options-${vacancy.idActionVolunteer}${repeated}')"
                                    class="member-options-icon">
                                    <img src="/assets/imgs/threedots.svg">
                                </figure>
                            </div>
                        </div>
                    </div>
                    <div class="member-options member-options-${vacancy.idActionVolunteer}${repeated}">
                    <ul class="items">
                        <li data-type="accept" data-id="${vacancy.idActionVolunteer}" ${updateTable} class="item btn-request">Aceitar inscrição</li>
                    </ul>
                </div>
                `)
            })
        
    }
}

async function writeNumbersData(data, idVacancy){
    let elData

    if(idVacancy){
        elData = $(`#job-data-${idVacancy}`)
    }else{
        elData = $('#all-jobs-data')
    }

    elData.empty()
    elData.prepend(`
        <li>
            <p>Voluntários inscritos</p>
            <h3>${data.qtdInscriptions}</h3>
        </li>
        <li>
            <p>Vagas restantes</p>
            <h3>${data.qtdRemaining}</h3>
        </li>
        <li>
            <p>Solicitações</p>
            <h3>${data.qtdRequests}</h3>
        </li>
    `)
}

const inputPhoto = document.getElementsByName("thumbnail")[0]
const preview = document.getElementById("preview")

inputPhoto.addEventListener("change", previewPhoto)

const cep = document.getElementById("cep")
const addressPreview = document.getElementById("address-preview")
const number = document.getElementById("number")
const address = document.getElementsByName("address")[0]
const district = document.getElementsByName("district")[0]
const city = document.getElementsByName("city")[0]

cep.addEventListener("keyup", () => {
    addressPreview.innerHTML = "..."
    addressPreview.classList.remove("red-rounded")
    addressPreview.classList.add("blue-rounded")
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
        addressPreview.classList.remove("blue-rounded")
        addressPreview.classList.add("red-rounded")
        city.value = ""
        district.value = ""
        address.value = ""
    }
}

function showTable (table, btn){
    $(table).slideToggle('fast')
     rotate90(btn)
}