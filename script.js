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
        pizzaAmount = 1 //Reseta o valor da quantidade de pizzas
        
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

    setTimeout(() => {
        pizzaModal.style.display = 'none';
    }, 200)
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

// ---- Sistema do carrinho ----

qs(".pizzaInfo--addButton").addEventListener("click", () => { //Adicionar ao carrinho.
    //modalKey = Qual pizza
    //pizzaSize = Tamanho da pizza
    //pizzaAmount = Quantidade de pizzas
    let pizzaSize = parseInt(qs(".pizzaInfo--size.selected").getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id + '@' + pizzaSize;
    let key = cart.findIndex(item => item.identifier == identifier);

    if(key > -1) {
        cart[key].amount += pizzaAmount
    } else {
        cart.push({
            identifier: identifier,
            id: pizzaJson[modalKey].id,
            size: pizzaSize,
            amount: pizzaAmount
        })
    }

    updateCar();
    closeModal();

})

function updateCar() {
    qs('header .menu-openner span').innerHTML = cart.length

    if (cart.length > 0) {
        qs('.cart').innerHTML = ''; //Dá reset ao HTML do carrinho.

        let subtotal = 0;
        let discount = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find(item => item.id == cart[i].id)
            let cartItem = qs('.models .cart--item').cloneNode(true);
            let pizzaSizeName;

            subtotal += Math.round(pizzaItem.price * cart[i].amount) //Arredonda os valores para evitar números grandes.

            switch(cart[i].size) { //Determina, em string, o tamanho da pizza.
                case 0:
                    pizzaSizeName = "Pequena";
                    break;
                case 1:
                    pizzaSizeName = "Média";
                    break;
                case 2:
                    pizzaSizeName = "Grande";
                    break;
                default: 
                    pizzaSizeName = "Ocorreu um problema."
            }

            cartItem.querySelector('img').src = pizzaItem.img //Altera a IMG
            cartItem.querySelector('.cart--item-nome').innerHTML = `${pizzaItem.name} - ${pizzaSizeName}` //Mostra o nome + tamanho da pizza
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].amount
            cartItem.querySelector('.cart--item-qtmenos').addEventListener("click", () => { //Listener do botão de diminuir quantidade
                if(cart[i].amount > 1) {
                    cart[i].amount--;
                } else {
                    cart.splice(i, 1)
                }
                updateCar()
            })

            cartItem.querySelector('.cart--item-qtmais').addEventListener("click", () => { //Listener do botão de adicionar quantidade
                cart[i].amount++;
                updateCar()
            })

            qs('.cart').append(cartItem)
        }

        discount = Math.round(subtotal * 0.1) //Arredonda os valores para evitar números grandes.
        total = subtotal - discount

        qs('.subtotal span:last-child').innerHTML = `${subtotal.toFixed(2)}€`//Atribui 2 casas decimais aos valores.
        qs('.desconto span:last-child').innerHTML = `${discount.toFixed(2)}€`
        qs('.total span:last-child').innerHTML = `${total.toFixed(2)}€`

        qs('aside').classList.add("show")
    } else {
        qs('aside').classList.remove("show")
        qs('aside').style.left = '100vw'
    }
    
}

// ---- Sistema do carrinho Mobile ----

qs('header .menu-openner').addEventListener("click", () => {
    if(cart.length != 0) {
        qs('aside').style.left = '0'
    }
})

qs('.menu-closer').addEventListener("click", () => {
    qs('aside').style.left = '100vw'
})

// Alerta ao clicar no botão de finalizar compra 

qs('aside .cart--area .cart--details .cart--finalizar').addEventListener("click", () => {
    alert("Gostaria que fosse tudo verdade e que tivesse você como cliente 😞")
})