$(document).ready(fetchData())

function fetchData() {
  
  var parameters = location.search.substring(1).split('&');
  
  /* currentEventID */
  var idParam0 = parameters[0].split('=');
  var currentEventID = unescape(idParam0[1]);
  
  /* from */
  var idParam1 = parameters[1].split('=');
  var from = unescape(idParam1[1]);
  
  var today = new Date();
  
  if(from=='monthEvents'){   
    var thisMonth = today.getMonth()+1;
    var thisMonthStr = thisMonth>9 ? thisMonth.toString() : ('0'+thisMonth.toString());
    var firstMonthDayDate = new Date(today.getFullYear().toString()+'-'+thisMonthStr+'-01'); 
    var lastMonthDayDate = new Date(); 
    if(thisMonth===11 || thisMonth===4 || thisMonth===6 || thisMonth===9 ){ lastMonthDayDate.setDate(firstMonthDayDate.getDate() + 29); }
    else if(thisMonth===2){ lastMonthDayDate.setDate(firstMonthDayDate.getDate() + 27); }
    else{ lastMonthDayDate.setDate(firstMonthDayDate.getDate() + 30); }
    var fromDate1 = createDateStrForDBRequest(firstMonthDayDate);
    var toDate1 = createDateStrForDBRequest(lastMonthDayDate);
    $.ajax({
      url: '/events',
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
      url: '/books/' + bookISBN + '/events',
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
    var twoWeeksLater = new Date();
    twoWeeksLater.setDate(today.getDate() + 15);
    var fromDate = createDateStrForDBRequest(today);
    var toDate = createDateStrForDBRequest(twoWeeksLater);
    $.ajax({
      url: '/events?fromDate=' + fromDate + '&toDate=' + toDate,
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

/* create a date string for API request */
function createDateStrForDBRequest(date){
  var year = date.getFullYear().toString();
  var tmpMonth = date.getMonth() + 1; 
  var month = tmpMonth>9 ? tmpMonth.toString() : ('0'+tmpMonth.toString());
  var tmpDay = date.getDate();
  var day = tmpDay>9 ? date.getDate().toString() : ('0'+tmpDay.toString());
  return year+'-'+month+'-'+day;
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




/*------------------------
  CURRENT EVENT FUNCTIONS
--------------------------*/

/* Set current event data */
function setEvent(id){
  $.ajax({
    url: '/events/'+id,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#eventTitleID').empty();
        $('#eventTitleID').append(data[0].title);
        $('#eventImageID').attr("src", data[0].image);
        $('#eventDescriptionID').empty();
        $('#eventDescriptionID').append(data[0].description);
        clamping();
        $('#eventMapID').attr("src", data[0].mapSrc);
        $('#eventAddressID').empty();
        $('#eventAddressID').append(data[0].address);
        $('#eventNumberID').empty();
        $('#eventNumberID').append("<b>Number: </b>" + data[0].phoneNumber);
        $('#eventMailID').empty();
        $('#eventMailID').append("<b>Mail: </b>" + data[0].mail);
        $('#eventDateID').empty();
        $('#eventDateID').append("<b>Event date: </b>" + createDateString(data[0].date));
        $('#eventStartID').empty();
        $('#eventStartID').append("<b>Event start: </b>" + data[0].start);
        $('#eventEndID').empty();
        $('#eventEndID').append("<b>Event finish: </b>" + data[0].end);
        fetchEventBooks(id, data[0].title);
        fetchEventAuthors(id, data[0].title);
      }
    }
  });
}

/* Check if clamp is need or not */
function clamping(){
  var descriptionDiv = document.getElementById('eventDescriptionDivID');
  var oldNode = document.getElementById('readMoreLessDivID');
  if(oldNode) { descriptionDiv.removeChild(oldNode); }
  
  $('#eventDescriptionID').css('height', 'auto');
  $('#eventDescriptionID').removeClass('clampDescription');
  
  
  var strLH = $('#eventDescriptionID').css('line-height');
  var strH = $('#eventDescriptionID').css('height');
  var lh = parseFloat(strLH.substring(0,strLH.length-2));
  var h = parseFloat(strH.substring(0,strH.length-2));
  
  if(h / lh > 10){ 
    var div = document.createElement('div');
    div.className = "readMoreLessDiv";
    div.id = "readMoreLessDivID";
    var p = document.createElement('p');
    p.id = "readMoreLessID";
    p.className = "readMoreLess";
    p.innerHTML = 'Read More &raquo;'; 
    p.onclick = () => readMoreLess();
    div.appendChild(p);
    descriptionDiv.appendChild(div);
    clampDescription();
  }
}

/* If Read More-->Read Less and vice versa */
function readMoreLess(){
  if($('#eventDescriptionID').hasClass('clampDescription')){ unClampDescription() }
  else { clampDescription() }
}

/* Clamp text */
function clampDescription(){
  var str = $('#eventDescriptionID').css('line-height');
  var lh = parseFloat(str.substring(0,str.length-2));
  var h = lh * 10;
  var s = h + 'px';
  $('#readMoreLessID').html('Read More &raquo;');
  $('#eventDescriptionID').css('height', s);
  $('#eventDescriptionID').addClass('clampDescription');
}

/* Unclamp text */
function unClampDescription(){
  $('#readMoreLessID').html('&laquo; Read Less');
  $('#eventDescriptionID').css('height', 'auto');
  $('#eventDescriptionID').removeClass('clampDescription');
}

/* From date in form "MM-DD-YYYY" return date in form "DD MonthName YYYY" */
function createDateString(data){
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = new Date(data);
  var day = date.getDate();
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  return day + ' ' + month + ' ' + year;
}

/* Fetch all books of an event */
function fetchEventBooks(eventID, eventTitle){
  $.ajax({
    url: '/events/' + eventID + '/books',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data.length>0){ 
        document.getElementById('eventBooksTitle').style.display = "block";
        document.getElementById('eventBooks').style.display = "flex";
        SetBooks(data, 'eventBooks', eventID, eventTitle); 
      }
      else{
        document.getElementById('eventBooksTitle').style.display = "none";
        document.getElementById('eventBooks').style.display = "none";
      }
    }
  });
}

/* Set results to page */
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
    createGenresList(books[i].isbn, b3);
    genre.appendChild(b3);
    div.appendChild(genre);
    
    deckBook.appendChild(div);
  }
  
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

/* Redirect to book page */
function goToBook(newBookISBN, eventID, eventTitle){
  window.location.href = 'Book.html?isbn='+ newBookISBN + '&from=eventBooks(' + eventTitle + ')&searchID=' + eventID;
}

/* Fetch all authors of an event */
function fetchEventAuthors(eventID, eventTitle){
  $.ajax({
    url: '/events/' + eventID + '/authors',
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data.length>0){ 
        document.getElementById('eventAuthorsTitle').style.display = "block";
        document.getElementById('eventAuthors').style.display = "flex";
        SetAuthors(data, 'eventAuthors', eventID, eventTitle); 
      }
      else{
        document.getElementById('eventAuthorsTitle').style.display = "none";
        document.getElementById('eventAuthors').style.display = "none";
      }
    }
  });
}

/* Set results to page */
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

/* Redirect to author page */
function goToAuthor(newAuthorID, eventID, eventTitle){
  window.location.href = 'Author.html?id=' + newAuthorID + '&from=eventAuthors(' + eventTitle + ')&searchID=' + eventID; 
}