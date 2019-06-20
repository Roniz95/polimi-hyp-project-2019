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

$(document).ready(fetchData())

function fetchData() {
  
  var parameters = location.search.substring(1).split('&');
  
  /* currentBookID */
  var idParam0 = parameters[0].split('=');
  var currentBookID = unescape(idParam0[1]);
  
  /* from */
  var idParam1 = parameters[1].split('=');
  var from = unescape(idParam1[1]);
  
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
            setPagination(data, currentBookID);
          }
        }
      });
    }else if(from.substring(0,11)=='authorBooks'){
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
            setPagination(data, currentBookID);
          }
        }
      });
    }
    else if(from.substring(0,5)=='search'){
      //TO DO
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
            setPagination(data, currentBookID);
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
            setPagination(data, currentBookID);
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
            setPagination(data, currentBookID);
          }
        }
      });
  }
  else if(from=='nextComingBooks'){
      $.ajax({
        url: '/nextComings',
        type: 'GET',
        dataType: 'json',
        success: (data) => {
          if(data){
            var str = JSON.stringify(data);
            sessionStorage.setItem("bookList", str);
            setPagination(data, currentBookID);
          }
        }
      });
  }
  else if(from=='bookOfTheMonth'){
    document.getElementById("paginationID").style.display = "none";
  }
  
  setOrientationInfo(from);
  
  setBook(currentBookID);
  
  var bookEvents = [
    { id: 1, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 2, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 3, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' }
  ]
  setEvents(bookEvents, 'bookEventsId');
  
}

function setPagination(data, id){
  var i=0;
  while(data[i].id!=id && i<data.length){ i++ }
  //alert(i);
  var counter = document.getElementById('counter');
  counter.tabIndex = i+1;
  counter.textContent = " "+(i+1)+" / "+data.length; 
}

function foo(dir){
  var str = sessionStorage.getItem('bookList');
  var data = JSON.parse(str);
  var counter = document.getElementById('counter');
  var tabIndex = counter.tabIndex;
  var newIndex = tabIndex + dir;
  if(newIndex>=1 && newIndex<=data.length){
    counter.tabIndex = newIndex;
    counter.textContent = " "+newIndex+" / "+data.length; 
    setBook(data[newIndex-1].id);
  }else{
    //TO DO
  }
}

function setOrientationInfo(from){
  var orientationInfo = document.getElementById('orientationInfoID');
  if(from!='newReleases' && from!='bestSellers'){
    /* book page */
    var li1 = document.createElement('li');
    li1.className = "breadcrumb-item";
    var a1 = document.createElement('a');
    a1.className = "breadcrumb_link";
    a1.href = '/book';
    a1.textContent = "Books";
    li1.appendChild(a1);
    orientationInfo.appendChild(li1);
  }
  /* book of the month */
    var li2 = document.createElement('li');
    li2.className = "breadcrumb-item active";
    li2.setAttribute('aria-current', 'page');
    if(from=='bookOfTheMonth'){ li2.textContent = "Book of the month"; }
    else if(from.substr(0, 12)=='similarBooks'){ li2.textContent = "Similar books to \"" + from.substr(17, from.length-18) + "\""; }
    else if(from.substr(0, 11)=='authorBooks'){ li2.textContent = from.substr(16, from.length-18) + "'s books"; }
    else if(from=='recommendedBooks'){ li2.textContent = "Our Recommendations"; }
    else if(from=='topSellersBooks'){ li2.textContent = "Best Sellers"; }
    else if(from=='classicBooks'){ li2.textContent = "Classics"; }
    else if(from=='nextComingBooks'){ li2.textContent = "Next Comings"; }
    orientationInfo.appendChild(li2);
}

function setBook(id){
  $.ajax({
    url: '/book/'+id,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#bookTitleID').text(data.title);
        $('#bookImageID').attr("src", data.image);
        $('#bookAuthorsID').empty();
        createAuthorsLink([data.author1, data.author2, data.author3, data.author4]);
        $('#bookPublishingHouseID').empty();
        $('#bookPublishingHouseID').append(data.publishingHouse);
        $('#bookGenreID').empty();
        $('#bookGenreID').append(data.genre);
        $('#bookThemesID').empty();
        createThemesString(data.themes);
        $('#bookYearID').empty();
        $('#bookYearID').append(data.year);
        $('#bookPriceID').empty();
        $('#bookPriceID').append(data.price);
        $('#bookPlotID').empty();
        $('#bookPlotID').append(data.abstract);
        $('#reviewsId').empty();
        fetchBookReviews(id);
        $('#bookInterviewID').empty();
        if(data.authorInterview!=""){ $('#bookInterviewID').append(data.authorInterview); }
        else{ 
          $('#bookInterviewID').append("No interview available");
          $('#bookInterviewID').css('text-align', 'center');
        }
        $('#similarBooks').empty();
        fetchAuthorBooks(data.author1.id, data.author1.name);
        fetchSimilarBooks(id, data.title);
      }
    }
  });
}

         
function createAuthorsLink(authorsNames){
  var td = document.getElementById('bookAuthorsID');
  for(let i=0; i<authorsNames.length; i++){
    if(authorsNames[i]){
      var a = document.createElement('a');
      a.href = '/authorX'; //.id
      a.className = "box__link";
      a.textContent = authorsNames[i].name;
      td.appendChild(a);
      var last = (i==3 || !authorsNames[i+1]);
      if(!last){ td.appendChild(document.createTextNode(',')); }
    }
  }
}

function createThemesString(themes){
  var td = document.getElementById('bookThemesID');
  var str = "";
  for(let i=0; i<themes.length; i++){
    str+= themes[i];
    if(i!=themes.length-1){ str+=', ' }
  }
  td.append(str);
}

function fetchBookReviews(id){
  $.ajax({
    url: '/bookReviews/'+id,
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data.length>0){ setReviews(data) }
      else{ noReview() }
    } 
  });
}

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

function fetchAuthorBooks(authorID, authorName){
  $.ajax({
      url: '/authorBooks/'+authorID,
      type: 'GET',
      dataType: 'json',
      success: (data) => { if(data){ SetBooks(data, 'authorBooks', authorName, authorID) } }
    });
}

function fetchSimilarBooks(id, title){
  $.ajax({
      url: '/bookSimilar/'+id,
      type: 'GET',
      dataType: 'json',
      success: (data) => { if(data){ SetBooks(data, 'similarBooks', title, id) } }
    });
}

function SetBooks(booksIDs, elementID, bookTitle, bookID) {
  var deckBook = document.getElementById(elementID); 
  for(let i=0; i<booksIDs.length; i++){
    var div = document.createElement('div');
    div.className = "cardBook card-1";
    div.onclick = () => goToBook(booksIDs[i].id, elementID, bookTitle, bookID);
          
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
    createAuthorsList([booksIDs[i].author1, booksIDs[i].author2, booksIDs[i].author3, booksIDs[i].author4], b2);
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

function createAuthorsList(authorsNames, element){
  for(let i=0; i<authorsNames.length; i++){
    if(authorsNames[i]!=""){
      element.textContent = element.textContent + authorsNames[i];
      var last = i==3 || authorsNames[i+1]=="";
      if(!last){ element.textContent = element.textContent + ", "; }
    }
  }
}

function setEvents(events, id){
  var container = document.getElementById(id);
  var i;
  for(i=0; i<events.length; i++){
    var div = document.createElement('div');
    div.className = "event card-1";
    div.setAttribute("onclick", "goToEvent()");
    var img = document.createElement('img');
    img.className = "event_image";
    img.src = events[i].img;
    div.appendChild(img);
    var title = document.createElement('p');
    title.className = "eventBox_borderBottom";
    var title_txt = document.createTextNode(events[i].title);
    title.append(title_txt);
    div.appendChild(title);
    var city = document.createElement('p');
    city.className = "eventBox_borderBottom";
    var city_txt = document.createTextNode(events[i].city);
    city.append(city_txt);
    div.appendChild(city);
    var date = document.createElement('p');
    var date_txt = document.createTextNode(events[i].date);
    date.append(date_txt);
    div.appendChild(date);
    container.appendChild(div);
  }
}

function goToEvent(){
  window.location.href = "/eventX";
}

function goToBook(newBookID, from, name, id){
  var str = from + "( of "+name+" )";
  window.location.href = '/bookX/'+newBookID+'/'+str+'/'+id;
}

