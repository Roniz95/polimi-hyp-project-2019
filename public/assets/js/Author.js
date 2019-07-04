/*------------------------
  AUTOCOMPLETE Lookups
-------------------------*/

/* Authors */
$.ajax({
  url: '/autocomplete/authors',
  type: 'GET',
  dataType: 'json',
  success: function(data) { $('#autocomplete').autocomplete({ lookup: data.suggestions }) }
});




var authorOfTheMonthID = 0; //Fixed choice for author of the month

$(document).ready(fetchData())

function fetchData() {
  setAuthor(authorOfTheMonthID);
  setAllAuthors();
}




/*-------------------
  AUTHOR FUNCTIONS
--------------------*/

/* Fetch from db and Set to page Authors of the Month infos */
function setAuthor(id){
  $.ajax({
    url: '/authors/'+id,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#name_AOTM').append(data[0].name);
        $('#image_AOTM').attr("src", data[0].image);
        $('#bio_AOTM').append(data[0].bio);
        $('#link_AOTM').attr("href", "Author.html?id="+data[0].id+"&from=authorOfTheMonth");
      }
    }
  });
}

/* Fetch from db the list of all authors */
function setAllAuthors(){
  $.ajax({
    url: '/authors',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setAuthorList(data, 'allAuthors') } }
  });
}

/* Fetch from db a specific list of authors  */
function searchAuthor() {
  var authorName = document.getElementById('autocomplete').value;
  
  if (authorName !== '') {
    $.ajax({
      url: '/authors?name='+authorName,
      type: 'GET',
      dataType: 'json',
      success: (data) => { if(data){ setAuthorList(data, authorName) } }
    });
  }else{
    var p = document.createElement('p');
    p.className = "col-12";
    var txt = document.createTextNode('No data inserted');
    p.append(txt);
    author_list.append(p);
  }
}

/* Set to page the list of authors resulted from one of the 2 functions above */
function setAuthorList(authorList, stringSearched){
  var author_list = document.getElementById('author_list');
  while (author_list.firstChild) { author_list.removeChild(author_list.firstChild); }
  
  var pTitle = document.createElement('p');
  if(stringSearched=='allAuthors'){ pTitle.innerHTML = "<b>ALL AUTHORS</b>"; }
  else{ pTitle.innerHTML = "Results for <b>" + stringSearched + '</b>'; }
  pTitle.className = "col-12";
  author_list.appendChild(pTitle);
  
  if(authorList.length>0){
    for (let i=0; i<authorList.length; i++) {
      var div = document.createElement('div');
      div.className = "card card-1";
      div.onclick = () => goToAuthor(authorList[i].id, stringSearched);
      
      var img = document.createElement('img');
      img.className = 'author_image';
      img.src = authorList[i].image;
      div.appendChild(img);
      
      var p = document.createElement('p');
      p.className = 'author_text';
      var txt = document.createTextNode(authorList[i].name);
      p.append(txt);
      div.append(p);
      
      author_list.append(div);
    }
  }else{
    var p = document.createElement('p');
    p.className = "col-12";
    var txt = document.createTextNode('No results found');
    p.append(txt);
    author_list.append(p);
  }
}

/* Redirect to authorX page */
function goToAuthor(id, str){
  window.location.href = 'Author.html?id=' + id + '&from=authorSearch(' + str + ')';
}




/*------------------
  CHOICE FUNCTIONS
--------------------*/

/* Called when user clicks Search For Author button */
function select_searchAuthor() {
  if(!document.getElementById("search_author").classList.contains("button_active")){
    document.getElementById('search_author').classList.toggle("button_active");
    document.getElementById("author_of_the_month").classList.remove("button_active");
    document.getElementById("search").style.display = "block";
    document.getElementById('author').style.display = "none";
  }
}

/* Called when user clicks Author of the Month button */
function select_authorOfTheMonth() {
  if(!document.getElementById("author_of_the_month").classList.contains("button_active")){
    document.getElementById('search_author').classList.remove("button_active");
    document.getElementById("author_of_the_month").classList.toggle("button_active");
    document.getElementById('search').style.display = "none";
    document.getElementById("author").style.display = "block";
  }
}