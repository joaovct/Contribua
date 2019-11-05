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