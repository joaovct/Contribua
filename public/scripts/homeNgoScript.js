function hideOptions(option){
    option = document.querySelector(option)
    console.log(option)
    var options = document.getElementsByClassName('member-options')
    for(let op of options){
        if(op!=option) $(op).slideUp('fast')
        else{
            if($(option).is(':visible')) $(option).slideUp('fast')
            else $(option).slideDown('fast')
        }
    }
}