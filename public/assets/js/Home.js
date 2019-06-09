$(document).ready(fetchData())

function fetchData() {
  
  //Call DB and retrieve all new Books
  var newBooks = [
    { id: 1, title: 'Harry Potter e la pietra filosofale', img: '../assets/images/harry1.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 2, title: 'Harry Potter e la camera dei segreti', img: '../assets/images/HP2.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 3, title: 'Harry Potter e il prigioniero di Azkaban', img: '../assets/images/harry3.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 4, title: 'Harry Potter e il calice di fuoco', img: '../assets/images/harry4.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 5, title: 'Harry Potter e l\'ordine della fenice', img: '../assets/images/HP5.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 6, title: 'Harry Potter e il principe mezzosangue', img: '../assets/images/harry6.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 7, title: 'Harry Potter e i doni della morte', img: '../assets/images/harry7.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 8, title: 'Libro X', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 9, title: 'Libro Y', img: '../assets/images/h8.jpg', genre: 'Comedy', author: 'J.K. Rowling' },
    { id: 10, title: 'Libro Z', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 11, title: 'Libro U', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
  ];
  SetBooks(newBooks, 'newBooks');
  
  //Call DB and retrieve all Best Sellers
  var bestSellers = [
    { id: 1, title: 'Harry Potter e la pietra filosofale', img: '../assets/images/harry1.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 2, title: 'Harry Potter e la camera dei segreti', img: '../assets/images/HP2.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 3, title: 'Harry Potter e il prigioniero di Azkaban', img: '../assets/images/harry3.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 4, title: 'Harry Potter e il calice di fuoco', img: '../assets/images/harry4.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 5, title: 'Harry Potter e l\'ordine della fenice', img: '../assets/images/HP5.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 6, title: 'Harry Potter e il principe mezzosangue', img: '../assets/images/harry6.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 7, title: 'Harry Potter e i doni della morte', img: '../assets/images/harry7.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
    { id: 8, title: 'Libro X', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 9, title: 'Libro Y', img: '../assets/images/h8.jpg', genre: 'Comedy', author: 'J.K. Rowling' },
    { id: 10, title: 'Libro Z', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
    { id: 11, title: 'Libro U', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
  ];
  SetBooks(bestSellers, 'bestSellers');
  
}

function SetBooks(books, id) {
  var deckBook = document.getElementById(id);
  var length = books.length < 8 ? books.length : 8; //oppure li restituisco tutti???
  var i;
  
  for(i=0; i<length; i++){
    var div = document.createElement('div');
    div.className = "cardBook card-1";
    div.setAttribute("onclick", "goToBook()");
    
    var img = document.createElement('img');
    img.className = 'cardBook__image';
    img.src = books[i].img;
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
    var t2 = document.createTextNode(books[i].author);
    b2.append(t2);
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

function goToBook(){
  window.location.href = 'BookX.html';
}