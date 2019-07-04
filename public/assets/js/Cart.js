var totalCost = 0;

$(document).ready(fetchData());

function fetchData(){
  $.ajax({
      url: '/cart/books',
      type: 'GET',
      dataType: 'json',
      success: (data) => { setList(data); }
    });
}




/*-------------------
  BOOKS FUNCTIONS
---------------------*/

/* set books list to page */
function setList(booksList){
  for(let i=0; i<booksList.length; i++){ setBook(booksList[i]) }
}

/* set book to page */
function setBook(data){
  var list = document.getElementById('listID');
  var totalCostElement = document.getElementById('totalCostID');
        
  var div = document.createElement('div');
  div.className = "row shoppingMenuRow justify-content-center";
        
  var imageDiv = document.createElement('div');
  imageDiv.className = "col-md-3 bookImage_div";
  var img = document.createElement('img');
  img.className = "bookImage";
  img.src = data.image;
  imageDiv.append(img);
  div.appendChild(imageDiv);
        
  var infoDiv = document.createElement('div');
  infoDiv.className = "col-md-7 bookInfos";
  var ul = document.createElement('ul');
  var titleLi = document.createElement('li');
  titleLi.innerHTML = "<b>Title:</b> "+data.title;
  ul.appendChild(titleLi);
  var authorsLi = document.createElement('li');
  authorsLi.innerHTML = "<b>Auhors: </b>";
  createAuthorsList(data.isbn, authorsLi)
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
  priceDiv.className = "col-md-2 bookPrice";
  var innerDiv = document.createElement('div');
  innerDiv.className = "lastColumn";
        
  var price = document.createElement('b');
  price.textContent = (data.price*data.quantity).toFixed(2) + " €";
  innerDiv.appendChild(price);
        
  var incrementDiv = document.createElement('div');
  incrementDiv.className = "row justify-content-center incrementDiv";
        
  var value = document.createElement('p');
  value.className = "col-6 multiplier";
  value.textContent = data.quantity;
        
  var buttonL = document.createElement('button');
  buttonL.className = "col-3 multiplierButtonL";
  buttonL.setAttribute('type', 'button');
  buttonL.onclick = () => removeQty(value, data.isbn, data.price.toFixed(2), price, totalCostElement);
  buttonL.textContent = "-";
  incrementDiv.appendChild(buttonL);
  incrementDiv.appendChild(value);
  var buttonR = document.createElement('button');
  buttonR.className = "col-3 multiplierButtonR";
  buttonR.setAttribute('type', 'button');
  buttonR.onclick = () => addQty(value, data.isbn, parseFloat(data.price), price, totalCostElement);
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
  totalCost += (data.price*data.quantity);
  totalCostElement.textContent = totalCost.toFixed(2) + " €";
}

/* Set author names list to the books card */
function createAuthorsList(bookISBN, element){
  $.ajax({
    url: '/books/' + bookISBN + '/authors',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ 
        for(let i=0; i<data.length; i++){
          element.innerHTML = element.innerHTML + data[i].name;
          if(i<data.length-1){ element.innerHTML = element.innerHTML + ", "; }
        }
      }
    }
  });
}

/* remove book from cart */
function removeBook(book, elementValue, element, totalCostElement){
  $.ajax({
      url: '/cart/delete/' + book.isbn + '/all',
      type: 'POST',
      dataType: 'json'
  }).catch(
    () => {
      var strQtyValue = elementValue.textContent;
      var qty = parseInt(strQtyValue);
      var c = parseFloat(book.price) * qty;
      totalCost = totalCost - (book.price * qty);
      totalCostElement.textContent = totalCost.toFixed(2) + " €";
      element.parentNode.removeChild(element);
    }
  )
}

/* +1 book quantity */
function addQty(element, isbn, bookPrice, priceElement, totalCostElement){
  $.ajax({
      url: '/cart/add/' + isbn,
      type: 'POST',
      dataType: 'json'
  })
  .catch(
    () => {
      var priceBooks = parseFloat(priceElement.textContent);
      var strQtyValue = element.textContent;
      var qty = parseInt(strQtyValue);
      element.textContent = qty+1;
      var newPrice = priceBooks + bookPrice;
      priceElement.textContent = newPrice.toFixed(2) + ' €';
      totalCost += bookPrice; 
      totalCostElement.textContent = totalCost.toFixed(2) + ' €';
    }
  )
}

/* -1 book quantity */
function removeQty(element, isbn, bookPrice, priceElement, totalCostElement){
  var strQtyValue = element.textContent;
  var qty = parseInt(strQtyValue);
  if(qty>1) {
    $.ajax({
      url: '/cart/delete/' + isbn,
      type: 'POST',
      dataType: 'json'
    }).catch(
      () => {
        var priceBooks = parseFloat(priceElement.textContent);
        var strQtyValue = element.textContent;
        var qty = parseInt(strQtyValue);
        element.textContent = qty-1;
        var newPrice = priceBooks - bookPrice;
        priceElement.textContent = newPrice.toFixed(2) + ' €';
        totalCost -= bookPrice; 
        totalCostElement.textContent = totalCost.toFixed(2) + ' €';
      }
    )
  }
}