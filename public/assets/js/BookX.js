$(document).ready(fetchData())

//TO BE MODIFIED when events will be added
function fetchData() {
  var parameters = location.search.substring(1).split('&');
  
  /* currentBookID */
  var idParam0 = parameters[0].split('=');
  var currentBookISBN = unescape(idParam0[1]);
  
  /* from */
  var idParam1 = parameters[1].split('=');
  var from = unescape(idParam1[1]);
  
  /* other url parameters */
  if(parameters.length>2){
    if(from.substring(0,12)=='similarBooks'){
      
      /* old book ID */
      var idParam2 = parameters[2].split("=");
      var oldBookID = unescape(idParam2[1]);
      
      $.ajax({
        url: '/bookSimilar/'+oldBookID,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){ 
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched books similar to <b>&nbsp;\"" + from.substring(16, from.length-1) + "&nbsp;\"</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
      
    }
    else if(from.substring(0,11)=='authorBooks'){
      /* author ID */
      var idParam2 = parameters[2].split("=");
      var authID = unescape(idParam2[1]);
      $.ajax({
        url: '/authorBooks/'+authID,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched <b>&nbsp;" + from.substring(16, from.length-1) + "</b>'s books";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
    }
    else if(from.substring(0,10)=='eventBooks'){
      /* event ID */
      var idParam2 = parameters[2].split("=");
      var eventID = unescape(idParam2[1]);
      $.ajax({
        url: '/booksEvent/'+eventID,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched books at event <b>&nbsp;" + from.substring(11, from.length-1) + "</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
    }
    else if(from=='searchFromTitle'){
      var idParam2 = parameters[2].split("=");
      var title = unescape(idParam2[1]);
      $.ajax({
        url: '/searchBooksFromTitle/'+title,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched books whose title contains <b>&nbsp;\"" + title + "\"</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
    }
    else if(from=='searchFromFilters'){
      var idParam2 = parameters[2].split("=");
      var genre = unescape(idParam2[1]);
      var idParam3 = parameters[3].split("=");
      var author = unescape(idParam3[1]);
      var idParam4 = parameters[4].split("=");
      var theme = unescape(idParam4[1]);
      var idParam5 = parameters[5].split("=");
      var bs = unescape(idParam5[1]);
      var idParam6 = parameters[6].split("=");
      var nc = unescape(idParam6[1]);
      
      $.ajax({
        url: '/searchBooksFromFilters/'+genre+'/'+theme+'/'+author+'/'+bs+'/'+nc,
        type: 'GET',
        dataType: 'json',
        success: (data) => { 
          if(data){ 
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have performed advanced search ( " + createFiltersString(genre, theme, author, bs, nc) + " )";
            $('#orientationInfoID').append(orientationInfo);
          } 
        }
      });
    }
  }
  else if(from=='recommendedBooks'){
      $.ajax({
        url: '/ourRecommendations',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched &nbsp;<b>Our recommendations</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
  }
  else if(from=='topSellersBooks'){
      $.ajax({
        url: '/bestSellers',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched &nbsp;<b>Best Sellers</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
  }
  else if(from=='classicBooks'){
      $.ajax({
        url: '/classics',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched &nbsp;<b>Classics</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
  }
  else if(from=='nextComingBooks'){
      $.ajax({
        url: '/newReleases',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookISBN);
            var orientationInfo = "you have searched &nbsp;<b>Next comings</b>";
            $('#orientationInfoID').append(orientationInfo);
          }
        }
      });
  }
  else if(from=='bookOfTheMonth'){
    document.getElementById("paginationID").style.display = "none";
    var orientationInfo = "you have searched &nbsp;<b>Book of the month</b>";
    $('#orientationInfoID').append(orientationInfo);
  }
  
  setBook(currentBookISBN);
  
}




/*-----------------------
  PAGINATION FUNCTIONS
------------------------*/

/* Called when user clicks one of the pagination buttons */
function changePage(dir){
  var str = sessionStorage.getItem('bookList');
  var data = JSON.parse(str);
  var counter = document.getElementById('counter');
  var tabIndex = counter.tabIndex;
  var newIndex = tabIndex + dir;
  
  if(newIndex>=1 && newIndex<=data.length){
    counter.tabIndex = newIndex;
    counter.textContent = " "+newIndex+" / "+data.length; 
    setBook(data[newIndex-1].isbn);
    paginationStyle(newIndex, data.length);
  }
}

/* Set pagination data */
function setPagination(data, isbn){
  //console.log(data, isbn);
  var i=0;
  while(data[i].isbn!=isbn && i<data.length){ i++ }
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




/*-----------------------------
  ORIENTATION INFO FUNCTIONS
------------------------------*/

/* Create string to be displayed in orientation info when redirected from advanced search */
function createFiltersString(genre, theme, author, bestSellers, nextComings){
  var str = "";
  if(genre!="null"){ str+= ('&nbsp;genre:<b>&nbsp;' + genre + '</b>&nbsp;') }
  if(theme!="null"){ str+= ('&nbsp;theme:<b>&nbsp;' + theme + '</b>&nbsp;') }
  if(author!="null"){ str+= ('&nbsp;author:<b>&nbsp;' + author + '</b>&nbsp;') }
  if(bestSellers!="0"){ str+= ('&nbsp;<b>Best Sellers</b>&nbsp;') }
  if(nextComings!="0"){ str+= ('&nbsp;<b>Next Comings</b>&nbsp;') }
  return str;
}




/*------------------------
  CURRENT BOOK FUNCTIONS
--------------------------*/

/* Set current book data */
function setBook(isbn){
  $.ajax({
    url: '/book/'+isbn,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#bookTitleID').text(data.title);
        $('#bookImageID').attr("src", data.image);
        $('#bookAuthorsID').empty();
        createAuthorsLink(isbn, data.title);
        $('#bookPublishingHouseID').empty();
        $('#bookPublishingHouseID').append(data.publishingHouse);
        $('#bookGenreID').empty();
        $('#bookGenreID').append(data.genre);
        $('#bookThemesID').empty();
        createThemesString(isbn);
        $('#bookYearID').empty();
        $('#bookYearID').append(createDateStr(new Date(data.publishingDate)));
        $('#bookIsbnID').empty();
        $('#bookIsbnID').append(data.isbn);
        $('#bookPriceID').empty();
        $('#bookPriceID').append(data.price.toFixed(2)+' €');
        $('#bookPlotID').empty();
        $('#bookPlotID').append(data.abstract);
        $('#reviewsId').empty();
        fetchBookReviews(isbn);
        $('#bookInterviewID').empty();
        if(data.authorInterview!=""){ $('#bookInterviewID').append(data.authorInterview); }
        else{ 
          $('#bookInterviewID').append("No interview available");
          $('#bookInterviewID').css('text-align', 'center');
        }
        $('#similarBooks').empty();
        fetchAuthorsBooks(data.isbn);
        fetchSimilarBooks(isbn, data.title);
        fetchBookEvents(isbn, data.title);
      }
    }
  });
}

/* Add to page all links of book's authors */
function createAuthorsLink(bookISBN, bookTitle){
  var td = document.getElementById('bookAuthorsID');
  $.ajax({
    url: '/bookAuthors/' + bookISBN,
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ 
        for(let i=0; i<data.length; i++){
          var a = document.createElement('a');
          a.href = '/authorX/'+ data[i].id + '/book('+ bookTitle +')/' + bookISBN;
          a.className = "box__link";
          a.textContent = data[i].name;
          td.appendChild(a);
          if(i<data.length-1){ td.appendChild(document.createTextNode(',')); }
        }
      }
    }
  });
}

/* From date in form "MM-DD-YYYY" return date in form "DD MonthName YYYY" */
function createDateStr(dateStr){
  var date = new Date(dateStr);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

/* Add to page all book's themes */
function createThemesString(isbn){
  $.ajax({
    url: '/bookThemes/' + isbn,
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ 
        var td = document.getElementById('bookThemesID');
        var str = "";
        for(let i=0; i<data.length; i++){
          str+= data[i].value;
          if(i<data.length-1){ str+=', ' }
        }
        td.append(str)
      }
    }
  });
}

/* Fetch book's review from db */
function fetchBookReviews(isbn){
  $.ajax({
    url: '/bookReviews/'+isbn,
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data.length>0){ setReviews(data) }
      else{ noReview() }
    } 
  });
}

/* Called if book has reviews */
function setReviews(reviews){
  var review = document.getElementById('reviewsId');
  var h1 = document.createElement('h1');
  h1.textContent = "REVIEWS";
  review.appendChild(h1);
  for(let i=0; i<reviews.length; i++){
    var div = document.createElement('div');
    div.className = "review";
    var reviewer = document.createElement('div');
    reviewer.className = "reviewer";
    var userImg = document.createElement('img');
    userImg.src = "../assets/images/user.png";
    userImg.className = "img__reviewer";
    reviewer.appendChild(userImg);
    var username = document.createElement('p');
    username.textContent = reviews[i].username;
    reviewer.appendChild(username);
    div.appendChild(reviewer);
    var fixedRate = document.createElement('div');
    fixedRate.className = "fixedRate";
    var j=0;
    while(j<reviews[i].stars){
      var label = document.createElement('label');
      label.className = "voted";
      label.textContent = "★";
      fixedRate.appendChild(label);
      j++
    }
    while(j<5){
      var label = document.createElement('label');
      label.textContent = "★";
      fixedRate.appendChild(label);
      j++;
    }
    var h5 = document.createElement('h5');
    h5.textContent = reviews[i].value;
    fixedRate.appendChild(h5);
    div.appendChild(fixedRate);
    if(reviews[i].comments!=""){
      var comment = document.createElement('p');
      comment.textContent = reviews[i].comment;
      div.appendChild(comment);
    }
    review.appendChild(div);
  }
}

/* Called if book has no reviews */
function noReview(){
  var review = document.getElementById('reviewsId');
  var h1 = document.createElement('h1');
  h1.textContent = "REVIEWS";
  review.appendChild(h1);
  var p = document.createElement('p');
  p.textContent = "No reviews";
  p.className = "noReviews";
  review.appendChild(p);
}

/* Fetch events where the book will be presented (TO DO) */
function fetchBookEvents(isbn, title){
  $.ajax({
    url: '/bookEvents/'+isbn,
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data){ setEvents(data, 'bookEventsId', title, isbn) }
    } 
  });
}

/* Set the events where the book will be presented */
function setEvents(events, elementID, eventTitle, bookISBN){
  var container = document.getElementById(elementID);
  while(container.firstChild){ container.removeChild(container.firstChild) }
  for(let i=0; i<events.length; i++){
    var div = document.createElement('div');
    div.className = "event card-1";
    div.onclick = () => goToEvent(events[i].id, elementID, eventTitle, bookISBN);
    
    var img = document.createElement('img');
    img.className = "event_image";
    img.src = events[i].image;
    div.appendChild(img);
    
    var title = document.createElement('p');
    title.className = "eventBox_borderBottom";
    var title_txt = document.createTextNode(events[i].title);
    title.append(title_txt);
    div.appendChild(title);
    
    var date = document.createElement('p');
    var date_txt = document.createTextNode(events[i].date);
    date.append(date_txt);
    div.appendChild(date);
    container.appendChild(div);
  }
}

/* Redirect to eventX page */
function goToEvent(newEventID, from, eventTitle, bookISBN){
  window.location.href = "/eventX/" + newEventID + '/' + from + '(' + eventTitle + ')/' + bookISBN;
}




/*------------------------
  OTHER BOOKS FUNCTIONS
-------------------------*/

/* Fetch all book's authors from db */
function fetchAuthorsBooks(bookISBN){
  $.ajax({
      url: '/bookAuthors/' + bookISBN,
      type: 'GET',
      dataType: 'json',
      success: (data) => { 
        if(data){
          fetchAuthorBooks(data[0].id, data[0].name)
        }
      }
    });
}

/* Fetch all author's books from db */
function fetchAuthorBooks(authorID, authorName){
  $.ajax({
      url: '/authorBooks/'+authorID,
      type: 'GET',
      dataType: 'json',
      success: (data) => { if(data){ SetBooks(data, 'authorBooks', authorName, authorID) } }
    });
}

/* Fetch all similar books from db */
function fetchSimilarBooks(isbn, title){
  $.ajax({
      url: '/bookSimilar/'+isbn,
      type: 'GET',
      dataType: 'json',
      success: (data) => { if(data){ SetBooks(data, 'similarBooks', title, isbn) } }
    });
}

/* Set the results of the Fetch functions above to page */
function SetBooks(booksIDs, elementID, bookTitle, bookISBN) {
  var deckBook = document.getElementById(elementID);
  while(deckBook.firstChild){ deckBook.removeChild(deckBook.firstChild) }
  for(let i=0; i<booksIDs.length; i++){
    var div = document.createElement('div');
    div.className = "cardBook card-1";
    div.onclick = () => goToBook(booksIDs[i].isbn, elementID, bookTitle, bookISBN);
          
    var img = document.createElement('img');
    img.className = 'cardBook__image';
    img.src = booksIDs[i].image;
    div.appendChild(img);
    
    var title = document.createElement('div');
    title.className = 'cardBook__link border__bottom';
    var b1 = document.createElement('b');
    var t1 = document.createTextNode(booksIDs[i].title);
    b1.append(t1);
    title.appendChild(b1);
    div.appendChild(title);
    
    var author = document.createElement('div');
    author.className = 'cardBook__link border__bottom';
    var b2 = document.createElement('b');
    createAuthorsList(booksIDs[i].isbn, b2);
    author.appendChild(b2);
    div.appendChild(author);
    
    var genre = document.createElement('div');
    genre.className = 'cardBook__link';
    var b3 = document.createElement('b');
    var t3 = document.createTextNode(booksIDs[i].genre);
    b3.append(t3);
    genre.appendChild(b3);
    div.appendChild(genre);
    
    deckBook.appendChild(div);
  } 
}  

/* Set author names list to the books card */
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

/* Redirect to bookX page from one of the 2 sliders */
function goToBook(newBookISBN, from, name, isbn){
  var str = from + "( of "+name+" )";
  window.location.href = '/bookX/'+newBookISBN+'/'+str+'/'+isbn;
}




/*---------------
  CHOICE FUNCTIONS
-----------------*/

/* Called when user clicks Reviews button */
function selectReviews(){
  document.getElementById("reviews_btn").classList.toggle("btn__active");
  document.getElementById("interview_btn").classList.remove("btn__active");
  document.getElementById("new_review_btn").classList.remove("btn__active");
  document.getElementById("book_events_btn").classList.remove("btn__active");
  document.getElementById("reviewsId").style.display = "block";
  document.getElementById("interviewId").style.display = "none";
  document.getElementById("newReviewId").style.display = "none";
  document.getElementById("bookEventsId").style.display = "none";
}

/* Called when user clicks Intervies button */
function selectInterview(){
  document.getElementById("reviews_btn").classList.remove("btn__active");
  document.getElementById("interview_btn").classList.toggle("btn__active");
  document.getElementById("new_review_btn").classList.remove("btn__active");
  document.getElementById("book_events_btn").classList.remove("btn__active");
  document.getElementById("reviewsId").style.display = "none";
  document.getElementById("interviewId").style.display = "block";
  document.getElementById("newReviewId").style.display = "none";
  document.getElementById("bookEventsId").style.display = "none";
}

/* Called when user clicks New Reviews button */
function selectNewReview(){
  document.getElementById("reviews_btn").classList.remove("btn__active");
  document.getElementById("interview_btn").classList.remove("btn__active");
  document.getElementById("new_review_btn").classList.toggle("btn__active");
  document.getElementById("book_events_btn").classList.remove("btn__active");
  document.getElementById("reviewsId").style.display = "none";
  document.getElementById("interviewId").style.display = "none";
  document.getElementById("newReviewId").style.display = "block";
  document.getElementById("bookEventsId").style.display = "none";
}

/* Called when user clicks Book's events button */
function selectBookEvents(){
  document.getElementById("reviews_btn").classList.remove("btn__active");
  document.getElementById("interview_btn").classList.remove("btn__active");
  document.getElementById("new_review_btn").classList.remove("btn__active");
  document.getElementById("book_events_btn").classList.toggle("btn__active");
  document.getElementById("reviewsId").style.display = "none";
  document.getElementById("interviewId").style.display = "none";
  document.getElementById("newReviewId").style.display = "none";
  document.getElementById("bookEventsId").style.display = "flex";
}




/*--------------------
  CART FUNCTIONS
----------------------*/
function addToCart(){
  var element = document.getElementById('bookIsbnID').innerText;
  var bookISBN = parseInt(element);
  var storage = sessionStorage.getItem('cart');
  if(storage){
    var cart = JSON.parse(storage);
    cart.push(bookISBN);
    sessionStorage.setItem('cart', JSON.stringify(cart)); 
  }else{
    var books = [];
    books.push(bookISBN);
    sessionStorage.setItem('cart', JSON.stringify(books)); 
  }
  alert('book correctly added to cart');
}