for (let elem of tree.querySelectorAll('li')) {
    let span  = document.createElement('span');
    elem.prepend(span.innerHTML="span");
}

function handler(event){
    alert(`clicked, ${event.target}`)
}
document.addEventListener('click', handler);