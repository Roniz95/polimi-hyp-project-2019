$(document).ready(fetchEvents())

function fetchEvents(){
  
  document.getElementById("thisMonthId").style.display = "flex";
  document.getElementById("soonId").style.display = "none";
  
  var today = new Date();
  
  //Call DB to retrieve thisMonth Events
  var thisMonth = today.getMonth()+1;
  var thisMonthStr = thisMonth>9 ? thisMonth.toString() : ('0'+thisMonth.toString());
  var firstMonthDayDate = new Date(today.getFullYear().toString()+'-'+thisMonthStr+'-01'); 
  var lastMonthDayDate = new Date(); 
  if(thisMonth===11 || thisMonth===4 || thisMonth===6 || thisMonth===9 ){ lastMonthDayDate.setDate(firstMonthDayDate.getDate() + 29); }
  else if(thisMonth===2){ lastMonthDayDate.setDate(firstMonthDayDate.getDate() + 27); }
  else{ lastMonthDayDate.setDate(firstMonthDayDate.getDate() + 30); }
  var fromDate1 = createDateStrForDBRequest(firstMonthDayDate);
  var toDate1 = createDateStrForDBRequest(lastMonthDayDate);
  $.ajax({
    url: '/events?fromDate=' + fromDate1 + '&toDate=' + toDate1,
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data.length>0){ setEvents(data, 'thisMonthId', 'monthEvents'); }
      else { document.getElementById('thisMonthId').innerHTML = "<p class=\"noEventsFound\">No events found</p>"; }
    }
  });
  
  //Call DB to retrieve soon Events (next two weeks)
  var twoWeeksLater = new Date();
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 15);
  var fromDate2 = createDateStrForDBRequest(today);
  var toDate2 = createDateStrForDBRequest(twoWeeksLater);
  $.ajax({
    url: '/events?fromDate=' + fromDate2 + '&toDate=' + toDate2,
    type: 'GET',
    dataType: 'json',
    success: (data) => { 
      if(data.length>0){ setEvents(data, 'soonId', 'soonEvents'); }
      else { document.getElementById('soonId').innerHTML = "<p class=\"noEventsFound\">No events found</p>"; }
    }
  });
}

/* create a date string for API request */
function createDateStrForDBRequest(date){
  var year = date.getFullYear().toString();
  var tmpMonth = date.getMonth() + 1; 
  var month = tmpMonth>9 ? tmpMonth.toString() : ('0'+tmpMonth.toString());
  var tmpDay = date.getDate();
  var day = tmpDay>9 ? date.getDate().toString() : ('0'+tmpDay.toString());
  return year+'-'+month+'-'+day;
}




/*-------------------
  EVENTS FUNCTIONS
--------------------*/

/* Set events list */
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

/* From date in form "MM-DD-YYYY" return date in form "DD MonthName YYYY" */
function createDateString(data){
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var date = new Date(data);
  var day = date.getDate();
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  return day + ' ' + month + ' ' + year;
}

/* Redirect to eventX page */
function goToEvent(eventID, from){
  window.location.href = "Event.html?id=" + eventID + "&from=" + from;
}




/*------------------
  CHOICE FUNCTIONS
--------------------*/

/* Click This month item */
function selectThisMonthEvents() {
  if(!document.getElementById("thisMonthEventsID").classList.contains("button_active")){
    document.getElementById("thisMonthEventsID").classList.toggle("button_active");
    document.getElementById("thisMonthId").style.display = "flex";
    document.getElementById("soonEventsID").classList.remove("button_active");
    document.getElementById("soonId").style.display = "none";
  }
}

/* Click soon events item */
function selectSoonEvents() {
  if(!document.getElementById("soonEventsID").classList.contains("button_active")){
    document.getElementById("thisMonthEventsID").classList.remove("button_active");
    document.getElementById("thisMonthId").style.display = "none";
    document.getElementById("soonEventsID").classList.toggle("button_active");
    document.getElementById("soonId").style.display = "flex";
  }
}