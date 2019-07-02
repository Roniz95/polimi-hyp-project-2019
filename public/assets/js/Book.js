/* Static choice for book of the month */
var bookOfTheMonthISBN = 9781781103852;

$(document).ready(fetchData())

function fetchData() {
  setBook(bookOfTheMonthISBN);
  setRecommendedBooks();
  setBestSellers();
  setClassics();
  setNewReleases();
}




/* Set book of the month */
function setBook(bookISBN){
  $.ajax({
    url: '/books/' + bookISBN,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#title_BOTM').append(data[0].title);
        $('#image_BOTM').attr("src", data[0].image);
        $('#abstract_BOTM').append(data[0].abstract);
        $('#link_BOTM').attr("href", "/bookX/"+data[0].isbn+"/bookOfTheMonth");
      }
    }
  });
}

/* Fetch recommended books from db */
function setRecommendedBooks(){
  $.ajax({
    url: '/books?isRecommended=true',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setBooksToPage(data, 'recommendedBooks') }}
  });
}

/* Fetch best sellers from db */
function setBestSellers(){
  $.ajax({
    url: '/books?isBestSeller=true',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setBooksToPage(data, 'bestSellers') } }
  });
}

/* Fetch Classics from db */
function setClassics(){
  $.ajax({
    url: '/books?isClassic=true',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setBooksToPage(data, 'classicBooks') } }
  });
}

/* Fetch new releases from db */
function setNewReleases(){
  $.ajax({
    url: '/books?isNewRelease=true',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setBooksToPage(data, 'newReleases') } }
  });
}




/* Set books list from db to page */
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
    //createGenresList(books[i].isbn, b3);
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
          element.textContent = element.textContent + data[i].name;
          if(i<data.length-1){ element.textContent = element.textContent + ", "; }
        }
      }
    }
  });
}

/* redirect to bookX page */
function goToBookPage(newBookID, from){
  window.location.href = 'Book.html?isbn='+newBookID+'&from='+from;
}




/* Click search books item */
function select_searchBook() {
  document.getElementById("book_of_the_month").classList.remove("button_active");
  document.getElementById("bookOfTheMonth").style.display = "none";
  document.getElementById('search_book').classList.toggle("button_active");
  document.getElementById('searchBooks').style.display = "block";
}

/* Click book of the month item */
function select_bookOfTheMonth() {
  document.getElementById('search_book').classList.remove("button_active");
  document.getElementById("searchBooks").style.display = "none";
  document.getElementById("book_of_the_month").classList.toggle("button_active");
  document.getElementById('bookOfTheMonth').style.display = "block";
}