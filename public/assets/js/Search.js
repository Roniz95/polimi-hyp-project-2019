var genres = [
  "test",
  "apple",
  "orange",
  "marco",
  "giovanni",
  "comodino",
  "servizio",
  "collider",
  "attico",
  "sottomesso",
  "sottopasso",
  "caviglia",
  "termosifone",
  "forchetta"
];

var themes = [
  "test",
  "apple",
  "orange",
  "marco",
  "giovanni",
  "comodino",
  "servizio",
  "collider",
  "attico",
  "sottomesso",
  "sottopasso",
  "caviglia",
  "termosifone",
  "forchetta"
];

var authors = [
  "test",
  "apple",
  "orange",
  "marco",
  "giovanni",
  "comodino",
  "servizio",
  "collider",
  "attico",
  "sottomesso",
  "sottopasso",
  "caviglia",
  "termosifone",
  "forchetta"
];

$('#genreSearchBar').autocomplete({
	 lookup: genres
});

$('#themeSearchBar').autocomplete({
	 lookup: themes
});

$('#authorSearchBar').autocomplete({
	 lookup: authors
});


function select_advancedSearch(){
  document.getElementById("advancedSearchId").classList.toggle('advancedSearch_hidden');
}


function searchBooksFromTitle(){
  var title = document.getElementById('bookTitle').value;
  /*alert('title: ' + (title!='' ? title : 'NOT SELECTED'));*/
  
  if(title!=''){
    var resultTitle = document.createElement('p');
    resultTitle.className = "result_title";
    resultTitle.textContent = 'Results for title: ';
    var bText = document.createElement('b');
    bText.textContent = title;
    resultTitle.appendChild(bText);
  
    //Call DB and retrieve all books having this title
    var results = [
      { id: 3, title: 'Harry Potter e il prigioniero di Azkaban', img: '../assets/images/harry3.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
      { id: 8, title: 'Libro X', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
      { id: 9, title: 'Libro Y', img: '../assets/images/h8.jpg', genre: 'Comedy', author: 'J.K. Rowling' },
      { id: 10, title: 'Libro Z', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
      { id: 11, title: 'Libro U', img: '../assets/images/h8.jpg', genre: 'Thriller', author: 'J.K. Rowling' },
      { id: 4, title: 'Harry Potter e il calice di fuoco', img: '../assets/images/harry4.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
      { id: 5, title: 'Harry Potter e l\'ordine della fenice', img: '../assets/images/HP5.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
      { id: 6, title: 'Harry Potter e il principe mezzosangue', img: '../assets/images/harry6.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
      { id: 7, title: 'Harry Potter e i doni della morte', img: '../assets/images/harry7.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
      { id: 1, title: 'Harry Potter e la pietra filosofale', img: '../assets/images/harry1.jpg', genre: 'Fantasy', author: 'J.K. Rowling' },
      { id: 2, title: 'Harry Potter e la camera dei segreti', img: '../assets/images/HP2.jpg', genre: 'Fantasy', author: 'J.K. Rowling' }
    ];
    var prova = Math.round(Math.random())==1; //randomicamente ritorna delle result o nessun result (come prova fino a che non ci sarà il DB)
    SetResults(prova ? results : [], resultTitle);
  }
  else{ noTitleSelcted(); }
}

function searchBooksFromFilters(){
  var genre = document.getElementById('genreSearchBar').value;
  var theme = document.getElementById('themeSearchBar').value;
  var author = document.getElementById('authorSearchBar').value;
  var bestSellers = document.getElementById('bestSellersCheckBox').checked;
  var myFavourite = document.getElementById('myFavouritesCheckBox').checked;
  
  /*alert(
    'genre: ' + (genre!='' ? genre : 'NO SELECTION') + '\n' +
    'theme: ' + (theme!='' ? theme : 'NO SELECTION') + '\n' +
    'author: ' + (author!='' ? author : 'NO SELECTION') + '\n' +
    'bestSellers: ' + bestSellers + '\n' +
    'myFavourite: ' + myFavourite
  );*/
  
  if(genre!='' || theme!='' || author!='' || bestSellers || myFavourite){
    var resultTitle = document.createElement('p');
    resultTitle.className = "result_title";
  
    resultTitle.textContent = 'Results for:';
  
    var div = document.createElement('div');
    div.className = 'filters_div';
  
    if(genre!=''){
      var genreDiv = document.createElement('div');
      genreDiv.className = 'result_div';
      var genreText = document.createTextNode('genre: ');
      genreDiv.appendChild(genreText);
      var genreB = document.createElement('b');
      genreB.textContent = genre;
      genreDiv.appendChild(genreB);
      div.appendChild(genreDiv);
    }
  
    if(theme!=''){
      var themeDiv = document.createElement('div');
      themeDiv.className = 'result_div';
      var themeText = document.createTextNode('theme: ');
      themeDiv.appendChild(themeText);
      var themeB = document.createElement('b');
      themeB.textContent = theme;
      themeDiv.appendChild(themeB);
      div.appendChild(themeDiv);
    }
  
    if(author!=''){
      var authorDiv = document.createElement('div');
      authorDiv.className = 'result_div';
      var authorText = document.createTextNode('author: ');
      authorDiv.appendChild(authorText);
      var authorB = document.createElement('b');
      authorB.textContent = author;
      authorDiv.appendChild(authorB);
      div.appendChild(authorDiv);
    }
  
    if(bestSellers){
      var bestDiv = document.createElement('div');
      bestDiv.className = 'result_div';
      var bestB = document.createElement('b');
      bestB.textContent = 'Best Sellers';
      bestDiv.appendChild(bestB);
      div.appendChild(bestDiv);
    }
  
    if(myFavourite){
      var favDiv = document.createElement('div');
      favDiv.className = 'result_div';
      var favB = document.createElement('b');
      favB.textContent = 'My Favourites';
      favDiv.appendChild(favB);
      div.appendChild(favDiv);
    }
  
    resultTitle.appendChild(div);
  
    //Call DB and retrieve all books having this filters
    var results = [
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
    var prova = Math.round(Math.random())==1; //randomicamente ritorna delle result o nessun result (come prova fino a che non ci sarà il DB)
    SetResults(prova ? results : [], resultTitle);
  }
  else{ noFilterSelcted(); }
}

function noTitleSelcted(){
  var deckBook = document.getElementById('bookResults');
  while (deckBook.firstChild) { deckBook.removeChild(deckBook.firstChild); }
  var resultTitle = document.createElement('p');
  resultTitle.className = "result_title";
  resultTitle.textContent = 'No title inserted';
  deckBook.appendChild(resultTitle);
}

function noFilterSelcted(){
  var deckBook = document.getElementById('bookResults');
  while (deckBook.firstChild) { deckBook.removeChild(deckBook.firstChild); }
  var resultTitle = document.createElement('p');
  resultTitle.className = "result_title";
  resultTitle.textContent = 'No filter inserted';
  deckBook.appendChild(resultTitle);
}


function SetResults(books, str) {
  
  var deckBook = document.getElementById('bookResults');
  while (deckBook.firstChild) { deckBook.removeChild(deckBook.firstChild); }
  deckBook.appendChild(str);
  
  if(books.length>0){
    var i;
    for(i=0; i<books.length; i++){
      var div = document.createElement('div');
      div.className = "bookDiv card-1";
      div.setAttribute("onclick", "goToBook()");
    
      var img = document.createElement('img');
      img.className = 'book__image';
      img.src = books[i].img;
      div.appendChild(img);
    
      var title = document.createElement('div');
      title.className = 'book__text book__border__bottom';
      var b1 = document.createElement('b');
      var t1 = document.createTextNode(books[i].title);
      b1.append(t1);
      title.appendChild(b1);
      div.appendChild(title);
    
      var author = document.createElement('div');
      author.className = 'book__text book__border__bottom';
      var b2 = document.createElement('b');
      var t2 = document.createTextNode(books[i].author);
      b2.append(t2);
      author.appendChild(b2);
      div.appendChild(author);
    
      var genre = document.createElement('div');
      genre.className = 'book__text';
      var b3 = document.createElement('b');
      var t3 = document.createTextNode(books[i].genre);
      b3.append(t3);
      genre.appendChild(b3);
      div.appendChild(genre);
    
      deckBook.appendChild(div);
    }
  }
  else{
    var noRes = document.createElement('p');
    noRes.className = "result_title";
    noRes.textContent = 'No results found';
    deckBook.appendChild(noRes);
  }
}



function goToBook(){
  window.location.href = '/bookX';
}