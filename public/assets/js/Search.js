/*------------------------
  AUTOCOMPLETE Lookups
-------------------------*/

/* Genres */
$.ajax({
  url: '/autocomplete/genres',
  type: 'GET',
  dataType: 'json',
  success: function(data) { $('#genreSearchBar').autocomplete({ lookup: data.suggestions }) }
});

/* Themes */
$.ajax({
  url: '/autocomplete/themes',
  type: 'GET',
  dataType: 'json',
  success: function(data) { $('#themeSearchBar').autocomplete({ lookup: data.suggestions }) } 
});

/* Authors */
$.ajax({
  url: '/autocomplete/authors',
  type: 'GET',
  dataType: 'json',
  success: function(data) { $('#authorSearchBar').autocomplete({ lookup: data.suggestions }) }
});




/*------------------
  SEARCH FUNCTIONS
--------------------*/

/* Called when user clicks advanced search button */
function select_advancedSearch(){ 
  document.getElementById("advancedSearchId").classList.toggle('advancedSearch_hidden'); 
}

/* Called when user clicks search from title button */
function searchBooksFromTitle(){
  var title = document.getElementById('bookTitle').value;
  
  var deckBook = document.getElementById('bookResults');
  while (deckBook.firstChild) { deckBook.removeChild(deckBook.firstChild); }  
  
  if(title!=''){
    var resultTitle = document.createElement('p');
    resultTitle.className = "result_title";
    resultTitle.textContent = 'Results for title: ';
    var bText = document.createElement('b');
    bText.textContent = title;
    resultTitle.appendChild(bText);
    deckBook.appendChild(resultTitle); 
    $.ajax({
      url: '/searchBooksFromTitle/'+title,
      type: 'GET',
      dataType: 'json',
      success: (data) => { if(data){ SetResults1(data, title); } }
    });
  }else{
    var resultTitle = document.createElement('p');
    resultTitle.className = "result_title";
    resultTitle.textContent = 'No title inserted';
    deckBook.appendChild(resultTitle);
  }
}

/* Called when user clicks search from filters button */
function searchBooksFromFilters(){
  var genre = document.getElementById('genreSearchBar').value;
  var theme = document.getElementById('themeSearchBar').value;
  var author = document.getElementById('authorSearchBar').value;
  var bestSellers = document.getElementById('bestSellersCheckBox').checked;
  var nextComings = document.getElementById('newReleasesCheckBox').checked;
  
  var deckBook = document.getElementById('bookResults');
  while (deckBook.firstChild) { deckBook.removeChild(deckBook.firstChild); }
  
  if(genre!='' || theme!='' || author!='' || bestSellers || nextComings){
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
  
    if(nextComings){
      var favDiv = document.createElement('div');
      favDiv.className = 'result_div';
      var favB = document.createElement('b');
      favB.textContent = 'New Releases';
      favDiv.appendChild(favB);
      div.appendChild(favDiv);
    }
  
    resultTitle.appendChild(div);
    deckBook.appendChild(resultTitle);
    
    var g = genre=="" ? "null" : genre;
    var t = theme=="" ? "null" : theme;
    var a = author=="" ? "null" : author;
    var bs = bestSellers ? '1' : '0';
    var nc = nextComings ? '1' : '0';
    $.ajax({
      url: '/searchBooksFromFilters/'+g+'/'+t+'/'+a+'/'+bs+'/'+nc,
      type: 'GET',
      dataType: 'json',
      success: (data) => { if(data){ SetResults2(data, g, a, t, bs, nc); } }
    });
    
  }
  else{ 
    var deckBook = document.getElementById('bookResults');
    while (deckBook.firstChild) { deckBook.removeChild(deckBook.firstChild); }
    var resultTitle = document.createElement('p');
    resultTitle.className = "result_title";
    resultTitle.textContent = 'No filter inserted';
    deckBook.appendChild(resultTitle);
  }
}




/*-----------------------
  SET RESULTS FUNCTIONS
-------------------------*/

/* Set Results from search from title */
function SetResults1(books, titleInserted) {
  var deckBook = document.getElementById('bookResults');
  if(books.length>0){
    for(let i=0; i<books.length; i++){
      var div = document.createElement('div');
      div.className = "bookDiv card-1";
      div.onclick = () => goToBook1(books[i].isbn, titleInserted);
    
      var img = document.createElement('img');
      img.className = 'book__image';
      img.src = books[i].image;
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
      createAuthorsList(books[i].isbn, b2);
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

/* Set Results from search from filters */
function SetResults2(books, genreX, authorX, themeX, bs, nc) {
  var deckBook = document.getElementById('bookResults');
  if(books.length>0){
    for(let i=0; i<books.length; i++){
      var div = document.createElement('div');
      div.className = "bookDiv card-1";
      div.onclick = () => goToBook2(books[i].isbn, genreX, authorX, themeX, bs, nc);
    
      var img = document.createElement('img');
      img.className = 'book__image';
      img.src = books[i].image;
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
      createAuthorsList(books[i].isbn, b2);
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




/*---------------------
  REDIRECT FUNCTIONS
-----------------------*/

/* Redirect to BookX page from search from title */
function goToBook1(newBookISBN, title){
  window.location.href = '/bookTitle/'+newBookISBN+'/'+title;
}

/* Redirect to BookX page from search from filters */
function goToBook2(newBookISBN, genre, author, theme, bs, nc){
  window.location.href = '/bookFilters/'+newBookISBN+'/'+genre+'/'+author+'/'+theme+'/'+bs+'/'+nc;
}

