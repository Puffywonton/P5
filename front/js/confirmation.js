// recuper le numero de confirmation dans l'url
function getOrderId(){
    let params = (new URL(document.location)).searchParams;
    return params.get('orderId');
}

// afficher le numero de confirmation
document.getElementById("orderId").innerText = getOrderId();