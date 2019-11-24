// import { Socket } from "dgram"

function doSearchVolunteer(value){
    $(document).ready(()=>{
        if( value.trim().length > 0 && value.length > 0 ){
            $.post('http://localhost:3000/searchVolunteer?key=' + value, (data) => {
                console.log(data)
            })
        }else{
            // none users found
        }
    })
}

const btnMake = document.getElementsByClassName("btn-management-make")
const btnRemove = document.getElementsByClassName("btn-management-remove")
let idNgo = document.getElementById("ngo-members").dataset.idngo

for(let i = 0; i < btnMake.length; i++){
    let form = btnMake[i].parentNode
    btnMake[i].addEventListener("click", () => {
        console.log(btnMake[i].dataset.idvolunteer)
        let idUser = btnMake[i].dataset.idvolunteer
        socket.emit('make-adm', {idUser, idNgo})
        $(form).submit()
    })
}

for(let i = 0; i < btnRemove.length; i++){
    let form = btnRemove[i].parentNode
    btnRemove[i].addEventListener("click", () => {
        let idUser = btnRemove[i].dataset.idvolunteer
        socket.emit('remove-adm', {idUser, idNgo})
        $(form).submit()
    })
}