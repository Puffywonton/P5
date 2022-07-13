

var toto = 0;
function newCart() {
    if (localStorage.getItem("cart") === null) {
        let createCart = []
        localStorage.setItem("cart", JSON.stringify(createCart));
        console.log("added a new cart:");
        console.log(localStorage.getItem("cart"));
        toto = 1;
    }else{
        console.log("original cart:");
        console.log(localStorage.getItem("cart"));
    }

}


const cartAddButton = document.getElementById("addToCart");
cartAddButton.addEventListener('click', function(){
    newCart();
    console.log("toto", toto);

    let cart = JSON.parse(localStorage.getItem("cart"));
    let productColor = document.getElementById("colors").value;
    let productQty = document.getElementById("quantity").value;

    let cartItem = {
        id: productId,
    };
    cartItem[productColor] = productQty;


    for (let item in cart){
        console.log("hello");
        console.log(cart[item]);
        if (cart[item].id == itemToAdd.id) {
            console.log(cart[item].color);
            console.log("above");
            if (cart[item].color == itemToAdd.color){
                cart[item].color = itemToAdd.color;
            }else{
                cart.push(itemToAdd);
            }
        }else{
            cart.push(itemToAdd);
        }
    }
    if (toto == 1){
        console.log('toto activated')
        cart.push(itemToAdd);
    }
    console.log("hi");
    console.log(cart);

    localStorage.setItem("cart", JSON.stringify(cart));



    
    // addToCart(cartItem);
    // let cartItemString = JSON.stringify(cartItem);
    // console.log(cartItemString);
    // addToCart(cartItemString);

})



console.log(Object.keys(cart[item])[1]);
                console.log('test')
                let toto = cart.find(function(element){
                    // console.log(Object.keys(toto));
                    console.log('test');
                    return element == productColor;

                })
                console.log(toto);
                console.log("found something");




const cartTEST = [
    {
        id: 123,
        red: 2,
    },
    {
        id: 124,
        blue: 1,
    }
]




function addToCart(itemToAdd) {
    
    let cart = JSON.parse(localStorage.getItem("cart"));
    //checking id:
    for (let item in cart){
        console.log("hello");
        console.log(cart[item];
        if (cart[item].id == itemToAdd.id) {
            console.log(cart[item].color);
            console.log("above");
            if (cart[item].color == itemToAdd.color){
                cart[item].color = itemToAdd.color;
            }else{
                cart.push(itemToAdd);
            }
        }else{
            cart.push(itemToAdd);
        }
    }
    if (toto == 1){
        console.log('toto activated')
        cart.push(itemToAdd);
    }
    console.log("hi");
    console.log(cart);

    localStorage.setItem("cart", JSON.stringify(cart));
    

    // console.log("CACA");
    // console.log(cart);
    // let test = cart.find(function(product){
    //     return product.id == "107fb5b75607497b96722bda5b504926";
    // })
    // console.log("TEST", test);
    // // let cart = localStorage.getItem("cart");
    
    // push the new product in the local storage:
    // localStorage.setItem("cart", itemToAdd);
    // cart.push(itemToAdd);
    

    // let ogCart = localStorage.getItem("cart");
    // let updatedCartItems = ogCart + itemToAdd + " , ";
    // localStorage.setItem("cart", itemToAdd);
    // localStorage.setItem("cart", updatedCartItems);
    console.log("new cart item should be below as a string");
    console.log(localStorage);
}


/// ANCIEN CODE AVEC 2params:

function CLEAR(){
    localStorage.clear();
}
// CLEAR();

function cartItemCreator(color, quantity){
    let cartItem = {
        id: productId,
    };
    cartItem[color] = quantity;
    return cartItem;
}

var itemAlreadyInCart = 0;

const cartAddButton = document.getElementById("addToCart");
cartAddButton.addEventListener("click", function(){
    
    let productColor = document.getElementById("colors").value;
    let productQty = document.getElementById("quantity").value;

    if (localStorage.getItem("cart") === null) {
        let cartArray = [];
        cartArray.push(cartItemCreator(productColor, productQty)); 
        localStorage.setItem("cart", JSON.stringify(cartArray));
        console.log(localStorage);
    }else{
        let cart = JSON.parse(localStorage.getItem("cart"));
        console.log("what is cart")
        console.log(cart)
        for (let item in cart){
            if (cart[item].id == productId) {
                if (Object.keys(cart[item])[1] == productColor){
                    console.log("DINGDING");
                    console.log(item);
                    cart.splice(item, 1);
                    cart.push(cartItemCreator(productColor, productQty));
                    localStorage.setItem("cart", JSON.stringify(cart));
                    itemAlreadyInCart = 1;
                    console.log("bloup")
                }else{
                    cart.push(cartItemCreator(productColor, productQty));
                    localStorage.setItem("cart", JSON.stringify(cart));
                    itemAlreadyInCart = 1;    
                    console.log("kiki")
                }
            }
        }
        if (itemAlreadyInCart == 0) {
            cart.push(cartItemCreator(productColor, productQty));
            localStorage.setItem("cart", JSON.stringify(cart));
            // itemAlreadyInCart = 0;
            console.log("tutututu")
        }
    }

    //if no cart -> create one and push stuff EASY
    //else there is a cart
        //if id is in the cart
            //if color of that id matches color of product
                //update qty of that color
            //else push stuff EASY
        //else push stuff EASY

})

//// cart backup here:


// ajouter un truc pour regrouper les items par ids
// ajouter un truc pour verifier si le cart est correct ??

// [{"id":"107fb5b75607497b96722bda5b504926","color":"Blue","qty":1},{"id":"415b7cacb65d43b2b5c1ff70f3393ad1","color":"Black/Yellow","qty":1},{"id":"055743915a544fde83cfdfc904935ee7","color":"Green","qty":1},{"id":"a6ec5b49bd164d7fbe10f37b6363f9fb","color":"Pink","qty":1}]
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

async function fetchOneProduct(result , productId) {
    result = await fetch("http://localhost:3000/api/products/"+productId)
    return result.json();
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
            console.log("current item:", item)
            console.log("item to delete id:", cart[item]._id,"name:",cart[item].name)
            let itemInHtml = document.querySelector("article[data-id="+CSS.escape(cart[item]._id)+"][data-color="+CSS.escape(cart[item].color)+"]");
            itemInHtml.parentNode.removeChild(itemInHtml);
            cart.splice(item, 1);
            updateMyCartToLocal(cart);
            calculateTotalCart(cart);
            console.log('cart remaining:', cart)
            console.log("------")
            console.log("cart[item]", cart[item])
            console.log('item', item)
            console.log("------")
            console.log("_____________________________________________________________")
        })

    }
    calculateTotalCart(cart);
}
var listenForDelete = () => {

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

