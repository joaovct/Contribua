function initMap(){
    let address = document.querySelector('[data-address]')

    let district = address.dataset.district
    let number = address.dataset.number
    let cep = address.dataset.cep
    address = address.dataset.address
    console.log(`${address} ${number} ${district}`)
    let apiKey = ''
    $.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${address} ${number} ${district}+CA&key=${apiKey}`, (data)=>{
        let location = data.results[0].geometry.location
        let position = {lat: location.lat, lng: location.lng}
        let map = new google.maps.Map(document.getElementById('map'), {zoom: 20, center: position})
        let marker = new google.maps.Marker({position, map})
    })
    
}

const lblSubscribe = document.getElementById("subscribe")
const btnSubscribe = document.getElementById("checkbox-subscribe")
const btnCancel = document.getElementById("cancel-subcribe")
const idAction = parseInt(lblSubscribe.parentNode.id)

btnSubscribe.addEventListener("click", async () => {
    if(btnSubscribe.value === "on"){
        lblSubscribe.innerHTML = "Inscrever-se"
        btnSubscribe.value = "off"

        // await $.post("http://localhost:3000/subscribe?unsubscribe=true&idNgo="+idNgo)
    }else{   

        lblSubscribe.innerHTML = "Inscrito"
        btnSubscribe.value = "on"
        await $.post("http://localhost:3000/event/subscribe?idAction="+idAction)
    }
})

btnCancel.addEventListener("click", () => {
    $('.overlay-job').slideUp('fast')
})