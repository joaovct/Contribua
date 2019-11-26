let buttons = document.getElementsByClassName('filters')
let btnProximity = document.getElementById('filter-proximity')
let btnProximityRange = document.getElementById('filter-proximity-range')
let boxRange = document.getElementById('options-range')
let nav = document.getElementsByClassName('nav-articles')
let numberSearchs = 0
let noneArticles = `<div class="noneArticles container flex-column align-center margin-top4"><img style="height: 40vh;" src="/assets/imgs/empty4.svg" /><h1 class="big-text text-center margin0 margin-top4">Não esperávamos por essa...</h1><p class="text text-center margin0 margin-top1">Não conseguimos encontrar nenhum evento ou ONG de acordo com seus interesses.<br>Mas você ainda pode pesquisar por eventos e ONGs ou selecionar filtros diferentes.</p></div>`
let msg // Msg to alert  
let typeMsg // Type for make verifications to close alerts

// Add event listener to filters
for(let b of buttons){ 
    b.addEventListener("click", ()=>{
        doFiltering(b)
    })
    if(b.type === "range"){ 
        b.addEventListener("input", ()=>{
            doFiltering(b)
        }) 
    }
}

// Add event listener to proximity button
btnProximity.addEventListener('click', ()=>{

    // Show or not box

    if(!$(boxRange).is(':visible') && btnProximity.checked) $(boxRange).fadeIn('fast').css('display','flex')
    else $(boxRange).fadeOut('fast')

    if(btnProximity.checked) doFiltering(btnProximityRange)
    else{
        removeArticles(btnProximity.value)
        let checks = false
        for(let b of buttons) if(b.checked) checks = true
        if(!checks){
            writeNoneArticles()
        }
    }
})

doFiltering = (filter) => {
    // Normal filters
    if(filter.checked && filter.value != "proximity"){
        let url = `http://localhost:3000/home/filter?key=${filter.value}`
        $.post(url, (data) => {
            if(data.articles != undefined || data.ngos != undefined) writeArticles(data)
            else{
                checksContent()
            }
        })
    }else if(!filter.checked && filter.type != "range"){
        removeArticles(filter.value)
        checksContent()
    }
    // Proximity filter
    if(filter.type === "range"){
        let valueRange = document.getElementById('filter-proximity-range').value
        let url = `http://localhost:3000/home/filter?key=${filter.getAttribute('data-type')}&distance=${valueRange}`
        $.post(url, (data)=>{
            if(data.articles != undefined || data.ngos != undefined) writeArticles(data, valueRange)
            else{
                checksContent()
            }
        })
    }
}

writeArticles = (articles, radiusRange) => {
    // Write articles

    if(articles.actions.length > 0){
        $(`[data-typeArticles="${articles.typeArticles}"]`).fadeOut(500, ()=>{$(this).remove()})
        if(articles.typeArticles === "proximity" && typeMsg === "proximity") closeAllAlerts()
        writeActions(articles)
    }
    if(articles.ngos.length > 0){
        $(`[data-typeArticles="${articles.typeArticles}`+'ngos'+``).fadeOut(500, ()=>{$(this).remove()})
        if(articles.typeArticles === "proximity" && typeMsg === "proximity") closeAllAlerts()     
        writeNgos(articles)
    } 

    if(articles.actions.length > 0 || articles.ngos.length > 0){
        removeNoneArticles()
    }else{
        showAlertNoneArticles(articles.typeArticles, radiusRange)
    }
}

writeActions = (articles) => {
    // Prepare wrapper to receive actions
    $(nav).hide().prepend(`<div class="wrapper-articles" data-typeArticles="${articles.typeArticles}"> <div class="group-articles" data-typeGroup="${articles.typeArticles}"></div> </div>`).fadeIn(500)

    // Give a title to group actions
    if(articles.typeArticles === "subscriptions") $(`[data-typeArticles="${articles.typeArticles}"]`).prepend('<h1 class="title padding-top2 margin-btm1">Eventos de suas inscrições</h1>')
    else if(articles.typeArticles === "recommended") $(`[data-typeArticles="${articles.typeArticles}"]`).prepend('<h1 class="title padding-top2 margin-btm1">Eventos recomendados</h1>')
    else if(articles.typeArticles === "recents") $(`[data-typeArticles="${articles.typeArticles}"]`).prepend('<h1 class="title padding-top2 margin-btm1">Eventos mais recentes</h1>')
    else if(articles.typeArticles === "proximity") $(`[data-typeArticles="${articles.typeArticles}"]`).prepend(`<h1 class="title padding-top2 margin-btm1">Eventos próximos a ${articles.district}</h1>`)
    else if(articles.typeArticles === "my-events") $(`[data-typeArticles="${articles.typeArticles}"]`).prepend(`<h1 class="title padding-top2 margin-btm1">Seus próximos eventos</h1>`)
    // Write actions
    for(let i = 0; i < articles.actions.length; i++){
        let action = articles.actions[i]
        let nameNgo = articles.nameNgos[i]
        // Format date
        let date = new Date(action.createdAt)
        date = formatDate(date)

        $(`[data-typeGroup="${articles.typeArticles}"]`).append(
            `
            <article class="feed-article">
                <a href="event/${action.idAction}">
                    <figure class="article-image">
                       <img src="/temp/uploads/action/${action.photoAction}" />
                    </figure>
                    <div class="article-content">
                      <h1 class="article-title">${action.nameAction}</h1>
                       <h3 class="article-subitle">${action.descriptionAction}</h3>
                            <div class="article-ngo-details">
                            <p class="article-ngo-name">Por <a href="#">${nameNgo}</a></p>
                            <p class="article-ngo-date">${date.day} de ${date.month} de ${date.year}</p>
                        </div>
                    </div>
                </a>
            </article>   
            `
        )
    }
}

writeNgos = (articles) => {
    // Prepare wrapper to receive ngos
    $(nav).hide().append(`<div class="wrapper-articles" data-typeArticles="${articles.typeArticles}`+'ngos'+`"> <div class="group-ngos" data-typeGroup="${articles.typeArticles}`+'ngos'+`"></div> </div>`).fadeIn(500)

    // Give a title to group ngos
    if(articles.typeArticles === "recommended") $(`[data-typeArticles="${articles.typeArticles}`+'ngos'+`"]`).prepend('<h1 class="title padding-top2 margin-btm1">ONGs recomendadas</h1>')
    if(articles.typeArticles === "subscriptions") $(`[data-typeArticles="${articles.typeArticles}`+'ngos'+`"]`).prepend('<h1 class="title padding-top2 margin-btm1">ONGs que você é inscrito</h1>')
    // Write ngos
    for(let ngo of articles.ngos){
        $(`[data-typeGroup="${articles.typeArticles}`+'ngos'+`"]`).append(
            `
                <article class="feed-ngo">
                    <a href="${ngo.userName}">
                        <figure class="ngo-pic">
                            <img src="/temp/uploads/profile/${ngo.photoNgo}" />
                        </figure>
                        <h1 class="ngo-name">${ngo.nameNgo}</h1>
                    </a>
                </article>
            `
        )
    }
}

removeArticles = (typeArticles) => {
    $(`[data-typeArticles="${typeArticles}"]`).fadeOut(500, ()=>{$(this).remove()})
    $(`[data-typeArticles="${typeArticles}`+'ngos'+``).fadeOut(500, ()=>{$(this).remove()})
}

writeNoneArticles = () => {
    $(nav).hide().prepend(noneArticles).fadeIn(1100)
}

removeNoneArticles = () => {
    $('.noneArticles').remove()
}

checksContent = () => {
    let hasContent = [buttons.length]
    for(var i = 0; i < buttons.length; i++){
        if(buttons[i].checked){
            $.post(`http://localhost:3000/home/filter?key=${buttons[i].value}`, (data) => {
                if(data.articles != undefined || data.ngos != undefined){
                    writeArticles(data)
                    hasContent[i] = true
                }else{
                    hasContent[i] = false
                }
            })
        }else{
            hasContent[i] = false
        }
    }

    if(btnProximity.checked){
        let valueRange = document.getElementById('filter-proximity-range').value
        let url = `http://localhost:3000/home/filter?key=${btnProximity.value}&distance=${valueRange}` 

        $.post(url, (data)=> {
            if(data.articles == undefined && data.ngos == undefined){
                removeArticles(btnProximity.value)
                hasContent.push(false)
            }else{
                hasContent.push = true
            }
        })

    }else{
        removeArticles(btnProximity.value)
        hasContent.push(false)
    }

    let checks = false
    for(let hc of hasContent) if(hc) checks = true
    
    if(!checks){
        removeNoneArticles()
        writeNoneArticles()
    }
}

showAlertNoneArticles = (typeArticles, radiusRange) => {
    switch (typeArticles){
        case "subscriptions":
            msg = "inscrições"
            break
        case "recommended":
            msg = "recomendações"
            break
        case "proximity":
            msg = `proximidade num raio de ${radiusRange} km`
            typeMsg = "proximity"
            break
        case "highlights":
            msg = "destaques"
            break
        case "recents":
            msg = "recentes"
            break
        case "my-events":
            msg = "seus eventos"
            break

    }
    if(typeArticles==="proximity"){
        checksContent()
        closeAllAlerts()
    }
    callAlert("Nada encontrado!", `Não conseguimos encontrar nenhum evento ou ONG por ${msg}.`, "warning")
}

function formatDate(rDate){
    const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    rDate.day = rDate.getDate()
    rDate.month = months[rDate.getMonth()]
    rDate.year = rDate.getFullYear()
    return rDate
}