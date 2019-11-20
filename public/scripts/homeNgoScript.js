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