/* --- Dark Mode ---*/
const darkMode = document.querySelector('#darkModeBtn');

darkMode.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
})


/* --- Products List ---*/

let pizzaModal = document.querySelector('.pizzaInfoModal');
let pizzaModalContent = pizzaModal.querySelector('.modalContent');
let key;

let pizzaAmount = 1; //Quantidade de pizzas do modal.
let cart = []; //Carrinho de compras.
let modalKey, pizzaPrice;

pizzaJson.map((item, index) => {
    let pizzaItem = document.querySelector('.models .pizzaItem').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizzaPrice').innerHTML = `${item.price.toFixed(2)}€`;
    pizzaItem.querySelector('.pizzaImg img').src = item.img;
    pizzaItem.querySelector('.pizzaName').innerHTML = item.name;
    pizzaItem.querySelector('.pizzaDescription').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener("click", e => {
        e.preventDefault();

        key = e.target.closest('.pizzaItem').getAttribute('data-key');
        pizzaPrice = pizzaJson[key].price.toFixed(2);

        pizzaModalContent.querySelector('.pizzaDescription').innerHTML = pizzaJson[key].description;
        pizzaModalContent.querySelector('.pizzaName').innerHTML = pizzaJson[key].name;
        pizzaModalContent.querySelector('.price').innerHTML = `${pizzaPrice}€`;
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

    document.querySelector('main .content').append(pizzaItem);
});

    /* Close Modal Function*/

function closeModal() {
    let pizzaModal = document.querySelector(".pizzaInfoModal");

    pizzaModal.style.opacity = 0;
    setTimeout(() => {
        pizzaModal.style.display = 'none';
    }, 200);
}

    /* Close Modal Buttons */
document.querySelectorAll('.closeProduct, .mobileCloseModal').forEach((element) => {
    element.addEventListener("click", () => { closeModal() }); 
});

    /* Select pizza size*/
document.querySelectorAll('.pizzaSize').forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector('.pizzaSize.selected').classList.remove('selected');
        element.classList.add('selected');

        /* Set price */
        let pizzaPriceFloat = pizzaJson[key].price
        let keyValue = element.getAttribute('data-key');

        switch(Number(keyValue)) {
            case 0:
                pizzaPriceFloat *= .9
                break;
            case 1:
                pizzaPriceFloat *= .8
                break
            default: 
                console.log("Erro ao calcular o preço. Key = " +  key);
                break; 
        }

        pizzaPrice = pizzaPriceFloat.toFixed(2)
        pizzaModalContent.querySelector('.price').innerHTML = `${pizzaPrice}€`;

        pizzaAmount = 1;
        document.querySelector('.qntBtn h3').innerHTML = pizzaAmount
    })
})

/* --- Change pizza quantity --- */

document.querySelector(".lessQnt").addEventListener("click", () => {//Para os botões de diminuir a quantidade de pizzas
    if (pizzaAmount > 1) {
        pizzaAmount--
        document.querySelector('.qntBtn h3').innerHTML = pizzaAmount 
    } 
})

document.querySelector(".moreQnt").addEventListener("click", () => {//Para os botões de aumentar a quantidade de pizzas
    pizzaAmount++
    document.querySelector('.qntBtn h3').innerHTML = pizzaAmount
})

