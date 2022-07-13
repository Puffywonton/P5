// {"107fb5b75607497b96722bda5b504926":{"Blue":1,"White":1,"Black":1},"415b7cacb65d43b2b5c1ff70f3393ad1":{"Black/Yellow":2,"Black/Red":5}}


var calculateTotalCart = () => {
    let cartTotalPrice = 0;
    let totalQty = 0;
    for (let id in myCart) {
        let productQty = 0;
        let productTotalPrice = 0;
        for (let color in myCart[id].content){
            productQty += parseFloat(myCart[id].content[color])
            productTotalPrice += myCart[id].content[color]*myCart[id].info.price
        }
        totalQty += productQty
        cartTotalPrice += productTotalPrice
    }
    document.getElementById('totalQuantity').innerText=totalQty
    document.getElementById('totalPrice').innerText=cartTotalPrice
}

var myCart = {}
createMyCart();
async function createMyCart() {
    // let myCart = {}
    let cart = JSON.parse(localStorage.getItem("cart"));
    console.log('cart', cart)
    
    for (let itemId in cart){
        await fetchOneProduct("" , itemId)
        .then (leProduct => {
            myCart[itemId] = { 
                info : leProduct,
                content : cart[itemId]
            }
            delete myCart[itemId].info.colors;
            delete myCart[itemId].info._id;
        })
    }
    console.log("mycart", myCart)
    displayCartItems(myCart);
}

async function fetchOneProduct(result , productId) {
    result = await fetch("http://localhost:3000/api/products/"+productId)
    return result.json();
}

async function displayCartItems(cart) {
    for (let itemId in cart){
        for (let color in cart[itemId].content){
            document.getElementById("cart__items").innerHTML += `
            <article class="cart__item" data-id="` + itemId + `" data-color="` + color +`">
                <div class="cart__item__img">
                    <img src="`+ cart[itemId].info.imageUrl +`" alt="`+ cart[itemId].info.altTxt +`">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>`+ cart[itemId].info.name +`</h2>
                        <p>`+ color +`</p>
                        <p>`+ cart[itemId].info.price +` €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="`+cart[itemId].content[color]+`" oninput="updateCart('`+itemId+`','`+color+`')">
                        </div>
                        <div class="cart__item__content__settings__delete">
                        <p onclick="deleteItem('`+itemId+`','`+color+`')" class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
            `
        }
    }
    calculateTotalCart();
}

//QUESTION  delete local ou mycart ??? 

var updateCart = (id,color) => {
    let newQty = document.querySelector("article[data-id="+CSS.escape(id)+"][data-color="+CSS.escape(color)+"] input").value;
    
    myCart[id].content[color] = newQty

    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[id][color] = newQty
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotalCart();
}

var deleteItem = (id,color) => {
    let articleToRemove = document.querySelector("article[data-id="+CSS.escape(id)+"][data-color="+CSS.escape(color)+"]")
    articleToRemove.parentNode.removeChild(articleToRemove)

    delete myCart[id].content[color];
    if (Object.keys(myCart[id].content).length == 0){
        delete myCart[id]
    }

    let cart = JSON.parse(localStorage.getItem("cart"));
    delete cart[id][color];
    if (Object.keys(cart[id]).length == 0){
        delete cart[id]
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotalCart();

}
class checkOutCheker{
    constructor(elementId,regExp,errorElementId){
               this.elementId = elementId;
               this.regExp = regExp;
               this.errorElementId = errorElementId
            
    }
}
const checkoutCheckerList = [
    new checkOutCheker("firstName","^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$","firstNameErrorMsg"),
    new checkOutCheker("lastName","^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$","lastNameErrorMsg"),
    new checkOutCheker("address","^(\d+[a-z]?)+\s+(.+(?=\W))+\s+(.*)","addressErrorMsg"),
    new checkOutCheker("city","^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$","cityErrorMsg"),
    new checkOutCheker("email","^((\w[^\W]+)[\.\-]?){1,}\@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$","emailErrorMsg")
]

 
 
var checkoutCheckerGenerator = (list) => {
    // list.forEach(element => {
    //     let x = new checkOutCheker("hello",'hey',9)
    //     console.log(x.potato)
    //     console.log(Object.keys(element))
    //     console.log(Object.values(element))
    //     console.log(element.value)
    // });
    for (element in list){
        let elementDoc = document.getElementById(list[element].elementId)
        let re = new RegExp(list[element].regExp);
        console.log(elementDoc)
        elementDoc.addEventListener("input", (e) => {
            console.log(e)
            console.log(list[element].errorElementId)
            console.log(e.target.id+"ErrorMsg")
            let errorElement = document.getElementById(e.target.id+"ErrorMsg")
            if (re.test(e.regExp)) {
        
                errorElement.innerText = "yo yo yo"
        
            }else{
                errorElement.innerText = "no no no"
        
            }
        })


        // elementDoc.addEventListener("input",(e) => eventFunction(e.target,list[element].errorElementId,list[element].regExp))
    }
}




var eventFunction = (e,errorElementId,regExp) =>{
    let errorElement = document.getElementById(errorElementId)
    let re = new RegExp(regExp);
    console.log(e.regExp)
    if (re.test(e.regExp)) {

        errorElement.innerText = "yo yo yo"

    }else{
        errorElement.innerText = "no no no"

    }
} 
checkoutCheckerGenerator(checkoutCheckerList)


// async function checkoutCheckerGenerator() {
// console.log(p.replace('dog', 'monkey'));

// const inputFirstName = document.getElementById("firstName").addEventListener("input", function(){
//     console.log("hello")
// })
// const firstNameError = document.getElementById("firstNameErrorMsg")

// const inputLastName = document.getElementById("lastName").addEventListener("input", function(){
//     console.log("hello")
// })
// const lastNameError = document.getElementById("lastNameErrorMsg")

// const inputAddress = document.getElementById("address").addEventListener("input", function(address){
    // if (/^\d+\s[A-z]+\s[A-z]+/.test(address.target.value)) {
    //     addressError.innerText = "Valid Address";
    //     // disableSubmit(false);
    // } else {
    //     addressError.innerText = "Invalid Address please fix";
    //     // disableSubmit(true);
    // }

// })
// const addressError = document.getElementById("addressErrorMsg")


// const cityError = document.getElementById("cityErrorMsg")
// const inputCity = document.getElementById("city").addEventListener("input", function(city){
//     if (/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/.test(city.target.value)) {
//         cityError.innerText = "Valid City";
//         // disableSubmit(false);
//     } else {
//         cityError.innerText = "Invalid City please fix";
//         // disableSubmit(true);
//     }
// })

// //email checker
// const emailError = document.getElementById("emailErrorMsg")
// const inputEmail = document.getElementById("email").addEventListener("input", function(mail){
//     if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail.target.value)) {
//         emailError.innerText = "Valid Email";
//         // disableSubmit(false);
//     } else {
//         emailError.innerText = "Invalid Email please fix";
//         // disableSubmit(true);
//     }
// })


// const orderButton = document.getElementById("order") .addEventListener("click", function(){
//     console.log("hello")
// })


// var emailChecker = () => {
//     ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$
// }
// function getCodeValidation() {
//     return document.getElementById("code-validation");
//   }
  
//   function disableSubmit(disabled) {
//     if (disabled) {
//       document
//         .getElementById("submit-btn")
//         .setAttribute("disabled", true);
//     } else {
//       document
//         .getElementById("submit-btn")
//         .removeAttribute("disabled");
//     }
//   }
  
//   document
//     .getElementById("code")
//     .addEventListener("input", function(e) {
//     if (/^CODE-/.test(e.target.value)) {
//       getCodeValidation().innerText = "Code valide";
//       disableSubmit(false);
//     } else {
//       getCodeValidation().innerText = "Code invalide";
//       disableSubmit(true);
//     }
//   });