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
    console.log(e)
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