var bookOfTheMonthISBN = 9781781103852;

$(document).ready(fetchData())

function fetchData() {
  setBook(bookOfTheMonthISBN);
  setRecommendedBooks();
  setBestSellers();
  setClassics();
  setNewReleases();
}

function setBook(bookISBN){
  $.ajax({
    url: '/book/' + bookISBN,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#title_BOTM').append(data.title);
        $('#image_BOTM').attr("src", data.image);
        $('#abstract_BOTM').append(data.abstract);
        $('#link_BOTM').attr("href", "/bookX/"+data.isbn+"/bookOfTheMonth");
      }
    }
  });
}

function setRecommendedBooks(){
  $.ajax({
    url: '/ourRecommendations',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ SetBooks(data, 'recommendedBooks') }}
  });
}

function setBestSellers(){
  $.ajax({
    url: '/bestSellers',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ SetBooks(data, 'topSellersBooks') } }
  });
}

function setClassics(){
  $.ajax({
    url: '/classics',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ SetBooks(data, 'classicBooks') } }
  });
}

function setNewReleases(){
  $.ajax({
    url: '/newReleases',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ SetBooks(data, 'nextComingBooks') } }
  });
}


function SetBooks(books, elementID) {
  var deckBook = document.getElementById(elementID);
  for(let i=0; i<books.length; i++){
    var div = document.createElement('div');
    div.className = "cardBook card-1";
    div.onclick = () => goToBookPage(books[i].id, elementID);
    
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

function goToBookPage(newBookID, from){
  window.location.href = '/bookX/'+newBookID+'/'+from;
}


function select_searchBook() {
  document.getElementById("book_of_the_month").classList.remove("button_active");
  document.getElementById("bookOfTheMonth").classList.toggle("choice_hide");
  document.getElementById('search_book').classList.toggle("button_active");
  document.getElementById('searchBooks').classList.remove("choice_hide");
}

function select_bookOfTheMonth() {
  document.getElementById('search_book').classList.remove("button_active");
  document.getElementById("searchBooks").classList.toggle("choice_hide");
  document.getElementById("book_of_the_month").classList.toggle("button_active");
  document.getElementById('bookOfTheMonth').classList.remove("choice_hide");
}