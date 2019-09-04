var stateAddJobInput = false

function init(){
    addEventClickBtns("addEvent-btn")
    clickTypeEvent("typeEvent-label")
    clickAddJob("btn-add-job")
    clickAddJob("close-add-job")
}

function addEventClickBtns(e){
    e = document.getElementsByClassName(e)
    for(let i of e){
        i.addEventListener("click", ()=>{
            n = parseInt(i.title)
            changeAddEventStep(n)
        })
    }
}

function changeAddEventStep(n){
    e = document.getElementsByClassName("addEvent-step")
    overlay = document.getElementsByClassName("overlay")[0]
    if(n>2) overlay.style.display = "flex"
    else e[n].style.display = "block"
}

function clickTypeEvent(e){
    e = document.getElementsByClassName(e)
    for(let i of e){
        i.addEventListener("click", ()=>{
            n = parseInt(i.title)
            changeTypeEventInputs(n)
        })
    }
}

function changeTypeEventInputs(n){
    e = document.getElementsByClassName("typeEvent-inputs")
    e2 = document.getElementsByClassName("typeEvent-label")
    if(n==0){
        e[n].style.display = "block"
        e2[0].style.opacity = 1
        e[1].style.display = "none"
        e2[1].style.opacity = .5
    }else{
        e[n].style.display = "block"
        e2[1].style.opacity = 1
        e[0].style.display = "none"
        e2[0].style.opacity = .5
    }
}

function clickAddJob(e){
    e = document.getElementsByClassName(e)[0]
    e.addEventListener("click", ()=>{
        changeAddJobInput(stateAddJobInput)
    })
}

function changeAddJobInput(bol){
    e = document.getElementsByClassName("add-job")[0]
    if(bol){
        e.style.display = "none"
        stateAddJobInput = false
    }else{
        e.style.display = "block"
        stateAddJobInput = true
    }
}