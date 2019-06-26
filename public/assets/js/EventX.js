$(document).ready(fetchData())

function fetchData() {
  
  var parameters = location.search.substring(1).split('&');
  
  /* currentEventID */
  var idParam0 = parameters[0].split('=');
  var currentEventID = unescape(idParam0[1]);
  
  /* from */
  var idParam1 = parameters[1].split('=');
  var from = unescape(idParam1[1]);
  
  setEvent(currentEventID);
  
}

function setEvent(id){
  $.ajax({
    url: '/event/'+id,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#eventTitleID').append(data.title);
        $('#eventImageID').attr("src", data.image);
        $('#eventDescriptionID').append(data.description);
        $('#eventMapID').attr("src", data.mapSrc);
        $('#eventAddressID').append(data.address);
        $('#eventNumberID').append(data.phoneNumber);
        $('#eventMailID').append(data.mail);
        $('#eventDateID').append(createDateString(data.date));
        $('#eventStartID').append(data.start);
        $('#eventEndID').append(data.end);
        fetchEventBooks(id, data.title);
        fetchEventAuthors(id, data.title);
      }
    }
  });
}

function createDateString(data){
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = new Date(data);
  var day = date.getDate();
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  return day + ' ' + month + ' ' + year;
}




function fetchEventBooks(eventID, eventTitle){
  $.ajax({
    url: '/booksEvent/' + eventID,
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ SetBooks(data, 'eventBooks', eventID, eventTitle); } }
  });
}

function SetBooks(books, elementID, eventID, eventTitle) {
  var deckBook = document.getElementById(elementID);
  for(let i=0; i<books.length; i++){
    var div = document.createElement('div');
    div.className = "cardBook card-1";
    div.onclick = () => goToBook(books[i].isbn, eventID, eventTitle);
    
    var img = document.createElement('img');
    img.className = 'cardBook__image';
    img.src = books[i].image;
    div.appendChild(img);
    
    var title = document.createElement('div');
    title.className = 'cardBook__link border__bottom';
    var b1 = document.createElement('b');
    var t1 = document.createTextNode(books[i].title);
    b1.append(t1);
    title.appendChild(b1);
    div.appendChild(title);
    
    var author = document.createElement('div');
    author.className = 'cardBook__link border__bottom';
    var b2 = document.createElement('b');
    createAuthorsList(books[i].isbn, b2);
    author.appendChild(b2);
    div.appendChild(author);
    
    var genre = document.createElement('div');
    genre.className = 'cardBook__link';
    var b3 = document.createElement('b');
    var t3 = document.createTextNode(books[i].genre);
    b3.append(t3);
    genre.appendChild(b3);
    div.appendChild(genre);
    
    deckBook.appendChild(div);
  }
  
}

function createAuthorsList(bookISBN, element){
  $.ajax({
    url: '/bookAuthors/' + bookISBN,
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ 
        for(let i=0; i<data.length; i++){
          element.textContent = element.textContent + data[i].name;
          if(i<data.length-1){ element.textContent = element.textContent + ", "; }
        }
      }
    }
  });
}

function goToBook(newBookISBN, eventID, eventTitle){
  window.location.href = '/bookX/'+ newBookISBN + '/eventBooks(' + eventTitle + ')/' + eventID;
}




function fetchEventAuthors(eventID, eventTitle){
  $.ajax({
    url: '/authorsEvent/' + eventID,
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ SetAuthors(data, 'eventAuthors', eventID, eventTitle); } }
  });
}


function SetAuthors(authors, elementID, eventID, evenTitle) { 
  var deckAuthor = document.getElementById(elementID);
  for(let i=0; i<authors.length; i++){
    var div = document.createElement('div');
    div.className = "cardAuthor card-1";
    div.onclick = () => goToAuthor(authors[i].id, eventID, evenTitle);
    
    var img = document.createElement('img');
    img.className = 'cardAuthor__image';
    img.src = authors[i].image;
    div.appendChild(img);
    
    var name = document.createElement('div');
    name.className = 'cardAuthor__body';
    var b1 = document.createElement('b');
    var t1 = document.createTextNode(authors[i].name);
    b1.append(t1);
    name.appendChild(b1);
    div.appendChild(name);
    
    deckAuthor.appendChild(div);
  }
}

function goToAuthor(newAuthorID, eventID, eventTitle){
  window.location.href = '/authorX/' + newAuthorID + '/eventAuthors(' + eventTitle + ')/' + eventID; 
}