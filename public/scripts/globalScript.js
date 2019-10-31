let socket = io()
let session
let linkNotify = document.getElementsByClassName("icon")[0]

socket.on('init', (data) => {
    session = data.session

    console.log(data)

    if(Array.isArray(data.notificationsNgo)){
        for(let i in data.notificationsNgo){
            if(session.ngo.idNgo === data.notificationsNgo[i].notification.idNgo){

                let notification = data.notificationsNgo[i].notification
                let user = data.notificationsNgo[i].user
                $(".notifications").prepend(`
                    <a href="#"><li><img src="temp/uploads/profile/${user.photoVolunteer}"> <span><strong>${user.userName}</strong> ${notification.msgNotification}</span></li></a>
                `)

            }
        }
    }else{

    }
})

socket.on('notificationNgo', (notificationsNgo) => {
    $(".notifications").html('')
    if(Array.isArray(notificationsNgo)){
        for(let i in notificationsNgo){
            if(session.ngo.idNgo === notificationsNgo[i].notification.idNgo){
                console.log('passou')
                $(".icon").addClass("notify")
                let notification = notificationsNgo[i].notification
                let user = notificationsNgo[i].user
                $(".notifications").prepend(`
                    <a href="#"><li><img src="temp/uploads/profile/${user.photoVolunteer}"> <span><strong>${user.userName}</strong> ${notification.msgNotification}</span></li></a>
                `)

            }
        }
    }else{

    }
})

linkNotify.addEventListener("click", () => {
    $('.notifications').toggle('fast')
    $('.icon').removeClass('notify')
})

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

function progressStep(el, n){
    if(n!=undefined && n > -1){
        el = document.getElementsByClassName(el)[n]
        el.classList.add('progress')
    }else{
        el = document.getElementsByClassName(el)
        for(let i of el){
            i.classList.add('progress')
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

$(document).mouseup((e)=>{
    if(!$('.search-results').is(e.target) && $('.search-results').has(e.target).length === 0){
        removeDiv('.search-results')
    }
    if(!$('.header-options').is(e.target) && $('.header-options').has(e.target).length === 0){
        $('.header-options').hide('fast')
    }
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
                    $('.search-form').append('<ul class="search-results"></ul>')
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