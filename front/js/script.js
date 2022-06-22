
displayAllProducts();

async function fetchProducts(result) {
    result = await fetch("http://localhost:3000/api/products")
    return result.json();
}

async function displayAllProducts() {
    await fetchProducts()
    .then (function(products){
        console.log(products);
        for (let product in products){
            productCardCreator(product, products)
        }
    })
}



function productCardCreator(product, products) {
    let linkBoxCreator = document.createElement("a");
    let selector = products[product]
    let productID = selector._id;
    linkBoxCreator.setAttribute("id", productID)
    linkBoxCreator.setAttribute("href", "./product.html?id="+productID)
    document.getElementById("items").appendChild(linkBoxCreator)
    
    let articleCreator = document.createElement("article");
    document.getElementById(productID).appendChild(articleCreator)
    
    let imageCreator = document.createElement("img");
    imageCreator.setAttribute("src", selector.imageUrl);
    imageCreator.setAttribute("alt", selector.altTxt+", "+selector.name);
    articleCreator.appendChild(imageCreator);

    let h3Creator = document.createElement("h3");
    h3Creator.setAttribute("class", "productName");
    h3Creator.textContent = selector.name;
    articleCreator.appendChild(h3Creator);

    let pCreator = document.createElement("p");
    pCreator.setAttribute("class", "productDescription");
    pCreator.textContent = selector.description;
    articleCreator.appendChild(pCreator);
}



