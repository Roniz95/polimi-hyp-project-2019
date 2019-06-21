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
  var thisMonthEvents = [
    { id: 1, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 2, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 3, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 4, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 5, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 6, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 7, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 8, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 9, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 10, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' }
  ]
  setEvents(thisMonthEvents, 'thisMonthId');
  
  //Call DB to retrieve soon Events
  var soonEvents = [
    { id: 1, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 2, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 3, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' },
    { id: 4, img: '../assets/images/event.jpg', title: 'TITOLO', city: 'città', date: 'GG-MM-AA' }
  ]
  setEvents(soonEvents, 'soonId');
}

function setEvents(events, id){
  var container = document.getElementById(id);
  var i;
  for(i=0; i<events.length; i++){
    var div = document.createElement('div');
    div.className = "event card-1";
    div.setAttribute("onclick", "goToEvent()");
    var img = document.createElement('img');
    img.className = "event_image";
    img.src = events[i].img;
    div.appendChild(img);
    var title = document.createElement('p');
    title.className = "eventBox_borderBottom";
    var title_txt = document.createTextNode(events[i].title);
    title.append(title_txt);
    div.appendChild(title);
    var city = document.createElement('p');
    city.className = "eventBox_borderBottom";
    var city_txt = document.createTextNode(events[i].city);
    city.append(city_txt);
    div.appendChild(city);
    var date = document.createElement('p');
    var date_txt = document.createTextNode(events[i].date);
    date.append(date_txt);
    div.appendChild(date);
    container.appendChild(div);
  }
}

function goToEvent(){
  window.location.href = "/eventX/0/events";
}