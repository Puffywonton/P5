// {"107fb5b75607497b96722bda5b504926":{"Blue":1,"White":1,"Black":1},"415b7cacb65d43b2b5c1ff70f3393ad1":{"Black/Yellow":2,"Black/Red":5}}


var calculateTotalCart = () => {
    let cartTotalPrice = 0;
    let totalQty = 0;
    for (let id in myCart) {
        let productQty = 0;
        let productTotalPrice = 0;
        for (let color in myCart[id].content){
            productQty += parseFloat(myCart[id].content[color])
            productTotalPrice += myCart[id].content[color]*myCart[id].info.price
        }
        totalQty += productQty
        cartTotalPrice += productTotalPrice
    }
    document.getElementById('totalQuantity').innerText=totalQty
    document.getElementById('totalPrice').innerText=cartTotalPrice
}

var myCart = {}
createMyCart();
async function createMyCart() {
    // let myCart = {}
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log('cart', cart)
    
    for (let itemId in cart){
        await fetchOneProduct("" , itemId)
        .then (leProduct => {
            myCart[itemId] = { 
                info : leProduct,
                content : cart[itemId]
            }
            delete myCart[itemId].info.colors;
            delete myCart[itemId].info._id;
        })
    }
    console.log("mycart", myCart)
    displayCartItems(myCart);
}

async function fetchOneProduct(result , productId) {
    result = await fetch("http://localhost:3000/api/products/"+productId)
    return result.json();
}

async function displayCartItems(cart) {
    for (let itemId in cart){
        for (let color in cart[itemId].content){
            document.getElementById("cart__items").innerHTML += `
            <article class="cart__item" data-id="` + itemId + `" data-color="` + color +`">
                <div class="cart__item__img">
                    <img src="`+ cart[itemId].info.imageUrl +`" alt="`+ cart[itemId].info.altTxt +`">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>`+ cart[itemId].info.name +`</h2>
                        <p>`+ color +`</p>
                        <p>`+ cart[itemId].info.price +` €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="`+cart[itemId].content[color]+`" oninput="updateCart('`+itemId+`','`+color+`')">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p onclick="deleteItem('`+itemId+`','`+color+`')" class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
            `
        }
    }
    calculateTotalCart();
}

//QUESTION  delete local ou mycart ??? 

var updateCart = (id,color) => {
    let newQty = document.querySelector("article[data-id="+CSS.escape(id)+"][data-color="+CSS.escape(color)+"] input").value;
    
    myCart[id].content[color] = newQty

    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[id][color] = newQty
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotalCart();
}

var deleteItem = (id,color) => {
    let articleToRemove = document.querySelector("article[data-id="+CSS.escape(id)+"][data-color="+CSS.escape(color)+"]")
    articleToRemove.parentNode.removeChild(articleToRemove)

    delete myCart[id].content[color];
    if (Object.keys(myCart[id].content).length == 0){
        delete myCart[id]
    }

    let cart = JSON.parse(localStorage.getItem("cart"));
    delete cart[id][color];
    if (Object.keys(cart[id]).length == 0){
        delete cart[id]
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotalCart();

}

let inputFirstName = document.getElementById("firstName").addEventListener("input", function(){
    console.log("hello")
})
let inputLastName = document.getElementById("lastName").addEventListener("input", function(){
    console.log("hello")
})
let inputAddress = document.getElementById("address").addEventListener("input", function(){
    console.log("hello")
})
let inputCity = document.getElementById("city").addEventListener("input", function(){
    console.log("hello")
})
let inputEmail = document.getElementById("email").addEventListener("input", function(){
    console.log("hello")
})
let orderButton = document.getElementById("order") .addEventListener("click", function(){
    console.log("hello")
})


// function getCodeValidation() {
//     return document.getElementById("code-validation");
//   }
  
//   function disableSubmit(disabled) {
//     if (disabled) {
//       document
//         .getElementById("submit-btn")
//         .setAttribute("disabled", true);
//     } else {
//       document
//         .getElementById("submit-btn")
//         .removeAttribute("disabled");
//     }
//   }
  
//   document
//     .getElementById("code")
//     .addEventListener("input", function(e) {
//     if (/^CODE-/.test(e.target.value)) {
//       getCodeValidation().innerText = "Code valide";
//       disableSubmit(false);
//     } else {
//       getCodeValidation().innerText = "Code invalide";
//       disableSubmit(true);
//     }
//   });