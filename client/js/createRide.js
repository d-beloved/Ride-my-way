/* eslint-disable no-undef */
const alertLog = document.getElementById('alertLog');
const alertMessage = document.getElementById('alertMessage');
const errorMessage = document.querySelectorAll('.error');
const user = document.getElementById('user');

const { requestForm } = document.forms;
const {
  type, category, requestItem, description,
} = requestForm.elements;

user.innerText = localStorage.getItem('user');

const displayErrorMessages = (error) => {
  if (error.type) {
    const [typeError] = error.type;
    errorMessage[0].classList.add('display-error');
    errorMessage[0].innerText = typeError;
  }

  if (error.category) {
    const [categoryError] = error.category;
    errorMessage[1].classList.add('display-error');
    errorMessage[1].innerText = categoryError;
  }

  if (error.item) {
    const [itemError] = error.item;
    errorMessage[2].classList.add('display-error');
    errorMessage[2].innerText = itemError;
  }

  if (error.description) {
    const [descriptionError] = error.description;
    errorMessage[3].classList.add('display-error');
    errorMessage[3].innerText = descriptionError;
  }
};

const clearErrorMeassage = (e) => {
  e.target.parentElement.nextElementSibling.innerText = '';
  e.target.parentElement.nextElementSibling.classList.remove('display-error');
};

const createRequest = (e) => {
  e.preventDefault();
  const requestDetails = {
    type: type.value,
    category: category.value,
    item: requestItem.value,
    description: description.value,
  };

  const token = localStorage.getItem('token');

  const option = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(requestDetails),
  };

  fetch(
    'https://maintenance-tracker-stv.herokuapp.com/api/v1/users/requests',
    option,
  ).then((response) => {
    if (response.status === 409) {
      alertLog.style.display = 'block';
      alertLog.classList.add('fail');
      alertMessage.innerText = 'request already exist';
      clearMessage();
    }

    return response.json();
  })
    .then((response) => {
      if (response.status === 'success') {
        alertLog.style.display = 'block';
        alertLog.classList.remove('fail');
        alertLog.classList.add('success');
        alertMessage.innerText = response.message;
        clearMessage();
        window.location.href =
        'https://maintenance-tracker-stv.herokuapp.com/user-view-requests.html';
      }

      if (response.status === 'fail') {
        displayErrorMessages(response.data.errors);
      }
    })
    .catch(err => err.message);
};

type.addEventListener('focus', clearErrorMeassage);
category.addEventListener('focus', clearErrorMeassage);
requestItem.addEventListener('focus', clearErrorMeassage);
description.addEventListener('focus', clearErrorMeassage);
requestForm.addEventListener('submit', createRequest);
