/* -- NAVBAR -- */
var navbar = document.createElement('nav');
navbar.className = "navbar navbar-expand-lg navbar-dark";




/* Navbar Logo */
var brand = document.createElement('a');
brand.className = "navbar-brand";
brand.href = "/";
var logo = document.createElement('img');
logo.src = "../assets/images/logo.png";
logo.width = 50;
logo.height = 50;
brand.appendChild(logo);
navbar.appendChild(brand);
/* Navbar Logo end */




/* Navbar Toggle Icon */
var toggle_button = document.createElement('button');
toggle_button.className = "navbar-toggler";
toggle_button.id = "nav_toggler";
toggle_button.setAttribute("type", "button");
toggle_button.setAttribute("data-toggle", "collapse");
toggle_button.setAttribute("data-target", "#navbarSupportedContent");
toggle_button.setAttribute("aria-controls", "navbarSupportedContent");
toggle_button.setAttribute("aria-expanded", "false");
toggle_button.setAttribute("aria-label", "Toggle navigation");
toggle_button.setAttribute("style", "border-color: #fff");
var span1 = document.createElement('span');
span1.className = "navbar-toggler-icon";
toggle_button.appendChild(span1);
navbar.appendChild(toggle_button);
/* Navbar Toggle Icon end */




/* Navbar Content */
var external_div = document.createElement('div');
external_div.className = "collapse navbar-collapse";
external_div.id = "navbarSupportedContent";


/* List */
var ul = document.createElement('ul');
ul.className = "navbar-nav mr-auto";

/* About us item */
var about = document.createElement('li');
about.className = "nav-item"; //volendo potrei aggiungere la classe active
/* link */
var about_link = document.createElement('a');
about_link.className = "nav-link";
about_link.href = (document.title=="Home" ? "pages" : ".") + "/AboutUs.html";
var about_text = document.createTextNode('About us');
about_link.append(about_text);
about.appendChild(about_link);
/* link end */
ul.appendChild(about);
/* About us item end */

/* Book item */
var book = document.createElement('li');
book.className = "nav-item"; //volendo potrei aggiungere la classe active
/* link */
var book_link = document.createElement('a');
book_link.className = "nav-link";
book_link.href = (document.title=="Home" ? "pages" : ".") + "/Books.html";
var book_text = document.createTextNode('Books');
book_link.append(book_text);
book.appendChild(book_link);
/* link end */
ul.appendChild(book);
/* Book item end */

/* Author item */
var author = document.createElement('li');
author.className = "nav-item"; //volendo potrei aggiungere la classe active
/* link */
var author_link = document.createElement('a');
author_link.className = "nav-link";
author_link.href = (document.title=="Home" ? "pages" : ".") + "/Authors.html";
var author_text = document.createTextNode('Authors');
author_link.append(author_text);
author.appendChild(author_link);
/* link end */
ul.appendChild(author);
/* Author item end */

/* Contacts item */
var contact = document.createElement('li');
contact.className = "nav-item"; //volendo potrei aggiungere la classe active
/* link */
var contact_link = document.createElement('a');
contact_link.className = "nav-link";
contact_link.href = (document.title=="Home" ? "pages" : ".") + "/Contacts.html";
var contact_text = document.createTextNode('Contacts');
contact_link.append(contact_text);
contact.appendChild(contact_link);
/* link end */
ul.appendChild(contact);
/* Contacts item end */

/* Events item */
var event = document.createElement('li');
event.className = "nav-item"; //volendo potrei aggiungere la classe active
/* link */
var event_link = document.createElement('a');
event_link.className = "nav-link";
event_link.href = (document.title=="Home" ? "pages" : ".") + "/Events.html";
var event_text = document.createTextNode('Events');
event_link.append(event_text);
event.appendChild(event_link);
/* link end */
ul.appendChild(event);
/* Events item end */

external_div.appendChild(ul);
/* List end */







/* Dropdown */
var dropdown = document.createElement('div');
dropdown.className = "dropdown";

/* Not Logged button */
var not_logged = document.createElement('button');
not_logged.id = 'notLogged_button';
not_logged.className = "btn btn-secondary";
not_logged.setAttribute('onclick', 'redirectToAuthPage()');
var not_logged_text = document.createTextNode('Sign In / Sign Up');
not_logged.append(not_logged_text);
dropdown.appendChild(not_logged);
/* Not Logged button end */

/* Logged Button */
var drop_btn = document.createElement('button');
drop_btn.className = "btn btn-secondary";
drop_btn.id = "dropdownMenuButton";
drop_btn.setAttribute("type", "button");
drop_btn.setAttribute("data-toggle", "dropdown");
drop_btn.setAttribute("aria-haspopup", "true");
drop_btn.setAttribute("aria-expanded", "false");
var drop_btn_text = "Username";
drop_btn.append(drop_btn_text);
dropdown.appendChild(drop_btn);
/* Button end */


/* Dropdown Menu */
var drop_menu = document.createElement('div');
drop_menu.className = "dropdown-menu dropdown-menu-right";
drop_menu.id = "drop_menu";
drop_menu.setAttribute("aria-labelledby", "dropdownMenuButton");

/* logged menu */
var logged_menu = document.createElement('div');
logged_menu.id = "logged_menu";

/* My cart */
var myCart = document.createElement('a');
myCart.className = "dropdown-item";
myCart.href = "pages/Cart.html";
var cartIcon = document.createElement('i');
cartIcon.className = "fa fa-shopping-cart drop_icon";
myCart.appendChild(cartIcon);
var myCart_Text = document.createTextNode('My Cart');
myCart.appendChild(myCart_Text);
logged_menu.appendChild(myCart);
/* My cart end */

/* My orders */
var myOrders = document.createElement('a');
myOrders.className = "dropdown-item";
myOrders.href = "#";
var orderIcon = document.createElement('i');
orderIcon.className = "fa fa-truck drop_icon";
myOrders.appendChild(orderIcon);
var myOrders_Text = document.createTextNode('My Orders');
myOrders.appendChild(myOrders_Text);
logged_menu.appendChild(myOrders);
/* My orders end */

/* hr */
var hr2 = document.createElement('hr');
logged_menu.appendChild(hr2);
/* hr end */

/* sign out button */
var sign_out_btn = document.createElement('button');
sign_out_btn.className = "sign_btn btn btn-primary";
sign_out_btn.id = "logout_button";
sign_out_btn.setAttribute("type", "submit");
sign_out_btn.setAttribute("onclick", "signOut()");

var sign_out_btn_txt = document.createTextNode('Sign Out');
sign_out_btn.append(sign_out_btn_txt);
logged_menu.appendChild(sign_out_btn);
/* sign out button end */

drop_menu.appendChild(logged_menu);
/* logged menu end*/

dropdown.appendChild(drop_menu);
/* Dropdown Menu end */

external_div.appendChild(dropdown);
/* Dropdown end */

navbar.appendChild(external_div);
/* Navbar Content end */

document.body.appendChild(navbar);
/* -- NAVBAR end -- */






var user_logged = sessionStorage.getItem('logged');
      
if (user_logged === 'true') {
  document.getElementById("notLogged_button").style.display = 'none';
  document.getElementById("dropdownMenuButton").style.display = 'block';
  document.getElementById("dropdownMenuButton").textContent = sessionStorage.getItem('username');
} else {
  document.getElementById("notLogged_button").style.display = 'block';
  document.getElementById("dropdownMenuButton").style.display = 'none';
  document.getElementById("dropdownMenuButton").textContent = 'Sign In / Sign Up';
}

function redirectToAuthPage(){
  window.location.href = '/auth';
}
   
function signOut() {
  //DO BACK END SIGN OUT
  sessionStorage.setItem('logged', 'false');
  sessionStorage.removeItem('username');
  window.location.reload();
}