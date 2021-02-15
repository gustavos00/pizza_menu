/* --- Geral --- */
//Variables
const darkMode = document.querySelector('#darkModeBtn');
let pizzaModal = document.querySelector('.pizzaInfoModal');
let pizzaModalContent = pizzaModal.querySelector('.modalContent');
let key;

let pizzaAmount = 1; //Quantidade de pizzas do modal.
let cart = []; //Carrinho de compras.
let modalKey, pizzaPrice, pizzaPriceFloat;

let cartModal = document.querySelector(".cart");
let cartVisibility = "hidden";

    //Functions
function closePizzaInfoModal() {
    pizzaModal.style.opacity = 0;

    setTimeout(() => {
        pizzaModal.style.display = 'none'
    }, 300)
}


function closeCartModal() {
    cartModal.style.opacity = 0;

    setTimeout(() => {
        cartModal.style.display = 'none'
    }, 300)
}

/* --- Dark Mode ---*/
darkMode.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
})

/* --- Close Modal Buttons --- */
document.querySelectorAll('.closeProduct, .mobileCloseModal').forEach((element) => {
    element.addEventListener("click", () => { closePizzaInfoModal() }); 
});

/* --- Select pizza size --- */
document.querySelectorAll('.pizzaSize').forEach((element) => {
    element.addEventListener("click", () => {
        document.querySelector('.pizzaSize.selected').classList.remove('selected');
        element.classList.add('selected');

        /* Set price */
        pizzaPriceFloat = pizzaJson[key].price
        let keyValue = element.getAttribute('data-key');

        switch(Number(keyValue)) {
            case 0:
                pizzaPriceFloat *= .8
                break;
            case 1:
                pizzaPriceFloat *= .9
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
document.querySelector(".lessQnt").addEventListener("click", () => {//To decrease pizza amount
    if (pizzaAmount > 1) {
        pizzaAmount--
        let pizzaPriceAct = (pizzaPriceFloat * pizzaAmount).toFixed(2);

        pizzaModalContent.querySelector('.price').innerHTML = `${pizzaPriceAct}€`;
        document.querySelector('.qntBtn h3').innerHTML = pizzaAmount 
    } 
})

document.querySelector(".moreQnt").addEventListener("click", () => {//To increase pizza amount.
    pizzaAmount++
    let pizzaPriceAct = (pizzaPrice * pizzaAmount).toFixed(2);
        
    pizzaModalContent.querySelector('.price').innerHTML = `${pizzaPriceAct}€`;
    document.querySelector('.qntBtn h3').innerHTML = pizzaAmount
})

/* --- Cart --- */
document.querySelector('.cartIcon').addEventListener("click", () => { //cart eventListener to open modal.
    if (cartVisibility == "visible") {
        cartVisibility = "hidden";
        closeCartModal()
    } else {
        cartModal.style.display = "flex";     
        cartModal.style.visibility = "visible";
    
        cartModal.style.opacity = 0;
        setTimeout(() => {
            cartModal.style.opacity = 1;
        }, 30)
        cartVisibility = "visible";
    }

})

/* --- Main System --- */
document.querySelector(".addProduct").addEventListener("click", () => { //Add product to cart
    //modalKey = Qual pizza
    //pizzaSize = Tamanho da pizza
    //pizzaAmount = Quantidade de pizzas
    let pizzaSize = parseInt(document.querySelector(".pizzaSize.selected").getAttribute('data-key'));
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

    console.log(cart)
    document.querySelector(".cartIcon span").innerHTML = cart.length;
    document.querySelector(".cartIcon span").style.display = "flex"

    updateCar(); 
    closePizzaInfoModal();
})

pizzaJson.map((item, index) => { //Fill content div with pizzas info & open modal system.
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

        //open modal animation
        pizzaModal.style.display = "flex";     
        pizzaModal.style.visibility = "visible";

        pizzaModal.style.opacity = 0;
        setTimeout(() => {
            pizzaModal.style.opacity = 1;
        }, 30)
        
        pizzaAmount = 1;
        modalKey = key;
    });

    document.querySelector('main .content').append(pizzaItem);
});

function updateCar() { //Update cart function
/*     document.querySelector('') - Do span do header do mobile*/

    if (cart.length > 0) {
        document.querySelector('.cart .container').innerHTML = '';

        let subtotal = 0;
        let discount = 0;
        let total = 0;

        for(let i in cart) {
            let pizzaItem = pizzaJson.find(item => item.id == cart[i].id);
            let cartItem = document.querySelector('.models .cartItem').cloneNode(true);
            let pizzaSizeName;

            subtotal = Math.round(pizzaItem.price * cart[i].amount);

            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = "Pequena";
                    break;
                case 1:
                    pizzaSizeName = "Pequena";
                    break;
                case 2:
                    pizzaSizeName = "Pequena";
                    break;
                default:
                    pizzaSizeName = "Erro"
                    console.log("Erro #001")
            }

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cartPizzaName').innerHTML = `${pizzaItem.name} - ${pizzaSizeName}`;
            cartItem.querySelector('.cartQuantityArea .showQuantity').innerHTML = cart[i].amount;
            cartItem.querySelector('.cartQuantityArea .removeQuantity').addEventListener("click", () => {
                                   console.log(cart)
                
                if(cart[i].amount > 1) {
                    cart[i].amount--;
                } else {
                    console.log(cart)
                    cart.splice(i, 1)
                    console.log(cart)
                }
                updateCar()
            })

            cartItem.querySelector('.cartQuantityArea .addQuantity').addEventListener("click", () => {
                cart[i].amount++;
                updateCar()
            })

            document.querySelector('.cart .container').append(cartItem)            
        }
    }
}