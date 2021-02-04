/* --- Left Aside ---*/

const leftMenu = document.getElementById('left-menu-area')
const leftMenuAfter = document.getElementById('left-menu-area::after')

leftMenu.addEventListener('mouseover', () => {
    setTimeout(() => {
        leftMenu.style.opacity = 1;
        leftMenu.style.left = '0px'
    }, 30)
})


leftMenu.addEventListener('mouseout', () => {
    setTimeout(() => {
        leftMenu.style.opacity = .5;
        leftMenu.style.left = '-392px'
    }, 30)
})


/* --- Dark Mode ---*/
const darkMode = document.querySelector('#darkModeBtn')

darkMode.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode')
    alert("a")
})