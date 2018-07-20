/* eslint-disable no-undef */
const alertLog = document.getElementById('alertLog');
const alertMessage = document.getElementById('alertMessage');
const errorMessage = document.querySelectorAll('.error');
const signupBtn = document.getElementById('submitBtn');
const { signupForm } = document.forms;
const {
  Firstname, lastname, Phoneno, username, email,
  password, confirmPassword
} = signupForm.elements;

const checkPassword = () => {
  if (confirmPassword.value && (password.value !== confirmPassword.value)) {
    errorMessage[6].classList.add('display-error');
    errorMessage[6].innerHTML = 'password does not match';
    signupBtn.disabled = true;
  }

  if (confirmPassword.value === password.value) {
    errorMessage[6].innerHTML = '';
    errorMessage[6].remove('display-error');
    signupBtn.disabled = false;
  }
};

const displayErrorMessages = (error) => {
  if (error.Firstname) {
    const [firstNameError] = error.Firstname;
    errorMessage[0].classList.add('display-error');
    errorMessage[0].innerHTML = firstNameError;
  }

  if (error.lastname) {
    const [lastNameError] = error.lastname;
    errorMessage[1].classList.add('display-error');
    errorMessage[1].innerHTML = lastNameError;
  }

  if (error.Phoneno) {
    const [phoneNoError] = error.Phoneno;
    errorMessage[2].classList.add('display-error');
    errorMessage[2].innerHTML = phoneNoError;
  }

  if (error.username) {
    const [usernameError] = error.username;
    errorMessage[3].classList.add('display-error');
    errorMessage[3].innerHTML = usernameError;
  }

  if (error.email) {
    const [emailError] = error.email;
    errorMessage[4].classList.add('display-error');
    errorMessage[4].innerHTML = emailError;
  }

  if (error.password) {
    const [passwordError] = error.password;
    errorMessage[5].classList.add('display-error');
    errorMessage[5].innerHTML = passwordError;
  }
};

const clearErrorMessage = (e) => {
  e.target.parentElement.nextElementSibling.innerText = '';
  e.target.parentElement.nextElementSibling.classList.remove('display-error');
};

const redirectUser = () => {
  window.location.href = '/profile.html';
};

const createAccount = (e) => {
  e.preventDefault();
  // Insert values into the request body
  const userDetails = {
    firstname: Firstname.value,
    lastname: lastname.value,
    phoneno: Phoneno.value,
    username: username.value,
    email: email.value,
    password: password.value,
  };
  console.log(userDetails);

  const option = {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(
    '/api/v1/auth/signup',
    option,
  ).then((res) => {
    if (res.status === 409) {
      alertLog.style.display = 'block';
      alertLog.classList.add('fail');
      alertMessage.innerText = 'User with this email and/or username already exist';
    }
    return res.json();
  })
    .then((res) => {
      if (res.status === 'success') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', username);
        alertLog.style.display = 'block';
        alertLog.classList.add('success');
        alertMessage.innerText = res.message;
        redirectUser();
      }

      if (res.status === 406) {
        displayErrorMessages(res.data.errors);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

confirmPassword.addEventListener('input', checkPassword);
Firstname.addEventListener('focus', clearErrorMessage);
lastname.addEventListener('focus', clearErrorMessage);
Phoneno.addEventListener('focus', clearErrorMessage);
username.addEventListener('focus', clearErrorMessage);
email.addEventListener('focus', clearErrorMessage);
password.addEventListener('focus', clearErrorMessage);
password.addEventListener('input', checkPassword);
signupForm.addEventListener('submit', createAccount);
