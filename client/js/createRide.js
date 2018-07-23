/* eslint-disable no-undef */
/* eslint-disable no-alert */
const alertLog = document.getElementById('alertLog');
const successMessage = document.getElementById('alertMessage');
const createRide = document.getElementById('createRide');
const route = '/api/v1/users/rides';
const token = `Bearer ${localStorage.getItem('token')}`;

const createRideOffer = (evt) => {
  evt.preventDefault();
  const headers = new Headers({
    'content-type': 'application/json',
    authorization: token
  });
  const rideDetails = {
    message: createRide.message.value,
    destination: createRide.destination.value,
    departurelocation: createRide.departureLocation.value,
    date: createRide.date.value
  };
  
  fetch(route, {
    method: 'POST',
    body: JSON.stringify(rideDetails),
    headers,
  })
    .then(res => Promise.all([res.json(), res]))
    .then(([data, res]) => {
      if (!res.ok) {
        return alert(JSON.stringify(data));
      }
      alertLog.style.display = 'block';
      alertLog.classList.add('success');
      successMessage.innerText = 'Ride Created Successfully!';
      clearMessage();
      window.location.href = '/profile.html';
    })
    .catch(error => alert(error.message));
};

createRide.addEventListener('submit', createRideOffer);
