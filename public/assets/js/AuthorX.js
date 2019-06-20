$(document).ready(fetchData())

function fetchData() {
  
  var parameters = location.search.substring(1).split('&');
  
  /* currentAuthorID */
  var idParam0 = parameters[0].split('=');
  var currentAuthorID = unescape(idParam0[1]);
  
  /* from */
  var idParam1 = parameters[1].split('=');
  var from = unescape(idParam1[1]);
  
  setAuthor(currentAuthorID);
  
  //Call DB and retrieve similar authors of 'authorID'
  var similarAuthors = [
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
  SetSimilarAuthors(similarAuthors);
  
}

function setAuthor(id){
  $.ajax({
    url: '/author/'+id,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#authorNameID').append(data.name);
        $('#authorImageID').attr("src", data.image);
        $('#authorBioID').append(data.bio);
        $('#authorLinkID').attr("href", data.link);
        fetchAuthorBooks(id, data.name);
      }
    }
  });
}

function fetchAuthorBooks(authorID, authorName){
  $.ajax({
    url: '/authorBooks/'+authorID,
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ SetBooks(data, 'authorBooks', authorName, authorID) } }
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



function SetSimilarAuthors(authors) {
  var deckAuthor = document.getElementById('similarAuthor');
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





function goToBook(newBookID, from, name, id){
  var str = from + "( of "+name+" )";
  window.location.href = '/bookX/'+newBookID+'/'+str+'/'+id;
}



function goToAuthor(authorID){
  //var link = 'AuthorX.html?authorID='+authorID;
  //alert(link);
  window.location.href = '/authorX'; 
}