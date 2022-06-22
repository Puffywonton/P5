
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
    })
}

function changeTitleHead(newTitle) {
    let findTitle = document.querySelector("title");
    findTitle.textContent = newTitle.name
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
// let linkBoxCreator = document.createElement("a");
//     let selector = products[product]
//     let productID = selector._id;
//     linkBoxCreator.setAttribute("id", productID)
//     linkBoxCreator.setAttribute("href", "./product.html?id="+productID)
//     document.getElementById("items").appendChild(linkBoxCreator)
    
//     let articleCreator = document.createElement("article");
//     document.getElementById(productID).appendChild(articleCreator)
    
//     let imageCreator = document.createElement("img");
//     imageCreator.setAttribute("src", selector.imageUrl);
//     imageCreator.setAttribute("alt", selector.altTxt+", "+selector.name);
//     articleCreator.appendChild(imageCreator);

//     let h3Creator = document.createElement("h3");
//     h3Creator.setAttribute("class", "productName");
//     h3Creator.textContent = selector.name;
//     articleCreator.appendChild(h3Creator);

//     let pCreator = document.createElement("p");
//     pCreator.setAttribute("class", "productDescription");
//     pCreator.textContent = selector.description;
//     articleCreator.appendChild(pCreator);