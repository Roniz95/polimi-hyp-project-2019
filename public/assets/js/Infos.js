/*-------------------
  CHOICE FUNCTIONS
---------------------*/

/* Click order infos item */
function selectOrderInfo(){
  if(!document.getElementById('orderButtonID').classList.contains("button_active")){
    document.getElementById('orderButtonID').classList.toggle("button_active");
    document.getElementById('orderContentID').style.display = "block";
    document.getElementById("shippingButtonID").classList.remove("button_active");
    document.getElementById("shippingContentID").style.display = "none";
  }
}

/* Click shipping infos item */
function selectShippingInfo(){
  if(!document.getElementById('shippingButtonID').classList.contains("button_active")){
    document.getElementById('orderButtonID').classList.remove("button_active");
    document.getElementById('orderContentID').style.display = "none";
    document.getElementById("shippingButtonID").classList.toggle("button_active");
    document.getElementById("shippingContentID").style.display = "block";
  }
}