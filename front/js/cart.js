// ajouter un truc pour regrouper les items par ids
// ajouter un truc pour verifier si le cart est correct ??


async function createMyCart() {
    let myCart = []
    let cart = JSON.parse(localStorage.getItem("cart"));
    for (let item in cart){
        await fetchOneProduct("" , cart[item].id)
        .then (leProduct => {
        myCart.push(leProduct)
        delete myCart[item].colors;
        myCart[item].color = cart[item].color
        myCart[item].qty = cart[item].qty
        })
    }
    return myCart;
}

displayCartItems()
async function displayCartItems() {
    let cart = await createMyCart();
    console.log("🚀 ~ file: cart.js ~ line 22 ~ displayCartItems ~ cart", cart)
    for (let item in cart){
        console.log("displaying:", cart[item].name, cart[item].color);
        
        let addArticle = document.createElement("article");
        addArticle.setAttribute("class", "cart__item");
        addArticle.setAttribute("data-id", cart[item]._id);
        addArticle.setAttribute("data-color", cart[item].color);

        let addDivImg = document.createElement("div");
        addDivImg.setAttribute("class", "cart__item__img");
        let addImg = document.createElement("img");
        addImg.setAttribute("src", cart[item].imageUrl);
        addImg.setAttribute("alt", cart[item].altTxt);
        addDivImg.appendChild(addImg);
        addArticle.appendChild(addDivImg);

        let addDivContent = document.createElement("div");
        addDivContent.setAttribute("class", "cart__item__content");
        let addDivContentDescription = document.createElement("div");
        addDivContentDescription.setAttribute("class", "cart__item__content__description");
        let addH2 = document.createElement("h2");
        addH2.textContent = cart[item].name;
        addDivContentDescription.appendChild(addH2);
        let addPcolor = document.createElement("p");
        addPcolor.textContent = cart[item].color;
        addDivContentDescription.appendChild(addPcolor);
        let addPprice = document.createElement("p");
        addPprice.textContent = cart[item].price + "€";
        addDivContentDescription.appendChild(addPprice);

        addDivContent.appendChild(addDivContentDescription);
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
        addInputQty.setAttribute("value", cart[item].qty);

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
        let modifiedQty = document.querySelector("article[data-id="+CSS.escape(cart[item]._id)+"][data-color="+CSS.escape(cart[item].color)+"] input");
        modifiedQty.addEventListener("input", function(){
            console.log("update article qty to:", modifiedQty.value);
            cart[item].qty = parseInt(modifiedQty.value);
            updateMyCartToLocal(cart);
            calculateTotalCart(cart);
        })

        //listen to delete:
        document.querySelector("article[data-id="+CSS.escape(cart[item]._id)+"][data-color="+CSS.escape(cart[item].color)+"] p.deleteItem").addEventListener("click", function(){
            console.log("delete color:", cart[item].color,"of product:", cart[item]._id);
            let itemInHtml = document.querySelector("article[data-id="+CSS.escape(cart[item]._id)+"][data-color="+CSS.escape(cart[item].color)+"]");
            itemInHtml.parentNode.removeChild(itemInHtml);
            cart.splice(item, 1);
            updateMyCartToLocal(cart);
            calculateTotalCart(cart);
        })

    }
    calculateTotalCart(cart);
}
async function fetchOneProduct(result , productId) {
    result = await fetch("http://localhost:3000/api/products/"+productId)
    return result.json();
}

var updateMyCartToLocal = (cart) => {
    let tempCart = []
    for (let item in cart) {
        let cartItem = {
            id: "",
            color: "",
            qty: 0,
        }
        cartItem.id = cart[item]._id
        cartItem.color = cart[item].color
        cartItem.qty = cart[item].qty
        tempCart.push(cartItem)
    }
    localStorage.setItem("cart", JSON.stringify(tempCart))
}
var calculateTotalCart = (cart) => {
    let cartTotalPrice = 0;
    let cartTotalQty = 0;
    for (let item in cart) {
        let itemTotalPrice = cart[item].qty * cart[item].price;
        cartTotalPrice = cartTotalPrice + itemTotalPrice;
        cartTotalQty = cartTotalQty + parseFloat(cart[item].qty);  
    }
    document.getElementById('totalQuantity').innerText=cartTotalQty
    document.getElementById('totalPrice').innerText=cartTotalPrice
}

