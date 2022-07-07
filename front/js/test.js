

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

