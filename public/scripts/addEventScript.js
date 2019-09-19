// Hide elements
var asides = document.getElementsByClassName('asides')
for(i=0;i<asides.length;i++){
    if(i>0) $(asides[i]).hide()
}
$('.typeEvent').hide()
$('.article-event').hide()
$('.overlay').hide()
$('.preview').hide()
$('.done').hide()