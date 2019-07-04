/*-------------------
  CHOICE FUNCTIONS
---------------------*/

/* Called when user clicks SignIn button */
function select_SignIn() {
  document.getElementById('signIn').classList.toggle('sign_mode_active');
  document.getElementById('signUp').classList.remove('sign_mode_active');
  document.getElementById('signIn_form').classList.remove('form_inactive');
  document.getElementById('signUp_form').classList.toggle('form_inactive');
}

/* Called when user clicks SignUp button */
function select_SignUp() {
  document.getElementById('signIn').classList.remove('sign_mode_active');
  document.getElementById('signUp').classList.toggle('sign_mode_active');
  document.getElementById('signIn_form').classList.toggle('form_inactive');
  document.getElementById('signUp_form').classList.remove('form_inactive');
}

/* Called when user clicks the eye icon in the password input box */
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




/*---------------------------
  AUTHENTICATION FUNCTIONS
----------------------------*/

/* Called when user try to signIn */
function signIn() {
  var uName = document.getElementById('signIn_username').value;
  var password = document.getElementById('signIn_password').value;
  
  if(uName!="" && password!=""){
    $.ajax({
      url: '/login',
      type: 'POST',
      data: {
        username: uName,
        password: password
      },
      dataType: 'json',
      success: (data) => { 
        if(data){
          localStorage.setItem('logged', 'true');
          localStorage.setItem('username', uName);
          window.location.href = "../index.html";
        }  
      },
      error: (err) => { 
        if(err.status === 404){ alert('ERROR:\nusername or password not correct') }
        else { alert('ERROR:\nThere are problems on our server.\n\nPlease retry.\nIf the problem persists, please contact our service center') }
      }
    })
  }
  else if(uName==""){ alert('ERROR:\nMissing username') }
  else if(password==""){ alert('ERROR:\nMissing password') }
}
  
/* Called when user try to signUp */
function signUp() {
  var name = document.getElementById('signUp_name').value;
  var surname = document.getElementById('signUp_surname').value;
  var uName = document.getElementById('signUp_username').value;
  var email = document.getElementById('signUp_email').value;
  var password = document.getElementById('signUp_password').value;
  var confPassword = document.getElementById('signUp_conf_password').value;
  
  if(uName!="" && password!="" && password==confPassword){
    $.ajax({
      url: '/register',
      type: 'POST',
      data: {
        username: uName,
        password: password,
        name: name,
        surname: surname,
        email: email
      },
      dataType: 'json',
      success: (data) => {
        alert('user correctly registered.\nPlease Sign In to complete the operation');
        console.log(data);
      },
      error: (err) => { 
        if(err.status === 400 ){ alert('ERROR:\nUsername already existing.\n\nPlease retry'); }
        else { alert('ERROR:\nThere are problems on our server.\n\nPlease retry.\nIf the problem persists, please contact our service center') } 
      }
    })
  }
  else if(uName!="" && password!="" && password!=confPassword) { alert('ERROR:\nThe password inserted not match.\n\nPlease retry'); }
  else if(uName=="") { alert('ERROR:\nMissing username.\n\nPlease retry'); }
  else if(password=="") { alert('ERROR:\nMissing password.\n\nPlease retry'); }
}