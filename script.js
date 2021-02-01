const qs = (el) => document.querySelector(el);
const qsa = (el) => document.querySelectorAll(el)

let pizzaAmount = 1; //Quantidade de pizzas do modal.
let cart = [] //Carrinho de compras.
let modalKey

//Lista das pizzas
pizzaJson.map((item, index) => {
    let pizzaItem = qs('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `${item.price.toFixed(2)}€`;
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //--- Quando clicar na pizza ---
    pizzaItem.querySelector('a').addEventListener("click", (e) => {
        e.preventDefault(); //Cancelar o reload da página.
        pizzaAmount = 1 //Reseta o valor da quantidade de pizzas.Meu 


        let pizzaModal = qs('.pizzaWindowArea')
        let pizzaModalContent = pizzaModal.querySelector('.pizzaInfo') //variavel que guarda o HTML do conteudo no Modal.
        let pizzaModalPrice = pizzaModalContent.querySelector('.pizzaInfo--pricearea') //variavel que guarda o HTML da parte do Preço no Modal.
        let key = e.target.closest('.pizza-item').getAttribute('data-key') //Irá procurar o elemento mais proximo com a tag "pizza-item"
        modalKey = key

        //Colocação do conteudo do modal
        pizzaModalContent.querySelector('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        pizzaModalContent.querySelector('h1').innerHTML = pizzaJson[key].name
        pizzaModal.querySelector('.pizzaBig img').src = pizzaJson[key].img
        pizzaModalPrice.querySelector('.pizzaInfo--actualPrice').innerHTML = `${pizzaJson[key].price.toFixed(2)}€`;
        pizzaModalPrice.querySelector('.pizzaInfo--qt').innerHTML = pizzaAmount
        pizzaModalContent.querySelector('.pizzaInfo--size.selected').classList.remove('selected')

        pizzaModalContent.querySelectorAll('.pizzaInfo--size').forEach((size, sizeIndex) => { //Todos os elementos com a class "pizzaInfo--size"
            if (sizeIndex == 2) size.classList.add('selected');
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        });



        //Animação de aparecer do Modal  
        pizzaModal.style.display = "flex";     
        pizzaModal.style.opacity = 0;
        setTimeout(() => {
            pizzaModal.style.opacity = 1;
        }, 30)


    })

    qs('.pizza-area').append(pizzaItem)
});


//Eventos do Modal.
function closeModal() {
    let pizzaModal = qs('.pizzaWindowArea');
    pizzaModal.style.opacity = 0;
}

    
qsa('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => { //Para os botões de fechar o modal.
    item.addEventListener("click", () => {
        closeModal()
    })
})

qsa('.pizzaInfo--size').forEach((size) => { //Para os botões de fechar o modal.
    size.addEventListener("click", (e) => {
        qs('.pizzaInfo--size.selected').classList.remove('selected')
        size.classList.add('selected')
    })
})

qs(".pizzaInfo--qtmenos").addEventListener("click", () => {//Para os botões de diminuir a quantidade de pizzas
    if (pizzaAmount > 1) {
        pizzaAmount--
        qs('.pizzaInfo--qt').innerHTML = pizzaAmount 
    } 
})

qs(".pizzaInfo--qtmais").addEventListener("click", () => {//Para os botões de aumentar a quantidade de pizzas
    pizzaAmount++
    qs('.pizzaInfo--qt').innerHTML = pizzaAmount
})
