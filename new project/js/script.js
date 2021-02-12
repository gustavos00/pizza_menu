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
})


/* --- Products List ---*/

const qa = (el) => document.querySelector(el);
const qsa = (el) => document.querySelector(el);

pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-price').innerHTML = `${item.price.toFixed(2)}€`
    pizzaItem.querySelector('.pizza-img img').src = item.img
    pizzaItem.querySelector('.pizza-name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-description').innerHTML = item.description;

    document.querySelector('main .content').append(pizzaItem)
})