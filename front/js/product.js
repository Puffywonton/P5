
function getProductId(){
    let params = (new URL(document.location)).searchParams;
    //QUESTION POURQUOI NEW ?
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

const cartAddButton = document.getElementById("addToCart");
cartAddButton.addEventListener('click', function(){
    console.log("CLICK CLICK");

    console.log(productId);

    let itemColor = document.getElementById("colors");
    console.log(itemColor.value);

    let itemQty = document.getElementById("quantity");
    console.log(itemQty.value);

    let cartItem = productId + "__" + itemColor.value + "__" + itemQty.value;
    console.log(cartItem);
    
    addToCart(cartItem);
})

function addToCart(itemToAdd) {
    console.log("hello there");
    if (localStorage.getItem("cart") === null) {
        localStorage.setItem("cart", "");
        console.log("adding new cart");
        console.log(localStorage);
    } else {
        console.log("cart array content: " + localStorage.getItem("cart"));
    }
    
    let ogCart = localStorage.getItem("cart");
    let updatedCartItems = ogCart + itemToAdd + " , ";
    localStorage.setItem("cart", updatedCartItems);
    console.log("new cart item should be below as a string");
    console.log(localStorage);
}

// function CLEAR(){
//     localStorage.clear();
// }
// CLEAR();

