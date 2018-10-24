/* eslint-disable no-undef */
/* eslint-disable no-alert */
const signinForm = document.getElementById('signinForm');
const route = '/api/v1/auth/login';

const signinUser = (evt) => {
  evt.preventDefault();
  const headers = new Headers({
    'content-type': 'application/json',
  });
  const loginDetails = {
    email: signinForm.email.value,
    password: signinForm.password.value,
  };
  
  fetch(route, {
    method: 'POST',
    body: JSON.stringify(loginDetails),
    headers,
  })
    .then(res => Promise.all([res.json(), res]))
    .then(([data, res]) => {
      if (!res.ok) {
        return alert(JSON.stringify(data));
      }
      window.location.href = '/profile.html';
      localStorage.setItem('token', data.authToken);
      localStorage.setItem('user', JSON.stringify(data.signedInUser));
    })
    .catch(error => alert(error.message));
};

signinForm.addEventListener('submit', signinUser);
