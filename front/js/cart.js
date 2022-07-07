// ajouter un truc pour regrouper les items par ids
// ajouter un truc pour verifier si le cart est correct ??

getCartFromStorage()
function getCartFromStorage() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (let item in cart){
        displayCartItems(cart[item].id, cart[item].color, cart[item].qty)
    }
    calculateTotalCart();
}

async function fetchOneProduct(result , productId) {
    result = await fetch("http://localhost:3000/api/products/"+productId)
    return result.json();
}

function displayCartItems(productId, productColor, productQty) {
    fetchOneProduct("", productId)
    .then (function(leProduct){
    
        let addArticle = document.createElement("article");
        
        addArticle.setAttribute("class", "cart__item");
        addArticle.setAttribute("data-id", productId);
        addArticle.setAttribute("data-color", productColor);
        
        let addDivImg = document.createElement("div");
        addDivImg.setAttribute("class", "cart__item__img");
        let addImg = document.createElement("img");
        addImg.setAttribute("src", leProduct.imageUrl);
        addImg.setAttribute("alt", leProduct.altTxt);
        addDivImg.appendChild(addImg);
        addArticle.appendChild(addDivImg);

        let addDivContent = document.createElement("div");
        addDivContent.setAttribute("class", "cart__item__content");

        let addDivContentDescription = document.createElement("div");
        addDivContentDescription.setAttribute("class", "cart__item__content__description")
        let addH2 = document.createElement("h2");
        addH2.textContent = leProduct.name;
        addDivContentDescription.appendChild(addH2);
        let addPcolor = document.createElement("p");
        addPcolor.textContent = productColor;
        addDivContentDescription.appendChild(addPcolor);
        let addPprice = document.createElement("p");
        addPprice.textContent = leProduct.price + "€";
        addDivContentDescription.appendChild(addPprice);

        addDivContent.appendChild(addDivContentDescription)
        
        let addDivContentSettings = document.createElement("div");
        addDivContentSettings.setAttribute("class", "cart__item__content__settings");

        let addDivContentSettingsQuantity = document.createElement("div");
        addDivContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity");
        let addPQty = document.createElement("p");
        addPQty.textContent = "Qté : "
        addDivContentSettingsQuantity.appendChild(addPQty)
        let addInputQty = document.createElement("input");
        addInputQty.setAttribute("type", "number");
        addInputQty.setAttribute("class", "itemQuantity");
        addInputQty.setAttribute("name", "itemQuantity");
        addInputQty.setAttribute("min", "1");
        addInputQty.setAttribute("max", "100");
        addInputQty.setAttribute("value", productQty);
        
        addDivContentSettingsQuantity.appendChild(addInputQty);
        addDivContentSettings.appendChild(addDivContentSettingsQuantity);
        
        let addDivContentSettingsDelete = document.createElement("div");
        addDivContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete");
        let addPdelete = document.createElement("p");
        addPdelete.setAttribute("class", "deleteItem");
        addPdelete.textContent = "Supprimer";
        addDivContentSettingsDelete.appendChild(addPdelete);
        addDivContentSettings.appendChild(addDivContentSettingsDelete);

        addDivContent.appendChild(addDivContentSettings);
        addArticle.appendChild(addDivContent);

        document.getElementById("cart__items").appendChild(addArticle);

        
        //listen to input:
        let modifiedQty = document.querySelector("article[data-id="+CSS.escape(productId)+"][data-color="+CSS.escape(productColor)+"] input");

        modifiedQty.addEventListener("input", function(){
            console.log("update article qty to:", modifiedQty.value);
            updateCart(productId, productColor, modifiedQty.value)
        })

        //listen to delete:
        document.querySelector("article[data-id="+CSS.escape(productId)+"][data-color="+CSS.escape(productColor)+"] p.deleteItem").addEventListener("click", function(){
            console.log("delete color:", productColor,"of product:", productId);
            let toto = document.querySelector("article[data-id="+CSS.escape(productId)+"][data-color="+CSS.escape(productColor)+"]");
            // toto.innerHTML = '';
            toto.parentNode.removeChild(toto);
            deleteItemCart(productId, productColor)
        })



    })
}

function updateCart(productId, productColor, modifiedQty) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.find(function(item){
        if (item.id == productId && item.color == productColor){
        item.qty = modifiedQty;
        localStorage.setItem("cart", JSON.stringify(cart));
        calculateTotalCart();
        }
    })
}

function deleteItemCart(productId, productColor) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let tempCart = cart.filter(item => {
        if (item.id != productId || item.color != productColor) {
            return item;
        }
    })
    console.log("product deleted");
    localStorage.setItem("cart", JSON.stringify(tempCart));
    calculateTotalCart();
}

// ca marche mais c'est un peu naze surtout le if a la fin:

function calculateTotalCart(){
    let cart = JSON.parse(localStorage.getItem("cart"));
    let cartTotalPrice = 0;
    let cartTotalQty = 0;
    for (let item in cart){
        fetchOneProduct("", cart[item].id)
        .then (function(leProduct){
            cartTotalQty = cartTotalQty + parseFloat(cart[item].qty);
            let itemTotalPrice = cart[item].qty * leProduct.price
            cartTotalPrice = cartTotalPrice + itemTotalPrice
            if (cart.indexOf(cart[item]) == cart.length - 1){
                document.getElementById('totalQuantity').innerText=cartTotalQty
                document.getElementById('totalPrice').innerText=cartTotalPrice
            }
        })
    }
}

