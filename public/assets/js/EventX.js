$(document).ready(fetchData())

function fetchData() {
  
  var parameters = location.search.substring(1).split('&');
  
  /* currentEventID */
  var idParam0 = parameters[0].split('=');
  var currentEventID = unescape(idParam0[1]);
  
  /* from */
  var idParam1 = parameters[1].split('=');
  var from = unescape(idParam1[1]);
  
  if(from=='monthEvents'){   
    $.ajax({
      url: 'events',//'/monthEvents',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        if(data){ 
          var str = JSON.stringify(data);
          sessionStorage.setItem("eventList", str);
          setPagination(data, currentEventID);
          var orientationInfo = "you have searched <b>&nbsp;Month's events";
          $('#orientationInfoID').append(orientationInfo);
        }
      }
    });
  }
  else if(from.substring(0,12)=='bookEventsId'){
    /* book ID */
    var idParam2 = parameters[2].split("=");
    var bookISBN = unescape(idParam2[1]);    
    $.ajax({
      url: 'bookEvents/' + bookISBN,
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        if(data){ 
          var str = JSON.stringify(data);
          sessionStorage.setItem("eventList", str);
          setPagination(data, currentEventID);
          var orientationInfo = "you have searched events where book &nbsp;<b>\"" + from.substring(13, from.length-1) + "\"</b>&nbsp;is presented";
          $('#orientationInfoID').append(orientationInfo);
        }
      }
    });
  }
  else {
    $.ajax({
      url: 'soonEvents',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        if(data){ 
          var str = JSON.stringify(data);
          sessionStorage.setItem("eventList", str);
          setPagination(data, currentEventID);
          var orientationInfo = "you have searched <b>&nbsp;Soon events";
          $('#orientationInfoID').append(orientationInfo);
        }
      }
    });
  }
  
  setEvent(currentEventID);
  
}


/*-----------------------
  PAGINATION FUNCTIONS
------------------------*/

/* Called when user clicks one of the pagination buttons */
function changePage(dir){
  var str = sessionStorage.getItem('eventList');
  var data = JSON.parse(str);
  var counter = document.getElementById('counter');
  var tabIndex = counter.tabIndex;
  var newIndex = tabIndex + dir;
  
  if(newIndex>=1 && newIndex<=data.length){
    counter.tabIndex = newIndex;
    counter.textContent = " "+newIndex+" / "+data.length; 
    setEvent(data[newIndex-1].id);
    paginationStyle(newIndex, data.length);
  }
}

/* Set pagination data */
function setPagination(data, id){
  var i=0;
  while(data[i].id!=id && i<data.length){ i++ }
  var counter = document.getElementById('counter');
  counter.tabIndex = i+1;
  counter.textContent = " "+(i+1)+" / "+data.length;
  paginationStyle(i+1, data.length);
}

/* Set pagination style on page changing */
function paginationStyle(tabIndex, length){
  var prev5 = document.getElementById('prev5_ID');
  var prev1 = document.getElementById('prev1_ID');
  var next1 = document.getElementById('next1_ID');
  var next5 = document.getElementById('next5_ID');
    
  if(tabIndex==1){ prev1.disabled = true; }
  else { prev1.disabled = false; }
    
  if(tabIndex<=5){ prev5.disabled = true; }
  else { prev5.disabled = false; }
    
  if(tabIndex==length){ next1.disabled = true; }
  else { next1.disabled = false; }
      
  if(tabIndex>length-5){ next5.disabled = true; }
  else { next5.disabled = false; }
}




function setEvent(id){
  $.ajax({
    url: '/event/'+id,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#eventTitleID').empty();
        $('#eventTitleID').append(data.title);
        $('#eventImageID').attr("src", data.image);
        $('#eventDescriptionID').empty();
        $('#eventDescriptionID').append(data.description);
        $('#eventMapID').attr("src", data.mapSrc);
        $('#eventAddressID').empty();
        $('#eventAddressID').append(data.address);
        $('#eventNumberID').empty();
        $('#eventNumberID').append("<b>Number: </b>" + data.phoneNumber);
        $('#eventMailID').empty();
        $('#eventMailID').append("<b>Mail: </b>" + data.mail);
        $('#eventDateID').empty();
        $('#eventDateID').append("<b>Event date: </b>" + createDateString(data.date));
        $('#eventStartID').empty();
        $('#eventStartID').append("<b>Event start: </b>" + data.start);
        $('#eventEndID').empty();
        $('#eventEndID').append("<b>Event finish: </b>" + data.end);
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
  while(deckBook.firstChild){ deckBook.removeChild(deckBook.firstChild) }
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
  while(deckAuthor.firstChild){ deckAuthor.removeChild(deckAuthor.firstChild) }
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