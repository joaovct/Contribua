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
    console.log(el)
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
    console.log(el)
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

$(document).mouseup((e)=>{
    if(!$('.search-results').is(e.target) && $('.search-results').has(e.target).length === 0){
        removeDiv('.search-results')
    } 
})

function doSearch(input){
    let value = input.value
    $(document).ready(()=>{
        if(value.length > 0){
            var results = $.get('http://localhost:3000/search?key=' + value, (data) => {
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
        if(i==0) $('.search-results').append('<h1 class="title-type-result">Voluntários</h1>')
        $('.search-results').append(`<li class="volunteer"> <img src="/assets/imgs/man2.jpg"/> <div class="item-content"> <h3 class="item-title">${object.name}</h3> </div> </li>`)
        i++
    }
}

function writeNgos(data){
    var i = 0
    for(let object of data){
        if(i==0) $('.search-results').append('<h1 class="title-type-result">ONGs</h1>')
        $('.search-results').append(`<li class="ngo"> <img src="/assets/imgs/animal-cat-cute-46024.jpg"/> <div class="item-content"> <h3 class="item-title">${object.name}</h3> </div> </li>`)
        i++
    }
}

function changeSettingsForm(n, e){
    items = document.getElementsByClassName("settings-link")
    forms = document.getElementsByClassName("settings-form")
    for(let i of items){
        i.classList.remove('active')
    }
    // for(let i of forms){
    //     $(i).hide()
    // }
    $(forms).hide()
    $(forms[n]).show()
    e.classList.add('active')
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