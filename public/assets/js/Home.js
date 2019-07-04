$(document).ready(fetchData())

function fetchData() {
  setEvents();
  setBestSellers();
  setNewReleases();
}




/*------------------
  EVENTS FUNCTIONS
--------------------*/

/* fetch events from db */
function setEvents(){
  var date = createDateStrForDBRequest(new Date());
  $.ajax({
    url: '/events?fromDate=' + date,
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data.length>0){ setEventsToPage(data) }
      else { setEventsToPage(staticData) }
    }
  });
}

/* create a date string for API request */
function createDateStrForDBRequest(date){
  var year = date.getFullYear().toString();
  var tmpMonth = date.getMonth() + 1; 
  var month = tmpMonth>9 ? tmpMonth.toString() : ('0'+tmpMonth.toString());
  var tmpDay = date.getDate();
  var day = tmpDay>9 ? date.getDate().toString() : ('0'+tmpDay.toString());
  return year+'-'+month+'-'+day;
}

/* set events to carousel */
function setEventsToPage(events) {
  setIndicators(events.length);
  setItems(events);
}

/* set Carousel's Indicators */
function setIndicators(length){
  var ol = document.getElementById('eventsIndicatorsID');
  for(let i=0; i<length; i++){
    var li = document.createElement('li');
    if(i==0){ li.className = "active"; }
    li.setAttribute("data-target", "#carousel1");
    li.setAttribute("data-slide-to", i);
    ol.appendChild(li);
  }
}

/* set Carousel's Items (image, title, description) */
function setItems(events){
  var element = document.getElementById('eventsInnerItemsID');
  for(let i=0; i<events.length; i++){
    var div = document.createElement('div');
    div.classList.toggle('carousel-item');
    if(i==0){ div.classList.toggle('active'); }
    
    var img = document.createElement('img');
    img.setAttribute("src", events[i].image);
    img.className = "carousel__image";
    div.appendChild(img);
    
    var caption = document.createElement('div');
    caption.className = "carousel-caption";
    var h3 = document.createElement('h3');
    h3.textContent = events[i].title;
    caption.appendChild(h3);
    var p = document.createElement('p');
    p.className = "eventDescription";
    p.innerHTML = events[i].description;
    caption.appendChild(p);
    div.appendChild(caption);
    
    var cover = document.createElement('div');
    cover.className = "cover__carousel";
    div.appendChild(cover);
    
    element.appendChild(div);
  }
}




/*------------------
  BOOKS FUNCTIONS
--------------------*/

/* fetch best sellers from db */
function setBestSellers(){
  $.ajax({
    url: '/books?isBestSeller=true',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setBooksToPage(data, 'bestSellers') } }
  });
}

/* fetch new releases from db */
function setNewReleases(){
  $.ajax({
    url: '/books?isNewRelease=true',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setBooksToPage(data, 'newReleases') } }
  });
}

/* set books fetched from db to slider */
function setBooksToPage(books, elementID) {
  var deckBook = document.getElementById(elementID);
  while(deckBook.firstChild){ deckBook.removeChild(deckBook.firstChild) }
  for(let i=0; i<books.length; i++){
    var div = document.createElement('div');
    div.className = "cardBook card-1";
    div.onclick = () => goToBookPage(books[i].isbn, elementID);
    
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
    createGenresList(books[i].isbn, b3);
    genre.appendChild(b3);
    div.appendChild(genre);
    
    deckBook.appendChild(div);
  }
  
}

/* create authors list for book Card */
function createAuthorsList(bookISBN, element){
  $.ajax({
    url: '/books/' + bookISBN + '/authors',
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

/* create genres list for book Card */
function createGenresList(bookISBN, element){
  $.ajax({
    url: '/books/' + bookISBN + '/genres',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ 
        for(let i=0; i<data.length; i++){
          element.textContent = element.textContent + data[i].value;
          if(i<data.length-1){ element.textContent = element.textContent + ", "; }
        }
      }
    }
  });
}

/* redirect to bookX page */
function goToBookPage(newBookISBN, from){
  window.location.href = 'pages/Book.html?isbn='+newBookISBN+'&from='+from;
}




/*--------------------------------------
  IF NO EVENTS, FIXED CAROUSEL CHOICE
---------------------------------------*/
var staticData = [
  {
    "title": "Company Name",
    "image" : "../assets/images/sfondo2.jpg",
    "description" : "Since 2015 we are one of the best physical and online retailers in the field of reading.<br>Come and meet us in our stores in:<br>Milan, Bologna and Turin"  
  },
  {
    "title": "Company Name",
    "image" : "../assets/images/sfondo4.jpg",
    "description" : "Since 2015 we are one of the best physical and online retailers in the field of reading.<br>Come and meet us in our stores in:<br>Milan, Bologna and Turin"  
  },
  {
    "title": "Company Name",
    "image" : "../assets/images/sfondo5.jpg",
    "description" : "Since 2015 we are one of the best physical and online retailers in the field of reading.<br>Come and meet us in our stores in:<br>Milan, Bologna and Turin"  
  }
]