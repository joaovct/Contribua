"use strict"

const idAction = document.getElementById('keeper-idAction').dataset.idaction

async function addEventToButtons () {
    let btnRequest = document.getElementsByClassName('btn-request')
    btnRequest = Array.from(btnRequest)
    btnRequest.map(btn=>{
        btn.addEventListener('click', async ()=>{
            let type = btn.dataset.type
            let id = btn.dataset.id
            if (await type==="accept"){
                await acceptRequest(id)
                await updateTable()
            } 
            else if(await type==="refuse"){
                await refuseRequest(id)
                await updateTable()
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

async function updateTable(){
    setTimeout(async () => { 
        await $.post(`http://localhost:3000/event/${idAction}/management/subscribers`, async (data)=>{
            await writeVacanciesRequests(data.vacanciesRequests)
            await writeVacanciesAccepted(data.vacanciesAccepted)
            await writeVacanciesRejected(data.vacanciesRejected)
            addEventToButtons()
        })
     }, 100);
}

async function writeVacanciesRequests(vacancies){
    let title = $("#title-table-requests")
    let table = $("#table-requests")
    let tableBody = $("#table-body-requests")

    if(vacancies === undefined) vacancies = []
    Array.from(vacancies)

    $(title).html(`Solicitações (${vacancies.length})`)
    
    if(vacancies.length){
        table.show()
        tableBody.empty()
        vacancies.map((vacancy,i)=>{
            tableBody.append(`
            <div class="row row-subscribe">
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
                    <div class="flex-row justifyContent-end">
                        <button data-type="refuse" data-id="${vacancy.idActionVolunteer}" class="btn-danger-outlined margin-right2 btn-request">Recusar</button>
                        <button data-type="accept" data-id="${vacancy.idActionVolunteer}" class="btn-primary btn-request">Aceitar inscrição</button>
                    </div>
                </div>
            </div>
            `)
        })
    }else{
        $(table).hide()
    }
}

async function writeVacanciesAccepted(vacancies){
    let title = $("#title-table-accepted")
    let table = $("#table-accepted")
    let tableBody = $("#table-body-accepted")

    if(vacancies === undefined) vacancies = []
    Array.from(vacancies)

    $(title).html(`Inscrições aceitas (${vacancies.length})`)
    
    if(vacancies.length){
        table.show()
        tableBody.empty()
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
                        <div class="flex-row justifyContent-end">
                            <figure onclick="hideOptions('.member-options-${vacancy.idActionVolunteer}')"
                                class="member-options-icon">
                                <img src="/assets/imgs/threedots.svg">
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="member-options member-options-${vacancy.idActionVolunteer}">
                <ul class="items">
                    <li data-type="refuse" data-id="${vacancy.idActionVolunteer}" class="item red btn-request">Cancelar inscrição</li>
                </ul>
            </div>
            `)
        })
    }else{
        $(table).hide()
    }
}

async function writeVacanciesRejected(vacancies){
    let title = $("#title-table-rejected")
    let table = $("#table-rejected")
    let tableBody = $("#table-body-rejected")

    if(vacancies === undefined) vacancies = []
    Array.from(vacancies)

    $(title).html(`Inscrições não aceitas (${vacancies.length})`)
    
    if(vacancies.length){
        table.show()
        tableBody.empty()
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
                        <div class="flex-row justifyContent-end">
                            <figure onclick="hideOptions('.member-options-${vacancy.idActionVolunteer}')"
                                class="member-options-icon">
                                <img src="/assets/imgs/threedots.svg">
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="member-options member-options-${vacancy.idActionVolunteer}">
                <ul class="items">
                    <li data-type="accept" data-id="${vacancy.idActionVolunteer}" class="item btn-request">Aceitar inscrição</li>
                </ul>
            </div>
            `)
        })
    }else{
        $(table).hide()
    }
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