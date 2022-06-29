
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

async function displayLeProduct() {
    await fetchOneProduct()
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

function cartItemCreator(color, quantity){
    let cartItem = {
        id: productId,
    };
    cartItem[color] = quantity;
    return cartItem;
}

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
                for (let key in Object.keys(cart[item])) {
                    
                    if (Object.keys(cart[item])[key] == productColor) {
                        cart.splice(item);
                        cart.push(cartItemCreator(productColor, productQty));
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                }
            }
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


