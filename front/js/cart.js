
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
                        <h2>${cart[itemId].info.name}</h2>
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

var updateCart = (id,color) => {
    let newQty = document.querySelector(`article[data-id="${id}"][data-color="${color}"] input`).value;
    
    myCart[id].content[color] = newQty

    let cart = JSON.parse(localStorage.getItem("cart"));
    cart[id][color] = newQty
    localStorage.setItem("cart", JSON.stringify(cart));
    calculateTotalCart();
}

var deleteItem = (id,color) => {
    let articleToRemove = document.querySelector(`article[data-id="${id}"][data-color="${color}"]`)
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

var disableSubmit = (disabled) => {
    if (disabled) {
        document.getElementById("order").setAttribute("disabled", true);
    }else{
        document.getElementById("order").removeAttribute("disabled")
    }
}

const checkoutCheckerList = {
    firstName : "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
    lastName : "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
    address : "^(\\d+[a-z]?)+\\s+(.+(?=\\W))+\\s+(.*)",
    city : "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
    email : `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}`
}

var checkoutCheckerGenerator = () => {
    let cartQuestionsInputs = document.querySelectorAll(".cart__order__form__question input")
    let errors = false
    cartQuestionsInputs.forEach(element => {
        let re = new RegExp(checkoutCheckerList[element.id])
        if (re.test(element.value)){
            document.getElementById(element.id+"ErrorMsg").innerText ="";
        }else{
            document.getElementById(element.id+"ErrorMsg").innerText =element.id + " NOT valid";
            errors = true
        }
    })
    return errors
}


const submitBtn = document.getElementById("order")
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let errors = checkoutCheckerGenerator(checkoutCheckerList)
    if (errors) return 
    let contact = {
        firstName : document.getElementById("firstName").value,
        lastName : document.getElementById("lastName").value,
        address : document.getElementById("address").value,
        city : document.getElementById("city").value,
        email : document.getElementById("email").value
    }

    let products = stringCartIds() 


    let package = {
        contact, products
    }

    sendApi(package)

})

var stringCartIds = () => {
    let products = []
    for (id in myCart){
        products.push(id)
    }
    return products
}

function sendApi(package) {
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(package)
      })
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log("here?",value)
    });
}
