function select_SignIn() {
  document.getElementById('signIn').classList.toggle('sign_mode_active');
  document.getElementById('signUp').classList.remove('sign_mode_active');
  document.getElementById('signIn_form').classList.remove('form_inactive');
  document.getElementById('signUp_form').classList.toggle('form_inactive');
}

function select_SignUp() {
  document.getElementById('signIn').classList.remove('sign_mode_active');
  document.getElementById('signUp').classList.toggle('sign_mode_active');
  document.getElementById('signIn_form').classList.toggle('form_inactive');
  document.getElementById('signUp_form').classList.remove('form_inactive');
}

function showHidePassword(element, input_id) {
  if(element.classList.contains('fa-eye-slash')){ 
    element.classList.remove('fa-eye-slash');
    element.classList.toggle('fa-eye');
    document.getElementById(input_id).setAttribute('type', 'text');
  }else {
    element.classList.remove('fa-eye');
    element.classList.toggle('fa-eye-slash');
    document.getElementById(input_id).setAttribute('type', 'password');
  }
}


function signIn() {
  var uName = document.getElementById('signIn_username').value;
  var password = document.getElementById('signIn_password').value;
  
  //DO BACK END SIGN IN --- al momento fittizio ---
  var request = new XMLHttpRequest();
  request.open("GET", "../assets/jsonFiles/users.json", false);
  request.send(null);
  var my_JSON_object = JSON.parse(request.responseText);
  var users = my_JSON_object.users;
  // --- end back end sign in fittizio ---
  
  var existingUser = areCredentialsCorrect(users, uName, password);
  
  if(existingUser){ 
    sessionStorage.setItem('logged', 'true');
    sessionStorage.setItem('username', uName);
    window.location.reload();
  }else{
    alert('user or password not correct');
  }
}
  
function areCredentialsCorrect(users, username, password){
  var i;
  for(i=0; i<users.length; i++){
    if(users[i].username == username  &&  users[i].password == password ){ return true; }
  }
  return false;
}
    
function signUp() {
  var name = document.getElementById('signUp_name').value;
  var surname = document.getElementById('signUp_surname').value;
  var uName = document.getElementById('signUp_username').value;
  var email = document.getElementById('signUp_email').value;
  var password = document.getElementById('signUp_password').value;
  var confPassword = document.getElementById('signUp_conf_password').value;
  
  alert('registration not yet implemented');
  
  //DO BACK END SIGN UP
  
  //sessionStorage.setItem('logged', 'true');
  //sessionStorage.setItem('username', uName);
  //window.location.reload();
}