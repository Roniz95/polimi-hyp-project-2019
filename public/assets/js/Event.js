function selectThisMonthEvents() {
  document.getElementById("thisMonthId").style.display = "flex";
  document.getElementById("soonId").style.display = "none";
  document.getElementById("thisMonthEventsID").classList.toggle("button_active");
  document.getElementById("soonEventsID").classList.remove("button_active");
  
}

function selectSoonEvents() {
  document.getElementById("thisMonthId").style.display = "none"; 
  document.getElementById("soonId").style.display = "flex";
  document.getElementById("thisMonthEventsID").classList.remove("button_active");
  document.getElementById("soonEventsID").classList.toggle("button_active");
}


$(document).ready(fetchEvents())

function fetchEvents(){
  
  document.getElementById("thisMonthId").style.display = "flex";
  document.getElementById("soonId").style.display = "none";
  
  //Call DB to retrieve thisMonth Events
  $.ajax({
    url: '/events',//'/monthEvents',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setEvents(data, 'thisMonthId', 'monthEvents'); } }
  });
  
  //Call DB to retrieve soon Events
  $.ajax({
    url: '/events/soon',
    type: 'GET',
    dataType: 'json',
    success: (data) => { if(data){ setEvents(data, 'soonId', 'soonEvents'); } }
  });
}

function setEvents(events, elementID, from){
  var container = document.getElementById(elementID);
  while(container.firstChild){ container.removeChild(container.firstChild) }
  for(let i=0; i<events.length; i++){
    var div = document.createElement('div');
    div.className = "event card-1";
    div.onclick = () => goToEvent(events[i].id, from);
    
    var img = document.createElement('img');
    img.className = "event_image";
    img.src = events[i].image;
    div.appendChild(img);
    
    var title = document.createElement('p');
    title.className = "eventBox_borderBottom";
    var title_txt = document.createTextNode(events[i].title);
    title.append(title_txt);
    div.appendChild(title);
    
    var date = document.createElement('p');
    date.className = "date_text"
    var date_txt = document.createTextNode(createDateString(events[i].date));
    date.append(date_txt);
    div.appendChild(date);
    
    container.appendChild(div);
  }
}

function createDateString(data){
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = new Date(data);
  var day = date.getDate();
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  return day + ' ' + month + ' ' + year;
}


function goToEvent(eventID, from){
  window.location.href = "Event.html?id=" + eventID + "&from=" + from;
}