/* -- FOOTER  START -- */
var footer = document.createElement('footer');
footer.className = "footer group";


/* FIRST ROW start */
var firstRow = document.createElement('div');
firstRow.className = "row justify-content-center";

/* SERVICE start */
var footer_Service = document.createElement('div');
footer_Service.className = "footer__service col-md-3";

/* Title start */
var service_Title = document.createElement('h5');
var title_text1 = document.createTextNode('Service');
service_Title.append(title_text1);
footer_Service.appendChild(service_Title);
/* Title end */

/* List start */
var service_list = document.createElement('ul');
/* book start */
var li_1 = document.createElement('li');
li_1.className = "footer__link";
var bookLink = document.createElement('a');
bookLink.href = "/book";
var t1 = document.createTextNode("Books");
bookLink.append(t1);
li_1.appendChild(bookLink);
service_list.appendChild(li_1);
/* book end */
/* author start */
var li_2 = document.createElement('li');
li_2.className = "footer__link";
var authorLink = document.createElement('a');
authorLink.href = "/author";
var t2 = document.createTextNode("Authors");
authorLink.append(t2);
li_2.appendChild(authorLink);
service_list.appendChild(li_2);
/* author end */
footer_Service.appendChild(service_list);
/* List end */

firstRow.appendChild(footer_Service);
/* SERVICE end */


/* ABOUT US start */
var footer_About = document.createElement('div');
footer_About.className = "footer__about col-md-3";
    
/* Title start */
var about_Title = document.createElement('h5');
var title_text2 = document.createTextNode('About');
about_Title.append(title_text2);
footer_About.appendChild(about_Title);
/* Title end */

/* List start */
var about_list = document.createElement('ul');
/* aboutUs start */
var li_3 = document.createElement('li');
li_3.className = "footer__link";
var aboutUsLink = document.createElement('a');
aboutUsLink.href = "/about-us";
var t3 = document.createTextNode("About us");
aboutUsLink.append(t3);
li_3.appendChild(aboutUsLink);
about_list.appendChild(li_3);
/* aboutUs end */
/* contacts start */
var li_4 = document.createElement('li');
li_4.className = "footer__link";
var contactUsLink = document.createElement('a');
contactUsLink.href = "/contact";
var t4 = document.createTextNode("Contact");
contactUsLink.append(t4);
li_4.appendChild(contactUsLink);
about_list.appendChild(li_4);
/* contacts end */
footer_About.appendChild(about_list);
/* List end */

firstRow.appendChild(footer_About);
/* ABOUT US end */


/* COMPANY NAME start */
var footer_Company = document.createElement('div');
footer_Company.className = "footer__info col-md-3";

/* Title start */
var company_Title = document.createElement('h5');
var title_text3 = document.createTextNode('Company Name');
company_Title.append(title_text3);
footer_Company.appendChild(company_Title);
/* Title end */

/* Name start */
/* List start */
var company_list = document.createElement('ul');
/* privacy policy start */
var li_privacy = document.createElement('li');
li_privacy.className = "footer__link";
var privacyLink = document.createElement('a');
privacyLink.href = "#";
var t_privacy = document.createTextNode("Learn our privacy policy");
privacyLink.append(t_privacy);
li_privacy.appendChild(privacyLink);
company_list.appendChild(li_privacy);
/* privacy end */
/* ordering and shipping start */
var li_order = document.createElement('li');
li_order.className = "footer__link";
var orderingLink = document.createElement('a');
orderingLink.href = "#"; //Ordering and shipping info page
var t_ordering = document.createTextNode("Learn our ordering and shipping infos");
orderingLink.append(t_ordering);
li_order.appendChild(orderingLink);
company_list.appendChild(li_order);
/* contacts end */
footer_Company.appendChild(company_list);
/* List end */
/* Name end */

firstRow.appendChild(footer_Company);
/* COMPANY NAME end */

footer.appendChild(firstRow);
/* FIRST ROW end */



/* SOCIAL start */
var footer_Social = document.createElement('div');
footer_Social.className = "footer__social";

/* facebook start */
var fb = document.createElement('a');
fb.href = "#"; //vanno bene blu le icone o no???????
var fb_i = document.createElement('i');
fb_i.className = 'fa fa-facebook';
fb.appendChild(fb_i);
footer_Social.appendChild(fb);
/* facebook end */
/* twitter start */
var twitter = document.createElement('a');
twitter.href = "#"; //vanno bene blu le icone o no???????
var tw_i = document.createElement('i');
tw_i.className = 'fa fa-twitter';
twitter.appendChild(tw_i);
footer_Social.appendChild(twitter);
/* twitter end */
/* instagram start */
var ig = document.createElement('a');
ig.href = "#"; //vanno bene blu le icone o no???????
var ig_i = document.createElement('i');
ig_i.className = 'fa fa-instagram';
ig.appendChild(ig_i);
footer_Social.appendChild(ig);
/* instagram end */

footer.appendChild(footer_Social);
/* SOCIAL end */


/* COPYRIGHT start */
var copyRight = document.createElement('p');
copyRight.className = 'footer__copyright';
var text = document.createTextNode('© Company name 2019');
copyRight.append(text);
footer.appendChild(copyRight);
/* COPYRIGHT end */


document.body.appendChild(footer);
/* -- FOOTER  END -- */