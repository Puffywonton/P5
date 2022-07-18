function getOrderId(){
    let params = (new URL(document.location)).searchParams;
    return params.get('orderId');
}

document.getElementById("orderId").innerText = getOrderId();