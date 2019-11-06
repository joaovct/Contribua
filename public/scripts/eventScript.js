function initMap(){
    let address = document.querySelector('[data-address]')

    let district = address.dataset.district
    let number = address.dataset.number
    let cep = address.dataset.cep
    address = address.dataset.address
    console.log(`${address} ${number} ${district}`)
    let apiKey = 'AIzaSyA36tg5LqcFuIXDpeMtAlDeVGj87qqxrVk'
    $.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address} ${number} ${district}+CA&key=${apiKey}`, (data)=>{
        console.log(data)
        let location = data.results[0].geometry.location
        let position = {lat: location.lat, lng: location.lng}
        let map = new google.maps.Map(document.getElementById('map'), {zoom: 20, center: position})
        let marker = new google.maps.Marker({position, map})
    })
    
}

const lblSubscribe = document.getElementsByClassName("subscribe")
const btnSubscribe = document.getElementsByClassName("subscribe-checkbox")
const btnCancel = document.getElementsByClassName("cancel-subcribe")

for(let i = 0; i < lblSubscribe.length; i++){
    let idVacancyAction = parseInt(lblSubscribe[i].parentNode.id)

    if(btnSubscribe[i].value === "on") 
        lblSubscribe[i].innerHTML = "Inscrito"
    else 
        lblSubscribe[i].innerHTML = "Inscrever-se"

    btnSubscribe[i].addEventListener("click", async () => {
        if(btnSubscribe[i].value === "on"){
            lblSubscribe[i].innerHTML = "Inscrever-se"
            btnSubscribe[i].value = "off"
    
            await $.post("http://localhost:3000/event/subscribe?unsubscribe=true&idVacancyAction="+idVacancyAction)
        }else{   
    
            lblSubscribe[i].innerHTML = "Inscrito"
            btnSubscribe[i].value = "on"
            await $.post("http://localhost:3000/event/subscribe?idVacancyAction="+idVacancyAction)
        }
    })  
}