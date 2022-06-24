getCartFromStorage();
function getCartFromStorage() {
    let cartString = localStorage.getItem("cart");
    console.log(cartString);
    let cartArray = cartString.split(" , ");
    cartArray.pop();
    console.log(cartArray);
    for (let string in cartArray){
        let cartItemString = cartArray[string];
        let cartItemArray = cartItemString.split("__");
        //product info:
        let productId = cartItemArray[0];
        let productColor = cartItemArray[1];
        let productQty = cartItemArray[2];
        console.log(productId, productColor, productQty);
        displayCartItems(productId, productColor, productQty);
    }

}
async function fetchOneProduct(result , productId) {
    result = await fetch("http://localhost:3000/api/products/"+productId)
    return result.json();
}

// async function displayLeProduct() {
//     await fetchOneProduct()
//     .then (function(leProduct) {
//         console.log(leProduct);
//         addImg(leProduct);
//         addTitleH1(leProduct);
//         addPrice(leProduct);
//         addDescription(leProduct);
//         addColors(leProduct);
//     })
// }

async function displayCartItems(productId, productColor, productQty) {
    await fetchOneProduct("", productId)
    .then (function(leProduct){
        let addArticle = document.createElement("article");
        addArticle.setAttribute("class", "cart__item");
        addArticle.setAttribute("id", productId);
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
        addPprice.textContent = leProduct.price;
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
    })

}