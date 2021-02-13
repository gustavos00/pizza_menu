/* --- Left Aside ---*/

const leftMenu = document.getElementById('leftMenuArea');
const leftMenuAfter = document.getElementById('leftMenuArea::after');

leftMenu.addEventListener('mouseover', () => {
    setTimeout(() => {
        leftMenu.style.opacity = 1;
        leftMenu.style.left = '0px';
    }, 30)
})


leftMenu.addEventListener('mouseout', () => {
    setTimeout(() => {
        leftMenu.style.opacity = .5;
        leftMenu.style.left = '-392px';
    }, 30)
})


/* --- Dark Mode ---*/
const darkMode = document.querySelector('#darkModeBtn');

darkMode.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
})


/* --- Products List ---*/

let pizzaAmount = 1; //Quantidade de pizzas do modal.
let cart = []; //Carrinho de compras.
let modalKey;

pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.models .pizzaItem').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizzaPrice').innerHTML = `${item.price.toFixed(2)}€`;
    pizzaItem.querySelector('.pizzaImg img').src = item.img;
    pizzaItem.querySelector('.pizzaName').innerHTML = item.name;
    pizzaItem.querySelector('.pizzaDescription').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener("click", e => {
        e.preventDefault();

        let pizzaModal = document.querySelector('.pizzaInfoModal');
        let pizzaModalContent = pizzaModal.querySelector('.modalContent');
        let key = e.target.closest('.pizzaItem').getAttribute('data-key');

        pizzaModalContent.querySelector('.pizzaDescription').innerHTML = pizzaJson[key].description;
        pizzaModalContent.querySelector('.pizzaName').innerHTML = pizzaJson[key].name;
        pizzaModalContent.querySelector('.price').innerHTML = `${pizzaJson[key].price.toFixed(2)}€`;
        pizzaModalContent.querySelector('img').src = pizzaJson[key].img;
        pizzaModalContent.querySelector('.priceArea .qntBtn h3').innerHTML = pizzaAmount;

        pizzaModalContent.querySelectorAll('.pizzaSize').forEach((size, sizeIndex) => {
            size.classList.remove('selected');
            if (sizeIndex == 2) size.classList.add('selected');
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        })

        //Animação de aparecer do Modal  
        pizzaModal.style.display = "flex";     
        pizzaModal.style.visibility = "visible";
        pizzaModal.style.opacity = 0;
        setTimeout(() => {
            pizzaModal.style.opacity = 1;
        }, 30)

        
        pizzaAmount = 1;
    });

    document.querySelector('main .content').append(pizzaItem)
});

    /* Close Modal Function*/

function closeModal() {
    let pizzaModal = document.querySelector(".pizzaInfoModal");

    pizzaModal.style.opacity = 0;
    setTimeout(() => {
        pizzaModal.style.display = 'none';
    }, 200)
}

document.querySelectorAll('.closeProduct, .mobileCloseModal').forEach((element) => {
    element.addEventListener("click", () => {closeModal()}); 
});

document.querySelectorAll('.pizzaSize').forEach((element) => {
    element.addEventListener("click", () => {
        let dataKey = element.getAttribute('data-key');

        document.querySelector('.pizzaSize.selected').classList.remove('selected')
        element.classList.add('selected')
    })
})


