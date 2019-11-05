const btnSubscribe = document.getElementById("checkbox-subscribe")
const lblSubscribe = document.getElementById("btn-subscribe")
const idNgo = parseInt(document.getElementById("id-ngo").value)

if(btnSubscribe.value === "on") lblSubscribe.innerHTML = "Inscrito"
else lblSubscribe.innerHTML = "Inscrever-se"


btnSubscribe.addEventListener("click", async () => {

    if(btnSubscribe.value === "on"){
        lblSubscribe.innerHTML = "Inscrever-se"
        btnSubscribe.value = "off"
        await $.post("http://localhost:3000/subscribe?unsubscribe=true&idNgo="+idNgo)
    }else{   
        socket.emit('subscribe', idNgo)

        lblSubscribe.innerHTML = "Inscrito"
        btnSubscribe.value = "on"

        await $.post("http://localhost:3000/subscribe?idNgo="+idNgo)

    }
    
})
