function selectOrderInfo(){
  document.getElementById('orderButtonID').classList.toggle("button_active");
  document.getElementById('orderContentID').style.display = "block";
  document.getElementById("shippingButtonID").classList.remove("button_active");
  document.getElementById("shippingContentID").style.display = "none";
}

function selectShippingInfo(){
  document.getElementById('orderButtonID').classList.remove("button_active");
  document.getElementById('orderContentID').style.display = "none";
  document.getElementById("shippingButtonID").classList.toggle("button_active");
  document.getElementById("shippingContentID").style.display = "block";
}