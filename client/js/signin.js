/* eslint-disable no-undef */
const alertLog = document.getElementById('alertLog');
const alertMessage = document.getElementById('alertMessage');
const errorMessage = document.querySelectorAll('.error');
const { signinForm } = document.forms;
const { email, password } = signinForm.elements;

const displayErrorMessages = (error) => {

  if (error.email) {
    const [emailError] = error.email;
    errorMessage[0].classList.add('display-error');
    errorMessage[0].innerHTML = emailError;
  }

  if (error.password) {
    const [passwordError] = error.password;
    errorMessage[1].classList.add('display-error');
    errorMessage[1].innerHTML = passwordError;
  }
};

const clearErrorMessage = (e) => {
  e.target.parentElement.nextElementSibling.innerText = '';
  e.target.parentElement.nextElementSibling.classList.remove('display-error');
};

const redirectUser = () => {
  window.location.href = '/profile.html';
};

const signinUser = (e) => {
  e.preventDefault();
  // Insert values into the request body
  const userDetails = {
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
    '/api/v1/auth/login',
    option,
  ).then(res => res.json())
    .then((data) => {
      if (data.status === 'success') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', username);
        alertLog.style.display = 'block';
        alertLog.classList.add('success');
        alertMessage.innerText = res.message;
      }
      redirectUser();
    })
    .catch((err) => {
      displayErrorMessages(res.data.errors);
      console.log(err);
    });
};

email.addEventListener('focus', clearErrorMessage);
password.addEventListener('focus', clearErrorMessage);
signinForm.addEventListener('submit', signinUser);
