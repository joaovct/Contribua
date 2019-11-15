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

function doSearchVolunteer(value){
    $(document).ready(()=>{
        if( value.trim().length > 0 && value.length > 0 ){
            $.post('http://localhost:3000/searchVolunteer?key=' + value, (data) => {
                console.log(data)
            })
        }else{
            // none users found
        }
    })
}