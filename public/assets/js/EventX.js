$(document).ready(fetchData())

function fetchData() {
  
  //extract bookID
  /*var parameters = location.search.substring(1).split('=');
  var temp = unescape(parameters[1]);
  var bookID = temp.substr(1, temp.length-2);
  alert(bookID); //TO LEAVE*/
  
  //Call DB and retrieve all books of 'eventID'
  var eventBooks = [
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
  SetBooks(eventBooks, 'eventBooks');
  
  //Call DB and retrieve authors of 'eventID'
  var authors = [
    { id: 1, name: 'Elena Ferrante', img: '../assets/images/autore.jpg' },
    { id: 2, name: 'Stephen King', img: '../assets/images/scrittore.jpg' },
    { id: 3, name: 'Erri De Luca', img: '../assets/images/scrittore.jpg'},
    { id: 4, name: 'Alessandro Baricco', img: '../assets/images/scrittore.jpg' },
    { id: 5, name: 'George R. Martin', img: '../assets/images/scrittore.jpg' },
    { id: 6, name: 'Oriana Fallaci', img: '../assets/images/autore.jpg' },
    { id: 7, name: 'Marcus Heitz', img: '../assets/images/scrittore.jpg' },
    { id: 8, name: 'Isaac Asimov', img: '../assets/images/scrittore.jpg' },
    { id: 9, name: 'Tom Clancy', img: '../assets/images/scrittore.jpg' },
    { id: 10, name: 'AutoreX', img: '../assets/images/autore.jpg' },
    { id: 11, name: 'AutoreY', img: '../assets/images/autore.jpg' },
  ];
  SetAuthors(authors, 'eventAuthors');
  
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

function SetAuthors(authors, id) { 

  var deckAuthor = document.getElementById(id);
  var i;
  for(i=0; i<authors.length; i++){
    var div = document.createElement('div');
    div.className = "cardAuthor card-1";
    div.addEventListener("click", goToAuthor.bind(null, authors[i].id));
    var img = document.createElement('img');
    img.className = 'cardAuthor__image';
    img.src = authors[i].img;
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

function goToBook(){
  window.location.href = '/bookX';
}

function goToAuthor(authorID){
  //var link = 'AuthorX.html?authorID='+authorID;
  //alert(link);
  window.location.href = '/authorX'; 
}