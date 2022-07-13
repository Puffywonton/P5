
function getProductId(){
    let params = (new URL(document.location)).searchParams;
    return params.get('id');
}

const productId = getProductId();
console.log("productId: "+productId);
displayLeProduct();

async function fetchOneProduct(result) {
    result = await fetch("http://localhost:3000/api/products/"+productId)
    return result.json();
}
function displayLeProduct() {
    fetchOneProduct()
    .then (function(leProduct) {
        console.log(leProduct);
        changeTitleHead(leProduct);
        addImg(leProduct);
        addTitleH1(leProduct);
        addPrice(leProduct);
        addDescription(leProduct);
        addColors(leProduct);
    })
}

function changeTitleHead(newTitle) {
    let findTitle = document.querySelector("title");
    findTitle.textContent = newTitle.name + " - Kanap";
    console.log(findTitle);
} 

function addImg(newImg) {
    let imgSelector = document.getElementsByClassName("item__img");
    console.log(imgSelector[0]);
    let imgCreator = document.createElement("img");
    imgCreator.setAttribute("src", newImg.imageUrl);
    imgCreator.setAttribute("alt", newImg.altTxt);
    imgSelector[0].appendChild(imgCreator);
}

function addTitleH1(newTitle) {
    document.getElementById("title").innerText = newTitle.name
}

function addPrice(newPrice) {
    document.getElementById("price").innerText = newPrice.price
}

function addDescription(newDescription) {
    document.getElementById("description").innerText = newDescription.description
}

function addColors(newColors) {
    console.log(newColors.colors)
    for (let color in newColors.colors){
        let addNewColor = document.createElement("option");
        addNewColor.setAttribute("value", newColors.colors[color]);
        addNewColor.innerText= newColors.colors[color];
        document.getElementById("colors").appendChild(addNewColor);
        // document.getElementById("colors").innerHTML = "<option value=\""+newColors.colors[color]+"\">"+newColors.colors[color]+"</option>";
    }
}

function CLEAR(){
    localStorage.clear();
}
// CLEAR();

function cartCreator(){
    if (localStorage.getItem("cart") === null) {
        let cartArray = [];
        console.log("creating new cart");
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }
}
cartCreator();

function cartItemCreator(color, quantity){
    let cartItem = {
        id: productId,
        color: color,
        qty: quantity 
    };
    console.log(cartItem);
    return cartItem;
}

const cartAddButton = document.getElementById("addToCart");
cartAddButton.addEventListener("click", function(){

    let productColor = document.getElementById("colors").value;
    let productQty = parseInt(document.getElementById("quantity").value);
    


    if (isNaN(productQty) || productQty == 0 || productColor == "" ){
        console.error("NO NO NO")
        return
    }

    if (localStorage.getItem("cart") === null) {
        let cartArray = [];
        cartArray.push(cartItemCreator(productColor, productQty)); 
        localStorage.setItem("cart", JSON.stringify(cartArray));
        console.log("creating new cart");
    }else{
        let cart = JSON.parse(localStorage.getItem("cart"));
        let locateItem = cart.find(function(item){
            if (item.id == productId && item.color == productColor){
                //rajouter un if > ou < si il faut virer le updateonscreen
                item.qty = productQty;
                localStorage.setItem("cart", JSON.stringify(cart));
                return item
            }
        })
        if (locateItem == null) {
            console.log("item not in cart");
            cart.push(cartItemCreator(productColor, productQty)); 
            localStorage.setItem("cart", JSON.stringify(cart));
            }
        console.log(localStorage);
        }
    })



function updateOnScreenQty(){
    let productColor = document.getElementById("colors").value;
    let cart = JSON.parse(localStorage.getItem("cart"));
    let findQty = cart.find(item => item.id == productId && item.color == productColor)
    if (findQty == null){
        document.getElementById("quantity").value = 0;
    } else{
        console.log(findQty.qty);
        document.getElementById("quantity").value = findQty.qty;
    }
}

document.getElementById("colors").addEventListener("change", function(){
    updateOnScreenQty()
})

////// otherb ack up here:


const cartAddButton = document.getElementById("addToCart");
cartAddButton.addEventListener("click", function(){
    let isItInCart = false;
    let isItCorrectColor = false;
    
    let productColor = document.getElementById("colors").value;
    let productQty = parseInt(document.getElementById("quantity").value);
    let colorSelectionCheck = productColorAvailable.find(color => color == productColor);
    console.log(colorSelectionCheck)
    if (colorSelectionCheck == null){
        console.error("please select correct color")
        return
    }
    if (productQty <= 0) {
        console.error("please add correct quantity value")
        return
    }
    
    let cart = JSON.parse(localStorage.getItem("cart"));
    
    if (cart.length == 0){
        console.log("no items in the cart yet")
        let newVariation = {
            [productColor] : productQty
        }
        cart[productId] = newVariation;
        localStorage.setItem("cart", JSON.stringify(cart)); 
    }else{
        for (item in cart){
            console.log('test')
            console.log(item)
            console.log(productId)
            console.log("lala", cart[item])
            console.log(item == productId, 'true?')
            if (item == productId){
                isItInCart = true;
                for (color in cart[item]){
                    console.log("color", color)
                    if (color == productColor){
                        console.log("PRODUCT IN CART")

                        console.log("ici")
                        console.log(cart[item])
                        let newQty = (cart[item][color] + productQty);
                        console.log("newQty", newQty)
                        cart[item][color] = newQty;
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }else{
                        console.log("NO COLOR IN CART")

                        cart[item][productColor] = productQty;
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                }
            }    
        }
        if (isItInCart == false){
            console.log("item not in cart")
            let newVariation = {
                [productColor] : productQty
            }
            cart[productId] = newVariation;
            localStorage.setItem("cart", JSON.stringify(cart));            
        }
    }
    console.log(cart,"cart")
})