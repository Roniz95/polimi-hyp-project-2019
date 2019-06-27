var totalCost = 0;

$(document).ready(fetchData());

function fetchData(){
  var cart = sessionStorage.getItem('cart');
  if(cart){
    var bookList = JSON.parse(cart);
    setList(bookList);
  }
  else { alert('null') }
}

function setList(isbnList){
  for(let i=0; i<isbnList.length; i++){ setBook(isbnList[i]) }
}

function setBook(isbn){
  $.ajax({
    url: '/book/'+isbn,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        var list = document.getElementById('listID');
        var totalCostElement = document.getElementById('totalCostID');
        
        var div = document.createElement('div');
        div.className = "row shoppingMenuRow";
        
        var imageDiv = document.createElement('div');
        imageDiv.className = "col-2 bookImage_div";
        var img = document.createElement('img');
        img.className = "bookImage";
        img.src = data.image;
        imageDiv.append(img);
        div.appendChild(imageDiv);
        
        var infoDiv = document.createElement('div');
        infoDiv.className = "col-8 bookInfos";
        var ul = document.createElement('ul');
        var titleLi = document.createElement('li');
        titleLi.innerHTML = "<b>Title:</b> "+data.title;
        ul.appendChild(titleLi);
        var authorsLi = document.createElement('li');
        authorsLi.innerHTML = "<b>Auhors:</b> "+ "data.title"; //To add create Authors List
        ul.appendChild(authorsLi);
        var publishingLi = document.createElement('li');
        publishingLi.innerHTML = "<b>Publishing House:</b> "+data.publishingHouse;
        ul.appendChild(publishingLi);
        var isbnLi = document.createElement('li');
        isbnLi.innerHTML = "<b>ISBN:</b> "+ data.isbn;
        ul.appendChild(isbnLi);
        var priceLi = document.createElement('li');
        priceLi.innerHTML = "<b>Price:</b> "+ data.price.toFixed(2) + ' €';
        ul.appendChild(priceLi);
        infoDiv.append(ul);
        div.appendChild(infoDiv);
        
        var priceDiv = document.createElement('div');
        priceDiv.className = "col-2 bookPrice";
        var innerDiv = document.createElement('div');
        innerDiv.className = "lastColumn";
        
        var price = document.createElement('b');
        price.textContent = data.price.toFixed(2) + " €";
        innerDiv.appendChild(price);
        
        var incrementDiv = document.createElement('div');
        incrementDiv.className = "row justify-content-center incrementDiv";
        
        var value = document.createElement('p');
        value.className = "col-6 multiplier";
        value.textContent = "1";
        
        var buttonL = document.createElement('button');
        buttonL.className = "col-3 multiplierButtonL";
        buttonL.setAttribute('type', 'button');
        buttonL.onclick = () => removeQty(value, data.price.toFixed(2), price, totalCostElement);
        buttonL.textContent = "-";
        incrementDiv.appendChild(buttonL);
        incrementDiv.appendChild(value);
        var buttonR = document.createElement('button');
        buttonR.className = "col-3 multiplierButtonR";
        buttonR.setAttribute('type', 'button');
        buttonR.onclick = () => addQty(value, parseFloat(data.price), price, totalCostElement);
        buttonR.textContent = "+";
        incrementDiv.appendChild(buttonR);
        innerDiv.appendChild(incrementDiv);
        var removeButton = document.createElement('button');
        removeButton.className = "removeButton";
        removeButton.setAttribute('type', 'button');
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeBook(data, value, div, totalCostElement);
        innerDiv.appendChild(removeButton);
        priceDiv.append(innerDiv);
        div.appendChild(priceDiv);
        
        list.appendChild(div);
        totalCost += data.price;
        totalCostElement.textContent = totalCost.toFixed(2) + " €";
      }
    }
  });
}

function removeBook(book, elementValue, element, totalCostElement){
  var strQtyValue = elementValue.textContent;
  var qty = parseInt(strQtyValue);
  var c = parseFloat(book.price) * qty;
  totalCost = totalCost - (book.price * qty);
  totalCostElement.textContent = totalCost.toFixed(2) + " €";
  var cart = JSON.parse(sessionStorage.getItem('cart'));
  var index = cart.indexOf(book.isbn);
  cart.splice(index, 1);
  sessionStorage.setItem('cart', JSON.stringify(cart));
  element.parentNode.removeChild(element);
}

function addQty(element, bookPrice, priceElement, totalCostElement){
  var priceBooks = parseFloat(priceElement.textContent);
  var strQtyValue = element.textContent;
  var qty = parseInt(strQtyValue);
  element.textContent = qty+1;
  var newPrice = priceBooks + bookPrice;
  priceElement.textContent = newPrice.toFixed(2) + ' €';
  totalCost += bookPrice; 
  totalCostElement.textContent = totalCost.toFixed(2) + ' €';
}

function removeQty(element, bookPrice, priceElement, totalCostElement){
  var priceBooks = parseFloat(priceElement.textContent);
  var strQtyValue = element.textContent;
  var qty = parseInt(strQtyValue);
  if(qty>1) { 
    element.textContent = qty-1;
    var newPrice = priceBooks - bookPrice;
    priceElement.textContent = newPrice.toFixed(2) + ' €';
    totalCost -= bookPrice; 
    totalCostElement.textContent = totalCost.toFixed(2) + ' €';
  }
}