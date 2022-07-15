// FETCH OR GET ???


function getProductId(){
    let params = (new URL(document.location)).searchParams;
    return params.get('id');
}

const productId = getProductId();
console.log("productId: "+productId);
displayLeProduct();

var productColorAvailable = []

async function fetchOneProduct(result) {
    result = await fetch(`http://localhost:3000/api/products/${productId}`)
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

        productColorAvailable = leProduct.colors
        console.log(productColorAvailable)
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
        let cartArray = {};
        console.log("creating new cart");
        localStorage.setItem("cart", JSON.stringify(cartArray));
    }
}
cartCreator();

const cartAddButton = document.getElementById("addToCart");
cartAddButton.addEventListener("click", function(){

    let productColor = document.getElementById("colors").value;
    let productQty = parseInt(document.getElementById("quantity").value);
    
    let colorSelectionCheck = productColorAvailable.find(color => color == productColor);
    if (colorSelectionCheck == null){
        console.error("please select correct color")
        return
    }
    if (productQty <= 0) {
        console.error("please add correct quantity value")
        return
    }
    
    let cart = JSON.parse(localStorage.getItem("cart")); 
    console.log(productId)
    console.log(cart[productId])
    
    if (cart[productId]){
        if (cart[productId][productColor]){
            cart[productId][productColor] += productQty;
        }
        else{
            cart[productId][productColor] = productQty;
        }
    }else{
        cart[productId] = { [productColor] : productQty }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("cart:", cart)
})





