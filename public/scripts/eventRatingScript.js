function validateRating(){
    let check = true
    valueRate.map(rate=>{
        if(!rate.valueRate) check = false
    })
    closeAllAlerts()
    if(!check) callAlert("Erro na avaliação", "É preciso avaliar todos os voluntários antes de finalizar.", "error")
    return check
}

function saveRate(id){
    let popup = getPopUp(id)
    let i
    ids.map((thisId, j)=>{
        if(thisId == id){
            i = parseInt(j)
        }
    })
    valueRate[i].valueRate = valueStars[i] + 1
    rewriteTable()
    document.getElementById(`input-rate-${id}`).value = valueStars[i] + 1
    Array.from(inputs).map((input,j)=>{
        input.value = valueStars[j] + 1
    })
    hideRatePopUp(id)
}

function rewriteTable(){
    let titleNotRated = $('#title-table-notRated')
    let titleRated = $('#title-table-rated')
    let bodyNotRated = $('#table-body-notRated')
    let bodyRated = $('#table-body-rated')

    bodyNotRated.empty()
    bodyRated.empty()

    let lengthNotRated = 0
    let lengthRated = 0

    valueRate.map(rate=>{
        if(rate.valueRate === null) lengthNotRated++
        else lengthRated++
    })

    titleNotRated.html(`Voluntários não avaliados (${lengthNotRated})`)
    titleRated.html(`Voluntários avalidos (${lengthRated})`)
    volunteers.map((volunteer, i)=>{
        let id = ids[i]
        rate = valueRate[i]
        if(rate.valueRate === null){
            bodyNotRated.append(`
                <div class="row">
                    <div class="flex-row">
                        <figure class="table-pic">
                            <img src="/temp/uploads/profile/${volunteer.photo}"/>
                        </figure>
                        <article class="margin-left1">
                            <h1 class="small-text medium-weight-text margin0 padding0">${volunteer.name} ${volunteer.lastName}</h1>
                            <p  class="gray smallest-text margin0 padding0">${volunteer.city}</p>
                        </article>
                    </div>
                    <div class="flex-row">
                        <p class="text">${volunteer.vacancy}</p>
                    </div>
                    <div class="flex-row">
                        <p class="text">${volunteer.averagestars}/5 <img src="/assets/imgs/star.svg" class="inline-icon"/></p>
                    </div>
                    <div class="flex-row justifyContent-end">
                        <input type="hidden" class="rate-volunteer" name="rate-volunteer-${id}" id="input-rate-${id}" data-id="${id}"/>
                        <div data-idvolunteer="${id}" class="btn-rounded do-rate">Avaliar</div>
                    </div>
                </div>
            `)
        }else{
            bodyRated.append(`
                <div class="row">
                    <div class="flex-row">
                        <figure class="table-pic">
                            <img src="/temp/uploads/profile/${volunteer.photo}"/>
                        </figure>
                        <article class="margin-left1">
                            <h1 class="small-text medium-weight-text margin0 padding0">${volunteer.name} ${volunteer.lastName}</h1>
                            <p  class="gray smallest-text margin0 padding0">${volunteer.city}</p>
                        </article>
                    </div>
                    <div class="flex-row">
                        <p class="text">${volunteer.vacancy}</p>
                    </div>
                    <div class="flex-row">
                        <p class="text">${rate.valueRate}/5 <img src="/assets/imgs/star.svg" class="inline-icon"/></p>
                    </div>
                    <div class="flex-row justifyContent-end">
                        <input type="hidden" class="rate-volunteer" name="rate-volunteer-${id}" id="input-rate-${id}" data-id="${id}"/>
                        <div data-idvolunteer="${id}" class="btn-outlined edit-rate">Editar avaliação</div>
                    </div>
                </div>
            `)
        }
    })
    getBtns()
}

function showRatePopUp(id){
    let popup = getPopUp(id)
    let popups = document.getElementsByClassName('rate-popup')
    popups = Array.from(popups)
    if(popup.style.bottom == ""){
        popups.map(el=>{
            el.style.bottom = ""
        })
        popup.style.bottom = "20px"
    }
    else hideRatePopUp(id)
}

function hideRatePopUp(id){
    let popup = getPopUp(id)
    popup.style.bottom = ""
}

function getPopUp(id){
    return document.getElementById(`rate-popup-${id}`)
}

let inputs = document.getElementsByClassName('rate-volunteer')
let ids = Array.from(inputs).map(input=>{
    return input.dataset.id
})

let volunteers = [ids.length]
ids.map((volunteer, i)=>{
    let data = document.getElementsByClassName('data-volunteer')[i]
    volunteers[i] = {
        name: data.dataset.namevolunteer,
        lastName: data.dataset.lastnamevolunteer,
        city: data.dataset.cityvolunteer,
        vacancy: data.dataset.vacancy,
        averagestars: data.dataset.averagestars,
        photo: data.dataset.photo
    }
})

let valueRate = [ids.length]
ids.map((id,i)=>{
    valueRate[i] = {
        idVolunteer: id,
        valueRate: null
    }
})
let valueStars = [ids.length]
ids.map((id,i)=>{
    let stars = Array.from(document.getElementsByClassName(`star-${id}`))
    stars.map((star, j)=>{
        valueStars[i] = -1
        star.addEventListener('click',()=>{
            valueStars[i] = j
            stars.map((Star, k)=>{
                if(k<=j) Star.style.opacity = 1
                else Star.style.opacity = ""
            })
        })

        $(star).on('mouseenter', ()=>{
            stars.map((Star, k)=>{
                if(k<=j) Star.style.opacity = 1
                else Star.style.opacity = ""
            })
        })

        $(star).on('mouseleave',()=>{
            stars.map((Star, k)=>{
                if(k<=valueStars[i]) Star.style.opacity = 1
                else Star.style.opacity = ""
            })
        })
    })
})

getBtns()

function getBtns(){
    let doRate = document.getElementsByClassName('do-rate')
    let editRate = document.getElementsByClassName('edit-rate')
    
    doRate = Array.from(doRate)
    editRate = Array.from(editRate)
    
    doRate.map(btn=>{
        btn.addEventListener('click',()=>{
            let idVolunteer = btn.dataset.idvolunteer
            showRatePopUp(idVolunteer)
        })
    })
    
    editRate.map(btn=>{
        btn.addEventListener('click',()=>{
            let idVolunteer = btn.dataset.idvolunteer
            showRatePopUp(idVolunteer)
        })
    })
}