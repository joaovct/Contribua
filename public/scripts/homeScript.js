const categories = document.getElementsByName("categories")
const group = document.getElementsByClassName("group-articles")[0]
let subscribies
let recommends
let proximity
let contrast
let recent

//gambiarra
let recommendElement = document.getElementById("filter-recommended")
let subscribeElement = document.getElementById("filter-subscription")

for(let categorie of categories){
    categorie.addEventListener("click", async () => {
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
            recommendElement.checked = false
        }else if(categorie.value === "recommends"){
            recommends = categorie.value
            subscribeElement.checked = false
        }else if(categorie.value === "proximity"){
            proximity = categorie.value
            subscribeElement.checked = false
            recommendElement.checked = false
        }else if(categorie.value === "contrast"){
            contrat = categorie.value
            subscribeElement.checked = false
            recommendElement.checked = false
        }else if(categorie.value === "recent"){
            recent = categorie.value
            subscribeElement.checked = false
            recommendElement.checked = false
        }
    }

    const actions = await $.post("http://localhost:3000/home/ajax?subscribies="+subscribies+"&recommends="+recommends+"&proximity="+proximity+"&contrast="+contrast+"&recent="+recent)
    console.log(actions)

    if(actions.length > 0){
        $(group).html('')

        for(let action of actions){
            action = await formatAction(action)
            $(group).append(
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
        $(group).html("")
        $(group).append(
            `
            <div class="container flex-column align-center margin-top4">
            <img style="height: 40vh;" src="/assets/imgs/empty4.svg" />
            <h1 class="big-text text-center margin0 margin-top4">Não esperávamos por essa...</h1>
            <p class="text text-center margin0 margin-top1">Não conseguimos encontrar nenhum evento ou ONG de acordo com
                seus interesses.<br>Mas você ainda pode pesquisar por eventos e ONGs ou selecionar filtros diferentes.
            </p>
            </div>
            `
        )
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