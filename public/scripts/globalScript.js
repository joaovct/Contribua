let socket = io()
let session
let linkNotify = document.getElementsByClassName("icon")[0]
let notifications = document.getElementsByClassName("notifications")[0]

socket.on('init', (dataSession) => {
    session = dataSession
})

socket.on('notificationNgo', (notificationsNgo) => {
    let oldNotifications = notificationsNgo.oldNotifications
    let newNotifications = notificationsNgo.newNotifications

    if(oldNotifications.length != 0){
        if(Array.isArray(oldNotifications)){
            if(oldNotifications[0].notification.idNgo === session.ngo.idNgo)
                $(notifications).html('')
        }else{
            if(oldNotifications.notification.idNgo === session.ngo.idNgo)
                $(notifications).html('')
        }
    }

    if(newNotifications.length != 0){
        if(Array.isArray(newNotifications)){
            if(newNotifications[0].notification.idNgo === session.ngo.idNgo)
                $(notifications).html('')
        }else{
            if(newNotifications.notification.idNgo === session.ngo.idNgo)
                $(notifications).html('')
        }
    }

    //notifications already viewed
    writeOldNotificationNgo(oldNotifications)

    //notifications not viewed
    writeNewNotificationNgo(newNotifications)

    if(oldNotifications.length === 0 && newNotifications.length === 0)
        $(notifications).prepend("<li><h3>Nenhuma notificação por aqui...</h3></li>")
})

linkNotify.addEventListener("click", () => {
    $('.notifications').toggle('fast')
    $('.icon').removeClass('notify')
    socket.emit('viewed')
})

function writeOldNotificationNgo(oldNotifications){
    if(Array.isArray(oldNotifications)){
        for(let i in oldNotifications){
            if(session.ngo.idNgo === oldNotifications[i].notification.idNgo){
                let notification = oldNotifications[i].notification
                let user = oldNotifications[i].user
                $(notifications).prepend(`
                    <a href="#"><li><img src="/temp/uploads/profile/${user.photoVolunteer}"> <span><strong>${user.userName}</strong> ${notification.msgNotification}</span></li></a>
                `)

            }
        }
        if(oldNotifications.length != 0){
            $(notifications).prepend(`
                <li class="new-and-old">Anteriores</li>
            `)
        }
    }else{
    }
}

function writeNewNotificationNgo(newNotifications){
    if(Array.isArray(newNotifications)){
        for(let i in newNotifications){
            if(session.ngo.idNgo === newNotifications[i].notification.idNgo){
                $(linkNotify).addClass("notify")
                let notification = newNotifications[i].notification
                let user = newNotifications[i].user
                $(notifications).prepend(`
                    <a href="#"><li><img src="/temp/uploads/profile/${user.photoVolunteer}"> <span><strong>${user.userName}</strong> ${notification.msgNotification}</span></li></a>
                `)

            }
        }
        if(newNotifications.length != 0){
            $(notifications).prepend(`
                <li class="new-and-old">Novas</li>
            `)
        }
    }
}

function hide(el, n){
    if(n!=undefined && n > -1){
        el = document.getElementsByClassName(el)[n]
        $(el).hide()
    }else{
        el = document.getElementsByClassName(el)
        for(let i of el){
            $(i).hide()
        }
    }
}

function show(el, n){
    if(n!=undefined && n > -1){
        el = document.getElementsByClassName(el)[n]
        $(el).show()
    }else{
        el = document.getElementsByClassName(el)
        for(let i of el){
            $(i).show()
        }
    }
}

function changeOpacity(x, el, n){
    if(n!=undefined && n > -1){
        el = document.getElementsByClassName(el)[n]
        el.style.opacity = x
    }else{
        el = document.getElementsByClassName(el)
        for(let i of el){
            i.style.opacity = x
        }
    }
}

function removeDiv(el){
    $(el).fadeOut(300,()=>{
        $(this).remove()
    })
}

function removeClass(el, Class, n){
    if(n!=undefined && n > -1){
        el = document.getElementsByClassName(el)[n]
        el.classList.remove(Class)
    }else{
        el = document.getElementsByClassName(el)
        for(let i of el){
            i.classList.remove(Class)
        }
    }
}

function addClass(el, Class, n){
    if(n!=undefined && n > -1){
        el = document.getElementsByClassName(el)[n]
        el.classList.add(Class)
    }else{
        el = document.getElementsByClassName(el)
        for(let i of el){
            i.classList.add(Class)
        }
    }
}

function alow(msg){
    console.log('alow '+msg)
}

$(document).mouseup((e)=>{
    if(!$('.search-results').is(e.target) && $('.search-results').has(e.target).length === 0) $('.search-results').fadeOut('fast')
})

function doSearch(input){
    let value = input.value
    $(document).ready(()=>{
        nullSpace = value.trim()
        if(value.length > 0 && nullSpace.length > 0){
            var results = $.post('http://localhost:3000/search?key=' + value, (data) => {
                let volunteers = [], ngos = [], events = [], cases = []
                removeDiv('.search-results')
                for(let object of data){
                    if(object.typeResult == "volunteer") volunteers.push(object)
                    else if(object.typeResult == "ngo") ngos.push(object)
                    else if(object.typeResult == "event") events.push(object)
                    else if(object.typeResult == "case") cases.push(object)
                }
                if(data.length > 0){
                    $('.search-form').append('<ul class="search-results mouseUpFadeOut"></ul>')
                    if(volunteers.length>0) writeVolunteers(volunteers)
                    if(ngos.length>0) writeNgos(ngos)
                }
            })
        }else{
            removeDiv('.search-results')
        }
    })
}

function writeVolunteers(data){
    var i = 0
    for(let object of data){
        if(i==0) $('.search-results').append('<h1 class="title">Voluntários</h1>')
        $('.search-results').append(`<li class="volunteer"> <img src="/temp/uploads/profile/${object.photoVolunteer}"/> <div class="item-content"> <a href="/${object.userName}" class="item-title"> <p class="smallest-text margin0 large-weight-text item-username">${object.userName}</p> <p class="margin0">${object.name}</p> </a></div> </li>`)
        i++
    }
}

function writeNgos(data){
    var i = 0
    for(let object of data){
        if(i==0) $('.search-results').append('<h1 class="title">ONGs</h1>')
        $('.search-results').append(`<li class="ngo"> <img src="/temp/uploads/profile/${object.photoNgo}"/> <div class="item-content"> <a href="/${object.nameNgo}" class="item-title"> <p class="smallest-text margin0 large-weight-text item-username">${object.nameNgo}</p> <p class="margin0">${object.name}</p> </a></div> </li>`)
        console.log(object.photoNgo)        
        i++
    }
}

function callAlert(title, message, type){
    if(type=="success"||type=="error"||type=="warning"){
        $('.container-alert').append(`<div class="alert alert-${type}"><figure class="alert-icon"><div class="icon"></div></figure><div class="alert-content"><h1 class="alert-title">${title}</h1><p class="text">${message}</p></div><figure class="alert-close" onclick="closeAlert(this)"><img src="/assets/imgs/close.svg" /></figure></div>`).show('slow')
    }else{
        console.log("Type of alert unrecognized")
    }
}

function closeAlert(e){
    e = e.parentNode;
    child = e.children[0].children[0]
    content = []
    content.push(e.children[1].children[0])
    content.push(e.children[1].children[1])
    e.style.opacity = 0
        setTimeout(() => {
            e.style.display = "none"
        }, 250);
}

function closeAllAlerts(){
    let E = document.getElementsByClassName('alert')
    for(let e of E) e.style.display = 'none'
}

function previewPhoto(){
    if(this.files && this.files[0]){
        var obj = new FileReader();
        obj.onload = function(dado){
            preview.style.background = "url("+dado.target.result+") center center / cover";
        }
        obj.readAsDataURL(this.files[0]);
    }
}

var degrees = 45

function rotate90(el){
    element = document.getElementById(el)
    console.log(element)
    $(element).css('transform',`rotate(${degrees}deg)`)
    degrees+= 45   
}