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

function showRatePopUp(id){
    console.log(id)
}