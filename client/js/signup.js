/* eslint-disable no-undef */
/* eslint-disable no-alert */
const errorMessage = document.getElementsByClassName('error');
const signupBtn = document.getElementById('submitBtn');
const signupForm = document.getElementById('signupForm');
const route = '/api/v1/auth/signup';

const checkPassword = () => {
  if (signupForm.confirmPassword.value &&
    (signupForm.password.value !== signupForm.confirmPassword.value)) {
    errorMessage[0].classList.add('display-error');
    errorMessage[0].innerHTML = 'password does not match';
    signupBtn.disabled = true;
  }

  if (signupForm.confirmPassword.value === signupForm.password.value) {
    errorMessage[0].innerHTML = '';
    errorMessage[0].remove('display-error');
    signupBtn.disabled = false;
  }
};

const createAccount = (evt) => {
  evt.preventDefault();
  const headers = new Headers({
    'content-type': 'application/json',
  });
  const userDetails = {
    firstname: signupForm.Firstname.value,
    lastname: signupForm.lastname.value,
    phoneno: Number(signupForm.Phoneno.value.split('').splice(1).join('')),
    username: signupForm.username.value,
    email: signupForm.email.value,
    password: signupForm.password.value,
  };
  
  fetch(route, {
    method: 'POST',
    body: JSON.stringify(userDetails),
    headers,
  })
    .then(res => Promise.all([res.json(), res]))
    .then(([data, res]) => {
      if (!res.ok) {
        return alert(JSON.stringify(data));
      }
      window.location.href = '/profile.html';
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
    })
    .catch(error => alert(error.message));
};

signupForm.confirmPassword.addEventListener('input', checkPassword);
signupForm.password.addEventListener('input', checkPassword);
signupForm.addEventListener('submit', createAccount);
