var authorOfTheMonthID = 0; //Fixed choice for author of the month

$(document).ready(fetchData())

function fetchData() {
  $('#autocomplete').autocomplete({
    serviceUrl: '/autocomplete/authors',
    onSelect: function (suggestion) {
		  $.ajax({
        url: '/author/'+suggestion.data,
        type: 'GET',
        dataType: 'json',
        success: (data) => { if(data){ setAuthorList([data], data.name); } }
      });
	 }
  });
  setAuthor(authorOfTheMonthID);
  SetAllAuthors();
}




/*------------------
  CHOICE FUNCTIONS
--------------------*/

/* Called when user clicks Search For Author button */
function select_searchAuthor() {
  document.getElementById("author_of_the_month").classList.remove("button_active");
  document.getElementById("search").classList.remove("choice_hide");
  document.getElementById('search_author').classList.toggle("button_active");
  document.getElementById('author').classList.toggle("choice_hide");
}

/* Called when user clicks Author of the Month button */
function select_authorOfTheMonth() {
  document.getElementById('search_author').classList.remove("button_active");
  document.getElementById("author").classList.remove("choice_hide");
  document.getElementById("author_of_the_month").classList.toggle("button_active");
  document.getElementById('search').classList.toggle("choice_hide");
}




/*-------------------
  AUTHOR FUNCTIONS
--------------------*/

/* Fetch from db and Set to page Authors of the Month infos */
function setAuthor(id){
  $.ajax({
    url: '/author/'+id,
    type: 'GET',
    dataType: 'json',
    success: (data) => {
      if(data){
        $('#name_AOTM').append(data.name);
        $('#image_AOTM').attr("src", data.image);
        $('#bio_AOTM').append(data.bio);
        $('#link_AOTM').attr("href", "/authorX/"+data.id+"/authorOfTheMonth");
      }
    }
  });
}

/* Fetch from db the list of all authors */
function SetAllAuthors(){
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
      url: '/authors/'+authorName,
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
  window.location.href = '/authorX/' + id + '/authorSearch(' + str + ')';
}