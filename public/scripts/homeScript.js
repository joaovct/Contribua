var stateFilter = true

function init(){
    // addEventBtnFilter("btn-filters", "filters")
    addEventFilters("item-filter")
    addEventFilters("category-filter")
}

function addEventBtnFilter(e, e2){
    e = document.getElementsByClassName(e)[0]
    e2 = document.getElementsByClassName(e2)[0]
    e.addEventListener("click", ()=>{
        changeFilter(stateFilter, e2)
    })
}

function addEventFilters(e){
    e = document.getElementsByClassName(e)
    // console.log(e)
    for(i=0;i<e.length;i++){
         e[i].addEventListener("click", (el)=>{
             el = el.path[1]
             state = el.classList.contains("filter-active")
             if(state){
                 el.classList.add("filter-disabled")
                 el.classList.remove("filter-active")
             }else{
                 el.classList.add("filter-active")
                 el.classList.remove("filter-disabled")
             }
         })
    }
}

function addEventLinks(el){
    el = document.getElementsByClassName(el)
    for(i=0;i<el.length;i++){
        el[i].addEventListener("click", (e)=>{
            // console.log(e)
            target = e.target.title
            changeGroupNav(target)
        })
    }
}

function changeGroupNav(target){
    e = document.getElementsByClassName("group-nav")
    link = document.getElementsByClassName("category-link")
    targetE = document.getElementById(target)
    timeOut = 500

    if(target == "ngo-events"){
        animatesGroupNav(targetE, e[1], e[2], timeOut)
    } 
    else if(target == "ngo-members"){
        animatesGroupNav(targetE, e[0], e[2], timeOut) 
    }
    else{
        animatesGroupNav(targetE, e[0], e[1], timeOut) 
    }
    animatesLinkGroupNav(target, link)
}

// function animatesGroupNav(targetE, e1, e2, timeOut){
//     targetE.style.display = "block"
//     setTimeout(() => {
//         targetE.style.opacity = 1 
//     }, timeOut);
//     e1.style.opacity = 0
//     e2.style.opacity = 0  
//     setTimeout(() => {
//         e1.style.display = "none"
//         e2.style.display = "none" 
//     }, timeOut);
// }

// function animatesLinkGroupNav(target, link){
//     for(i=0;i<link.length;i++){
//         console.log(link[i])
//         if(link[i].title == target){
//             link[i].classList.add("active-link")
//         }else{
//             link[i].classList.remove("active-link")
//         }
//     }
// }

function changeFilter(state, e){
    if(state){
        e.style.transform = "scaleY(1)"
        e.style.height = "auto"
        stateFilter = false
    } 
    else{
        e.style.transform = "scaleY(0)"
        e.style.height = 0;
        stateFilter = true
    }
}