let socket=io()
let session
let linkNotify=document.getElementsByClassName( "icon" )[ 0 ]
let notifications=document.getElementsByClassName( "notifications" )[ 0 ]

function addEvent(element, event, func){
    let elements = document.getElementsByClassName(element)
    elements = Array.from(elements)

    elements.map(el=>{
        el.addEventListener(event, ()=>{
            func(el)
        })
    })
}

socket.on( 'init', ( dataSession ) => {
    session=dataSession
} )

socket.on( 'notificationNgo', ( notificationsNgo ) => {
    let oldNotifications=notificationsNgo.oldNotifications
    let newNotifications=notificationsNgo.newNotifications

    if ( oldNotifications.length!=0 ) {
        if ( Array.isArray( oldNotifications ) ) {
            if ( oldNotifications[ 0 ].notification.idNgo===session.ngo.idNgo )
                $( notifications ).html( '' )
        } else {
            if ( oldNotifications.notification.idNgo===session.ngo.idNgo )
                $( notifications ).html( '' )
        }
    }

    if ( newNotifications.length!=0 ) {
        if ( Array.isArray( newNotifications ) ) {
            if ( newNotifications[ 0 ].notification.idNgo===session.ngo.idNgo )
                $( notifications ).html( '' )
        } else {
            if ( newNotifications.notification.idNgo===session.ngo.idNgo )
                $( notifications ).html( '' )
        }
    }

    //notifications already viewed
    writeOldNotificationNgo( oldNotifications )

    //notifications not viewed
    writeNewNotificationNgo( newNotifications )

    if ( oldNotifications.length===0&&newNotifications.length===0 )
        $( notifications ).prepend( "<li><h3>Nenhuma notificação por aqui...</h3></li>" )
} )

socket.on( 'notificationUser', ( notificationsUser ) => {
    console.log('Notificação de usuário')
    console.log(notificationsUser)
    let oldNotifications=notificationsUser.oldNotifications
    let newNotifications=notificationsUser.newNotifications

    if ( oldNotifications.length!=0 ) {
        if ( Array.isArray( oldNotifications ) ) {
            if ( oldNotifications[ 0 ].notification.idUser===session.user.idUser )
                $( notifications ).html( '' )
        } else {
            if ( oldNotifications.notification.idUser===session.user.idUser )
                $( notifications ).html( '' )
        }
    }

    if ( newNotifications.length!=0 ) {
        if ( Array.isArray( newNotifications ) ) {
            if ( newNotifications[ 0 ].notification.idUser===session.user.idUser )
                $( notifications ).html( '' )
        } else {
            if ( newNotifications.notification.idUser===session.user.idUser )
                $( notifications ).html( '' )
        }
    }

    writeOldNotificationUser( oldNotifications )

    writeNewNotificationUser( newNotifications )

    if ( oldNotifications.length===0&&newNotifications.length===0 )
        $( notifications ).prepend( "<li><h3>Nenhuma notificação por aqui...</h3></li>" )
} )

linkNotify.addEventListener( "click", () => {
    $( '.notifications' ).toggle( 'fast' )
    $( '.icon' ).removeClass( 'notify' )
    socket.emit( 'viewed' )
} )

function writeOldNotificationNgo( oldNotifications ) {

    console.log(oldNotifications)

    for ( let i in oldNotifications ) {
        if ( session.ngo.idNgo===oldNotifications[ i ].notification.idNgo ) {
            let notification=oldNotifications[ i ].notification
            let user=oldNotifications[ i ].user

            if(notification.usePhotoNgo){
                $( notifications ).prepend( `
                    <a href="${notification.linkNotification}"><li><img src="/temp/uploads/profile/${session.ngo.photoNgo}"> <span>${notification.msgNotification}</span></li></a>
                `)
            }else{
                $( notifications ).prepend( `
                    <a href="${notification.linkNotification}"><li><img src="/temp/uploads/profile/${user.photoVolunteer}"> <span>${notification.msgNotification}</span></li></a>
                `)
            }

            

        }
    }
    if ( oldNotifications.length!=0 ) {
        $( notifications ).prepend( `
            <li class="new-and-old">Anteriores</li>
        `)
    }
}

function writeNewNotificationNgo( newNotifications ) {

    
    for ( let i in newNotifications ) {
        if ( session.ngo.idNgo===newNotifications[ i ].notification.idNgo ) {
            $( linkNotify ).addClass( "notify" )
            let notification=newNotifications[ i ].notification
            let user=newNotifications[ i ].user

            if(notification.usePhotoNgo){
                $( notifications ).prepend( `
                    <a href="${notification.linkNotification}"><li><img src="/temp/uploads/profile/${session.ngo.photoNgo}"> <span>${notification.msgNotification}</span></li></a>
                `)
            }else{
                $( notifications ).prepend( `
                    <a href="${notification.linkNotification}"><li><img src="/temp/uploads/profile/${user.photoVolunteer}"> <span>${notification.msgNotification}</span></li></a>
                `)
            }

        }
    }
    if ( newNotifications.length!=0 ) {
        $( notifications ).prepend( `
            <li class="new-and-old">Novas</li>
        `)
    }
}

function writeOldNotificationUser( oldNotifications ) {

    for ( let i in oldNotifications ) {
        if ( session.user.idVolunteer===oldNotifications[ i ].notification.idVolunteer) {
            let notification=oldNotifications[ i ].notification
            let ngo=oldNotifications[ i ].ngo
            $( notifications ).prepend( `
                <a href="#"><li><img src="/temp/uploads/profile/${ngo.photoNgo}"> <span>${notification.msgNotification}</span></li></a>
            `)

        }
    }
    if ( oldNotifications.length!=0 ) {
        $( notifications ).prepend( `
            <li class="new-and-old">Anteriores</li>
        `)
    }
}

function writeNewNotificationUser( newNotifications ) {
    
    console.log(newNotifications)

    for ( let i in newNotifications ) {
        if ( session.user.idVolunteer===newNotifications[ i ].notification.idVolunteer) {
            $( linkNotify ).addClass( "notify" )
            let notification=newNotifications[ i ].notification
            let ngo=newNotifications[ i ].ngo
            $( notifications ).prepend( `
                <a href="#"><li><img src="/temp/uploads/profile/${ngo.photoNgo}"> <span>${notification.msgNotification}</span></li></a>
            `)

        }
    }
    if ( newNotifications.length!=0 ) {
        $( notifications ).prepend( `
            <li class="new-and-old">Novas</li>
        `)
    }
}

function hide( el, n ) {
    if ( n!=undefined&&n>-1 ) {
        el=document.getElementsByClassName( el )[ n ]
        $( el ).hide()
    } else {
        el=document.getElementsByClassName( el )
        for ( let i of el ) {
            $( i ).hide()
        }
    }
}

function show( el, n ) {
    if ( n!=undefined&&n>-1 ) {
        el=document.getElementsByClassName( el )[ n ]
        $( el ).show()
    } else {
        el=document.getElementsByClassName( el )
        for ( let i of el ) {
            $( i ).show()
        }
    }
}

function changeOpacity( x, el, n ) {
    if ( n!=undefined&&n>-1 ) {
        el=document.getElementsByClassName( el )[ n ]
        el.style.opacity=x
    } else {
        el=document.getElementsByClassName( el )
        for ( let i of el ) {
            i.style.opacity=x
        }
    }
}

function removeDiv( el ) {
    $( el ).fadeOut( 300, () => {
        $( this ).remove()
    } )
}

function removeClass( el, Class, n ) {
    if ( n!=undefined&&n>-1 ) {
        el=document.getElementsByClassName( el )[ n ]
        el.classList.remove( Class )
    } else {
        el=document.getElementsByClassName( el )
        for ( let i of el ) {
            i.classList.remove( Class )
        }
    }
}

function addClass( el, Class, n ) {
    if ( n!=undefined&&n>-1 ) {
        el=document.getElementsByClassName( el )[ n ]
        el.classList.add( Class )
    } else {
        el=document.getElementsByClassName( el )
        for ( let i of el ) {
            i.classList.add( Class )
        }
    }
}

$( document ).mouseup( ( e ) => {
    if ( !$( '.search-results' ).is( e.target )&&$( '.search-results' ).has( e.target ).length===0 ) $( '.search-results' ).fadeOut( 'fast' )
    if ( !$( '.options-range' ).is( e.target )&&$( '.options-range' ).has( e.target ).length===0 ) $( '.options-range' ).fadeOut( 'fast' )
} )

function doSearch( input ) {
    let value=input.value
    $( document ).ready( () => {
        nullSpace=value.trim()
        if ( value.length>0&&nullSpace.length>0 ) {
            $.post( 'http://localhost:3000/search?key='+value, ( data ) => {
                let volunteers=[], ngos=[], actions=[], cases=[]
                removeDiv( '.search-results' )
                for ( let object of data ) {
                    if ( object.typeResult=="volunteer" ) volunteers.push( object )
                    else if ( object.typeResult=="ngo" ) ngos.push( object )
                    else if ( object.typeResult=="action" ) actions.push( object )
                    else if ( object.typeResult=="case" ) cases.push( object )
                }
                if ( data.length>0 ) {
                    $( '.search-form' ).append( '<ul class="search-results mouseUpFadeOut"></ul>' )
                    if ( volunteers.length>0 ) writeVolunteersSearch( volunteers )
                    if ( ngos.length>0 ) writeNgosSearch( ngos )
                    if ( actions.length>0 ) writeArticlesSearch( actions )
                }
            } )
        } else {
            removeDiv( '.search-results' )
        }
    } )
}

function writeVolunteersSearch( data ) {
    var i=0
    for ( let object of data ) {
        if ( i==0 ) $( '.search-results' ).append( '<h1 class="title">Voluntários</h1>' )
        $( '.search-results' ).append( `<li class="volunteer"> <img src="/temp/uploads/profile/${object.photoVolunteer}"/> <div class="item-content"> <a href="/${object.userName}" class="item-title"> <p class="smallest-text margin0 large-weight-text item-username">${object.userName}</p> <p class="margin0">${object.name}</p> </a></div> </li>` )
        i++
    }
}

function writeNgosSearch( data ) {
    var i=0
    for ( let object of data ) {
        if ( i==0 ) $( '.search-results' ).append( '<h1 class="title">ONGs</h1>' )
        $( '.search-results' ).append( `<li class="ngo"> <img src="/temp/uploads/profile/${object.photoNgo}"/> <div class="item-content"> <a href="/${object.nameNgo}" class="item-title"> <p class="smallest-text margin0 large-weight-text item-username">${object.nameNgo}</p> <p class="margin0">${object.name}</p> </a></div> </li>` )
        i++
    }
}

function writeArticlesSearch( data ) {
    var i=0
    for ( let object of data ) {
        if ( i==0 ) $( '.search-results' ).append( '<h1 class="title">Eventos</h1>' )
        $( '.search-results' ).append( `<li class="action"> <a href="/event/${object.idAction}">  <figure class="image-action"> <img src="/temp/uploads/action/${object.photoAction}"/>  </figure> <h1 class="item-title">${object.nameAction}</h1> </a> </li>` )
        i++
    }
}

function callAlert( title, message, type ) {
    if ( type=="success"||type=="error"||type=="warning" ) {
        $( '.container-alert' ).append( `<div class="alert alert-${type}"><figure class="alert-icon"><div class="icon"></div></figure><div class="alert-content"><h1 class="alert-title">${title}</h1><p class="text">${message}</p></div><figure class="alert-close" onclick="closeAlert(this)"><img src="/assets/imgs/close.svg" /></figure></div>` ).show( 'slow' )
    } else {
        console.log( "Type of alert unrecognized" )
    }
}

function closeAlert( e ) {
    e=e.parentNode;
    child=e.children[ 0 ].children[ 0 ]
    content=[]
    content.push( e.children[ 1 ].children[ 0 ] )
    content.push( e.children[ 1 ].children[ 1 ] )
    e.style.opacity=0
    setTimeout( () => {
        e.style.display="none"
    }, 250 );
}

function closeAllAlerts() {
    let E=document.getElementsByClassName( 'alert' )
    for ( let e of E ) e.style.display='none'
}

function previewPhoto() {
    if ( this.files&&this.files[ 0 ] ) {
        var obj=new FileReader();
        obj.onload=function ( dado ) {
            preview.style.background="url("+dado.target.result+") center center / cover";
        }
        obj.readAsDataURL( this.files[ 0 ] );
    }
}

function hideOptions(option){
    option = document.querySelector(option)
    // console.log(option)
    var options = document.getElementsByClassName('member-options')
    for(let op of options){
        if(op!=option) $(op).slideUp('fast')
        else{
            if($(option).is(':visible')) $(option).slideUp('fast')
            else $(option).slideDown('fast')
        }
    }
}

function rotate90( el ) {
    el=document.getElementById( el )
    if(el.style.transform === "") el.style.transform = "rotate(00deg)"
    else{
        let degress = el.style.transform
        degress = parseInt(degress.substring(7,9))
        if(degress === 45) degress -= 45
        else if(degress === 90) degress = 0
        else degress += 45
        el.style.transform = `rotate(${degress}deg)`
    }
}

function writeRatingNgo(idAction){
    console.log(idAction)
}