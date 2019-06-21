var authorOfTheMonthID = 0;

function select_searchAuthor() {
  document.getElementById("author_of_the_month").classList.remove("button_active");
  document.getElementById("search").classList.remove("choice_hide");
  document.getElementById('search_author').classList.toggle("button_active");
  document.getElementById('author').classList.toggle("choice_hide");
}

function select_authorOfTheMonth() {
  document.getElementById('search_author').classList.remove("button_active");
  document.getElementById("author").classList.remove("choice_hide");
  document.getElementById("author_of_the_month").classList.toggle("button_active");
  document.getElementById('search').classList.toggle("choice_hide");
}

$(document).ready(fetchData())

function fetchData() {
  $('#autocomplete').autocomplete({
    serviceUrl: '/autocomplete/authors',
    onSelect: function (suggestion) {
		  $.ajax({
        url: '/author/'+suggestion.data,
        type: 'GET',
        dataType: 'json',
        success: (data) => { if(data){ setAuthorList([data]); } }
      });
	 }
  });
  setAuthor(authorOfTheMonthID);
  SetAllAuthors();
}

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

function SetAllAuthors(){
  $.ajax({
    url: '/authors',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setAuthorList(data) } }
  });
}

function setAuthorList(authorList){
  var author_list = document.getElementById('author_list');
  while (author_list.firstChild) { author_list.removeChild(author_list.firstChild); }
  
  if(authorList.length>0){
    
    for (let i=0; i<authorList.length; i++) {
      var div = document.createElement('div');
      div.className = "card card-1";
      div.onclick = () => goToAuthor(authorList[i].id);
      
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

function searchAuthor() {
  var authorName = document.getElementById('autocomplete').value;
  
  if (authorName !== '') {
    $.ajax({
      url: '/authors/'+authorName,
      type: 'GET',
      dataType: 'json',
      success: (data) => { if(data){ setAuthorList(data) } }
    });
  }else{
    var p = document.createElement('p');
    p.className = "col-12";
    var txt = document.createTextNode('No data inserted');
    p.append(txt);
    author_list.append(p);
  }
}

function goToAuthor(id){
  window.location.href = '/authorX/' + id + '/authorSearch';
}