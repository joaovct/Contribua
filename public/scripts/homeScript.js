const categories = document.getElementsByName("categories")
const nav = document.getElementsByClassName("nav-articles")[0]
let subscribies
let recommends
let proximity
let contrast
let recent

//gambiarra
let recommendElement = document.getElementById("filter-recommended")
let subscribeElement = document.getElementById("filter-subscription")
let gambiarra1 = false
let gambiarra2 = false

for(let categorie of categories){
    categorie.addEventListener("click", async () => {
        $(nav).html('')
        await filters(categorie)
    })
}

async function filters(categorie){
    subscribies = undefined
    recommends = undefined
    proximity = undefined
    contrast = undefined
    recent = undefined
    recommendElement.checked = true

    if(categorie.checked){
        if(categorie.value === "subscribies"){
            subscribies = categorie.value
        }else if(categorie.value === "recommends"){
            recommends = categorie.value
        }else if(categorie.value === "proximity"){
            proximity = categorie.value
        }else if(categorie.value === "contrast"){
            contrat = categorie.value
        }else if(categorie.value === "recent"){
            recent = categorie.value
        }
    }

    const actions = await $.post("http://localhost:3000/home/ajax?subscribies="+subscribies+"&recommends="+recommends+"&proximity="+proximity+"&contrast="+contrast+"&recent="+recent)
    console.log(actions)

    if(actions.recommendedActions.length > 0){
        gambiarra1 = false
        if(subscribies === "subscribies")
            $(nav).append('<h1 class="title padding-top2 margin-btm1">Eventos de suas inscrições</h1>')
        else
            $(nav).append('<h1 class="title padding-top2 margin-btm1">Eventos recomendados</h1>')

        $('#group-recommendedActions').html('')
        $(nav).append(`<div class="group-articles" id="group-recommendedActions"></div>`)
        for(let action of actions.recommendedActions){
            action = await formatAction(action)
            $('#group-recommendedActions').append(
                `
                    <article class='feed-article'>
                        <a href='event/${action.idAction}'>
                            <figure class='article-image'>
                                <img src='/temp/uploads/action/${action.photoAction}' />
                            </figure>
                            <div class='article-content'>
                                <h1 class='article-title'>${action.nameAction}</h1>
                                <h3 class='article-subitle'>${action.descriptionAction}
                                </h3>
                                <div class='article-ngo-details'>
                                    <!--<p class='article-ngo-name'>Por <a href='#'>${action.nameNgo}</a></p>-->
                                    <p class='article-ngo-date'>${action.createdAt.day} de ${action.createdAt.month} de
                                    ${action.createdAt.year}</p>
                                </div>
                            </div>
                        </a>
                    </article>
                `
            )
        }
    }else{
        gambiarra1 = true
        $('#group-recommendedActions').html('')
    }

    if(actions.recommendedNgos.length > 0){
        gambiarra2 = false
        $(nav).append('<h1 class="title padding-top2 margin-btm1">Ongs recomendadas</h1>')
        $('#group-recommendedNgos').html('')
        $(nav).append(`<div class="group-articles" id="group-recommendedNgos"></div>`)
        for(let ngo of actions.recommendedNgos){
            console.log(ngo)
            $('#group-recommendedNgos').append(
                `
                <a href="${ngo.ngo.userName}">
                    <article class="feed-article">
                        <figure class="article-image">
                            <img src="/temp/uploads/profile/${ngo.ngo.photoNgo}" />
                        </figure>
                        <div class="article-content">
                            <h1 class="article-title" style="color: #3f3f3f;">${ngo.ngo.nameNgo}</h1>
                        </div>
                    </article>
                </a>
                `
            )
        }
    }else{
        gambiarra2 = true
        $('#group-recommendedNgos').html('')
    }
    
    if(gambiarra1 && gambiarra2){
        console.log("teste")
        // $(group).html("")
        // $(group).append(
        //     `
        //     <div class="container flex-column align-center margin-top4">
        //     <img style="height: 40vh;" src="/assets/imgs/empty4.svg" />
        //     <h1 class="big-text text-center margin0 margin-top4">Não esperávamos por essa...</h1>
        //     <p class="text text-center margin0 margin-top1">Não conseguimos encontrar nenhum evento ou ONG de acordo com
        //         seus interesses.<br>Mas você ainda pode pesquisar por eventos e ONGs ou selecionar filtros diferentes.
        //     </p>
        //     </div>
        //     `
        // )
    }

}

async function formatAction(action){
    action.descriptionAction = action.descriptionAction.substring(0,100) + "..."
    const months = ["Jan", "Fev", "Mar", "Abri", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    action.createdAt = new Date(action.createdAt)
    action.createdAt.day = action.createdAt.getDay()
    action.createdAt.month = months[action.createdAt.getMonth()]
    action.createdAt.year = action.createdAt.getFullYear()
    return action
}