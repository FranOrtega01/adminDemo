const flujoCont = document.querySelector('.flujoCont')
const flujoContactCont = document.querySelectorAll('.flujoContactCont')

flujoCont.addEventListener('wheel', (e) => {
    e.preventDefault()
    flujoCont.scrollBy({
        left: e.deltaY < 0 ? -60 : 60,
    });
    
});

flujoContactCont.forEach(cont => {
    cont.addEventListener('wheel', e => {
        e.stopPropagation()
    }) 
})