var authorOfTheMonthID = 0;

var authorNames= [
  /*{ value: 'test', data: '0001' },
  { value: 'apple', data: '0002' },
  { value: 'orange', data: '0003' },
  { value: 'marco', data: '0004' },
  { value: 'giovanni', data: '0005' },
  { value: 'comodino', data: '0006' },
  { value: 'Servizio', data: '0007' },
  { value: 'collider', data: '0008' },
  { value: 'attico', data: '0009' },
  { value: 'sottopasso', data: '00010' },
  { value: 'caviglia', data: '0011' },
  { value: 'termosifone', data: '0012' },
  { value: 'forchetta', data: '0013' },
  { value: 'assiduamente', data: '0014' }*/
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


$(document).ready(allAuthors())

function allAuthors() {  
  
  setAuthor(authorOfTheMonthID);
  
  //Call DB to retireve all authors data and initializate authorNames array 
  
  var i;
  for(i=0; i<authors.length; i++){ authorNames.push(authors[i].name) }
  
  
  var authorName, author_list;
    authorName = document.getElementById('autocomplete').value;
    author_list = document.getElementById('author_list');
    
    var title = document.createElement('p');
    title.className = "col-12";
    title.id = "search_results_text";
    var text = document.createTextNode("Results for All Authors");
    title.append(text);
    author_list.appendChild(title);
    
    var i;
    for (i=0; i<authors.length; i++) {
      var div = document.createElement('div');
      div.className = "card card-1";//"author_card shadow col-md-3 col-sm-5";
      div.setAttribute("onclick", "goToAuthor()");
      var img = document.createElement('img');
      img.className = 'author_image';
      img.src = authors[i].photo;
      div.appendChild(img);
      var p = document.createElement('p');
      p.className = 'author_text';
      var txt = document.createTextNode(authors[i].name+' '+authors[i].surname);
      p.append(txt);
      div.append(p);
      author_list.append(div);
    }
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

function searchAuthor() {
  var authorName, author_list;
  authorName = document.getElementById('autocomplete').value;
  author_list = document.getElementById('author_list');
  
  while (author_list.firstChild) { author_list.removeChild(author_list.firstChild); }
  
  if (authorName !== '') {
    
    var title = document.createElement('p');
    title.className = "col-12";
    title.id = "search_results_text";
    var text = document.createTextNode("Results for "+authorName);
    title.append(text);
    author_list.appendChild(title);
    
    var num = Math.floor(Math.random() * 16); //numeri random tra 0 e 15 
    if (num > 0) {
      var i;
      for (i=0; i<num; i++) {
        var div = document.createElement('div');
        div.className = "card card-1";
        div.setAttribute("onclick", "goToAuthor()");
        var index = Math.round(Math.random());
        var img = document.createElement('img');
        img.className = 'author_image';
        img.src = authors[index].photo;
        div.appendChild(img);
        var p = document.createElement('p');
        p.className = 'author_text';
        var txt = document.createTextNode(authors[index].name+' '+authors[index].surname);
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
  }else {
    allAuthors();
  }
}
    
$('#autocomplete').autocomplete({
	 lookup: authorNames
});

function goToAuthor(){
  window.location.href = '/authorX';
}