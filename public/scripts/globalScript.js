function closeAlert(e){
    e = e.parentNode;
    child = e.children[0].children[0]
    content = []
    content.push(e.children[1].children[0])
    content.push(e.children[1].children[1])
    e.style.opacity = 0
        setTimeout(() => {
            e.style.display = "none"
        }, 250);
}