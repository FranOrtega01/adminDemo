const flujoCont = document.querySelector('.flujoCont')
const flujoContactCont = document.querySelectorAll('.flujoContactCont')

flujoCont.addEventListener('wheel', (e) => {
    flujoCont.scrollBy({
        left: e.deltaY < 0 ? -30 : 30,
    });
    
});

flujoContactCont.forEach(cont => {
    cont.addEventListener('wheel', e => {
        e.stopPropagation()
    }) 
})