//preview perfil
const inputPhoto = document.getElementsByName("photo")[0]
const preview = document.getElementsByClassName("label-profile-pic")[0]

inputPhoto.addEventListener("change", previewPhoto)

function previewPhoto(){
    if(this.files && this.files[0]){
        var obj = new FileReader();
        obj.onload = function(dado){
            preview.style.background = "url("+dado.target.result+") center center / cover";
        }
        obj.readAsDataURL(this.files[0]);
    }
}