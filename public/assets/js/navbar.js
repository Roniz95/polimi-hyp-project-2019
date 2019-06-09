/* -- NAVBAR -- */
var navbar = document.createElement('nav');
navbar.className = "navbar navbar-expand-lg navbar-dark";




/* Navbar Logo */
var brand = document.createElement('a');
brand.className = "navbar-brand";
brand.href = "Home.html";
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
about_link.href = "AboutUs.html";
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
book_link.href = "Book.html";
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
author_link.href = "Author.html";
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
contact_link.href = "Contact.html";
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
event_link.href = "Event.html";
var event_text = document.createTextNode('Events');
event_link.append(event_text);
event.appendChild(event_link);
/* link end */
ul.appendChild(event);
/* Events item end */

/* Search item */
var search = document.createElement('li');
search.className = "nav-item"; //volendo potrei aggiungere la classe active
/* link */
var search_link = document.createElement('a');
search_link.className = "nav-link";
search_link.href = "Search.html";
var search_text = document.createTextNode('Search');
search_link.append(search_text);
search.appendChild(search_link);
/* link end */
ul.appendChild(search);
/* Search item end */

external_div.appendChild(ul);
/* List end */



/* Dropdown */
var dropdown = document.createElement('div');
dropdown.className = "dropdown";


/* Button */
var drop_btn = document.createElement('button');
drop_btn.className = "btn btn-secondary";
drop_btn.id = "dropdownMenuButton";
var drop_btn_text = "Sign In / Sign Up";
drop_btn.append(drop_btn_text);
dropdown.appendChild(drop_btn);
/* Button end */


/* Dropdown Menu */
var drop_menu = document.createElement('div');
drop_menu.className = "dropdown-menu dropdown-menu-right";
drop_menu.id = "drop_menu";

/* not logged menu */
var not_logged = document.createElement('div');
not_logged.id = "not_logged_menu";


/* sign buttons */
var sign = document.createElement('div');
sign.className = "row justify-content-center sign_container";
/* sign in */
var sign_in = document.createElement('div');
sign_in.className = "col-4 sign_div";
var sign_in_button = document.createElement('button');
sign_in_button.className = "sign_button sign_button_active";
sign_in_button.id = "sign_in_button";
var sign_in_text = document.createTextNode('Sign In');
sign_in_button.append(sign_in_text);
sign_in.appendChild(sign_in_button);
sign.appendChild(sign_in);
/* sign in end */
/* sign up */
var sign_up = document.createElement('div');
sign_up.className = "col-4 sign_div";
var sign_up_button = document.createElement('button');
sign_up_button.className = "sign_button";
sign_up_button.id = "sign_up_button";
var sign_up_text = document.createTextNode('Sign Up');
sign_up_button.append(sign_up_text);
sign_up.appendChild(sign_up_button);
sign.appendChild(sign_up);
/* sign up end */

not_logged.appendChild(sign);
/* sign buttons end */

/* hr */
var hr = document.createElement('hr');
not_logged.appendChild(hr);
/* hr end */

/* sign in form */
var sign_in_form = document.createElement('form');
sign_in_form.className = "form_visible";
sign_in_form.id = "sign_in_form";
/* email */
var sign_in_form_div1 = document.createElement('div');
sign_in_form_div1.className = "form-group";
var email_label = document.createElement('label');
email_label.id = "sign_in_email_label";
var email_lable_text = document.createTextNode('Email address');
email_label.append(email_lable_text);
sign_in_form_div1.appendChild(email_label);
var email_input = document.createElement('input');
email_input.className = "form-control";
email_input.id = "exampleInputMail1";
sign_in_form_div1.appendChild(email_input);
sign_in_form.appendChild(sign_in_form_div1);
/* email end */
/* password */
var sign_in_form_div2 = document.createElement('div');
sign_in_form_div2.className = "form-group";
var psswd_label = document.createElement('label');
psswd_label.id = "sign_in_password_label";
var psswd_lable_text = document.createTextNode('Password');
psswd_label.append(psswd_lable_text);
sign_in_form_div2.appendChild(psswd_label);
var psswd_input = document.createElement('input');
psswd_input.className = "form-control";
psswd_input.id = "exampleInputPassword1";
sign_in_form_div2.appendChild(psswd_input);
sign_in_form.appendChild(sign_in_form_div2);
/* password end */
/* sign in button */
var sign_in_btn = document.createElement('button');
sign_in_btn.className = "btn btn-primary";
sign_in_btn.id = "login_button";
var sign_btn_text = document.createTextNode('Sign In');
sign_in_btn.append(sign_btn_text);
sign_in_form.appendChild(sign_in_btn);
/* sign in button end */

not_logged.appendChild(sign_in_form);
/* sign in form end */

/* sign up form */
var sign_up_form = document.createElement('form');
sign_up_form.id = "sign_up_form";
/* name */
var sign_up_form_div1 = document.createElement('div');
sign_up_form_div1.className = "form-group";
var name_label = document.createElement('label');
name_label.id = "sign_up_name_label";
var name_lable_text = document.createTextNode('Name');
name_label.append(name_lable_text);
sign_up_form_div1.appendChild(name_label);
var name_input = document.createElement('input');
name_input.className = "form-control";
name_input.id = "exampleInputName1";
sign_up_form_div1.appendChild(name_input);
sign_up_form.appendChild(sign_up_form_div1);
/* name end */
/* surname */
var sign_up_form_div2 = document.createElement('div');
sign_up_form_div2.className = "form-group";
var surname_label = document.createElement('label');
surname_label.id = "sign_up_surname_label";
var surname_lable_text = document.createTextNode('Surname');
surname_label.append(surname_lable_text);
sign_up_form_div2.appendChild(surname_label);
var surname_input = document.createElement('input');
surname_input.className = "form-control";
surname_input.id = "exampleInputSurname1";
sign_up_form_div2.appendChild(surname_input);
sign_up_form.appendChild(sign_up_form_div2);
/* surname end */
/* email */
var sign_up_form_div3 = document.createElement('div');
sign_up_form_div3.className = "form-group";
var email_label2 = document.createElement('label');
email_label2.id = "sign_up_email_label2";
var email_label2_text = document.createTextNode('Email');
email_label2.append(email_label2_text);
sign_up_form_div3.appendChild(email_label2);
var email_input2 = document.createElement('input');
email_input2.className = "form-control";
email_input2.id = "exampleInputMail2";
sign_up_form_div3.appendChild(email_input2);
sign_up_form.appendChild(sign_up_form_div3);
/* email end */
/* password */
var sign_up_form_div4 = document.createElement('div');
sign_up_form_div4.className = "form-group";
var psswd_label2 = document.createElement('label');
psswd_label2.id = "sign_up_password_label2";
var psswd_lable2_text = document.createTextNode('Password');
psswd_label2.append(psswd_lable2_text);
sign_up_form_div4.appendChild(psswd_label2);
var psswd_input2 = document.createElement('input');
psswd_input2.className = "form-control";
psswd_input2.id = "exampleInputPassword2";
sign_up_form_div4.appendChild(psswd_input2);
sign_up_form.appendChild(sign_up_form_div4);
/* password end */
/* confirm password */
var sign_up_form_div5 = document.createElement('div');
sign_up_form_div5.className = "form-group";
var psswd_label3 = document.createElement('label');
psswd_label3.id = "sign_up_password_label3";
var psswd_lable3_text = document.createTextNode('Confirm Password');
psswd_label3.append(psswd_lable3_text);
sign_up_form_div5.appendChild(psswd_label3);
var psswd_input3 = document.createElement('input');
psswd_input3.className = "form-control";
psswd_input3.id = "exampleInputPassword3";
sign_up_form_div5.appendChild(psswd_input3);
sign_up_form.appendChild(sign_up_form_div5);
/* confirm password end */
/* sign up button */
var sign_up_btn = document.createElement('button');
sign_up_btn.className = "btn btn-primary";
sign_up_btn.id = "register_button";
var sign_btn_txt = document.createTextNode('Sign Up');
sign_up_btn.append(sign_btn_txt);
sign_up_form.appendChild(sign_up_btn);
/* sign up button end */

not_logged.appendChild(sign_up_form);
/* sign up form end */

drop_menu.appendChild(not_logged);
/* not logged menu end */

/* logged menu */
var logged_menu = document.createElement('div');
logged_menu.id = "logged_menu";

/* My cart */
var myCart = document.createElement('a');
myCart.className = "dropdown-item";
myCart.href = "#";
var myCart_Text = document.createTextNode('My Cart');
myCart.append(myCart_Text);
logged_menu.appendChild(myCart);
/* My cart end */

/* My orders */
var myOrders = document.createElement('a');
myOrders.className = "dropdown-item";
myOrders.href = "#";
var myOrders_Text = document.createTextNode('My Orders');
myOrders.append(myOrders_Text);
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




document.getElementById('nav_toggler').setAttribute("type", "button");
document.getElementById('nav_toggler').setAttribute("data-toggle", "collapse");
document.getElementById('nav_toggler').setAttribute("data-target", "#navbarSupportedContent");
document.getElementById('nav_toggler').setAttribute("aria-controls", "navbarSupportedContent");
document.getElementById('nav_toggler').setAttribute("aria-expanded", "false");
document.getElementById('nav_toggler').setAttribute("aria-label", "Toggle navigation");
document.getElementById('nav_toggler').setAttribute("style", "border-color: #fff");

document.getElementById('dropdownMenuButton').setAttribute("type", "button");
document.getElementById('dropdownMenuButton').setAttribute("data-toggle", "dropdown");
document.getElementById('dropdownMenuButton').setAttribute("aria-haspopup", "true");
document.getElementById('dropdownMenuButton').setAttribute("aria-expanded", "false");

document.getElementById('drop_menu').setAttribute("aria-labelledby", "dropdownMenuButton");

document.getElementById('sign_in_button').setAttribute("type", "button");
document.getElementById('sign_in_button').setAttribute("onclick", "select_signIn()");

document.getElementById('sign_up_button').setAttribute("type", "button");
document.getElementById('sign_up_button').setAttribute("onclick", "select_signUp()");

document.getElementById('sign_in_email_label').setAttribute("for", "exampleInputMail1");
document.getElementById('exampleInputMail1').setAttribute("type", "email");
document.getElementById('exampleInputMail1').setAttribute("aria-describedby", "emailHelp");
document.getElementById('exampleInputMail1').setAttribute("placeholder", "Enter email");

document.getElementById('sign_in_password_label').setAttribute("for", "exampleInputPassword1");
document.getElementById('exampleInputPassword1').setAttribute("type", "password");
document.getElementById('exampleInputPassword1').setAttribute("placeholder", "Password");

document.getElementById('login_button').setAttribute("type", "submit");
document.getElementById('login_button').setAttribute("onclick", "signIn()");

document.getElementById('sign_up_name_label').setAttribute("for", "exampleInputName1");
document.getElementById('exampleInputName1').setAttribute("type", "text");
document.getElementById('exampleInputName1').setAttribute("placeholder", "Insert name");

document.getElementById('sign_up_surname_label').setAttribute("for", "exampleInputSurname1");
document.getElementById('exampleInputSurname1').setAttribute("type", "text");
document.getElementById('exampleInputSurname1').setAttribute("placeholder", "Insert surname");

document.getElementById('sign_up_email_label2').setAttribute("for", "exampleInputMail2");
document.getElementById('exampleInputMail2').setAttribute("type", "email");
document.getElementById('exampleInputMail2').setAttribute("aria-describedby", "emailHelp");
document.getElementById('exampleInputMail2').setAttribute("placeholder", "Enter email");

document.getElementById('sign_up_password_label2').setAttribute("for", "exampleInputMail2");
document.getElementById('exampleInputPassword2').setAttribute("type", "password");
document.getElementById('exampleInputPassword2').setAttribute("placeholder", "Insert Password");

document.getElementById('sign_up_password_label2').setAttribute("for", "exampleInputPassword3");
document.getElementById('exampleInputPassword3').setAttribute("type", "password");
document.getElementById('exampleInputPassword3').setAttribute("placeholder", "Insert Password");

document.getElementById('register_button').setAttribute("type", "submit");
document.getElementById('register_button').setAttribute("onclick", "signUp()");

document.getElementById('logout_button').setAttribute("type", "submit");
document.getElementById('logout_button').setAttribute("onclick", "signOut()");






var user_logged = sessionStorage.getItem('logged');
      
if (user_logged === 'true') {
  document.getElementById("dropdownMenuButton").textContent = 'Username';
  document.getElementById("not_logged_menu").classList.remove('show_Menu');
  document.getElementById("logged_menu").classList.remove('hide_Menu');
  document.getElementById("not_logged_menu").classList.toggle('hide_Menu');
  document.getElementById("logged_menu").classList.toggle('show_Menu');
} else {
  document.getElementById("dropdownMenuButton").textContent = 'Sign In / Sign Up';
  document.getElementById("not_logged_menu").classList.remove('hide_Menu');
  document.getElementById("logged_menu").classList.remove('show_Menu');
  document.getElementById("not_logged_menu").classList.toggle('show_Menu');
  document.getElementById("logged_menu").classList.toggle('hide_Menu');
}
      
function signIn() {
  //DO BACK END SIGN IN
  sessionStorage.setItem('logged', 'true');
  window.location.reload();
}
      
function signOut() {
  //DO BACK END SIGN OUT
  sessionStorage.setItem('logged', 'false');
  window.location.reload();
}
      
function signUp() {
  //DO BACK END SIGN UP
  sessionStorage.setItem('logged', 'true');
  window.location.reload();
}
      
function select_signIn() {
  document.getElementById("sign_up_button").classList.remove("sign_button_active");
  document.getElementById("sign_in_button").classList.toggle("sign_button_active");
  document.getElementById('sign_up_form').classList.remove("form_visible");
  document.getElementById('sign_in_form').classList.toggle("form_visible");
  $(document).on('click', '.sign_button', function (e) {
    e.stopPropagation();
  });
}
      
function select_signUp() {
  document.getElementById("sign_in_button").classList.remove("sign_button_active");
  document.getElementById("sign_up_button").classList.toggle("sign_button_active");
  document.getElementById('sign_in_form').classList.remove("form_visible");
  document.getElementById('sign_up_form').classList.toggle("form_visible");
  $(document).on('click', '.sign_button', function (e) {
    e.stopPropagation();
  });
}
