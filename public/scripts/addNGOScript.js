function init(){
    form = document.getElementsByName("form-registerNGO")
    forms = document.getElementsByClassName("registerNGO")
    steps = document.getElementsByClassName("step")
    btns = document.getElementsByClassName("form-submit")
    addEventClick(steps)
    addEventClick(btns)
    addEventInput()
    // console.log(form)
}

function addEventClick(el){
    for(i=0;i<el.length; i++){
        el[i].order = i
        // console.log(el[i].order)
        el[i].addEventListener("click", (e) => {
            if(e.target.order != undefined){
                changeForm(e.target.order, "btn")
                console.log("AEEEee")
            }else{
                e = e.path[1].title
                e = parseInt(e) - 1
                changeForm(e, "step")
            }
        })
    }
}

function addEventInput(f){
    inputs = document.getElementsByClassName("form-input")
    btnSubmit = document.getElementById("registerNGO-submit")
    for(i=0;i<inputs.length;i++){
        inputs[i].addEventListener("input", () => {
            checksForm(inputs, btnSubmit)
        })
    }
}

function checksForm(inputs, btn){
    var c = true;
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "" || inputs[i].value == null || inputs[i].value == undefined) c = false;
    }
    if (c) btn.disabled = false;
    if (!c) btn.disabled = true;
}

function changeForm(n, format){
    // console.log(n, format)
    if(n>=0){
        if(format == "step"){
            for(i=0;i<forms.length;i++){
                if(i==n) forms[n].style.display = "block"
                else forms[i].style.display = "none"
            }
            animatesStep(n)
        }else{
            if(n<2){
                forms[n+1].style.display = "block"
                forms[n].style.display = "none"
                animatesStep(n+1)
            } 
        }
    }
}

function animatesStep(n){
    for(i=0;i<steps.length;i++){
        if(i!=n) steps[i].classList.add("disabled")
        else{
            steps[i].classList.remove("disabled")
        }
    }
}
