/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const modalTable = document.querySelector('#details');
const modal = document.querySelector('.modal');
const span = document.querySelector('.close');
const allRides = document.getElementById('rides');
const alertMsg = document.getElementById('alert');
const errMessage = document.querySelector('#errMessage');
const route = '/api/v1/rides';

const getAllRides = () => {
  fetch(route, {
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (data.rides.length < 1) {
        alertMsg.classList.add('fail');
        alertMsg.innerHTML = 'No Ride available at the moment. Check back later please';
      } else {
        const rideOffer = data.rides;
        return rideOffer.map((ride) => {
          let rideDetails = '';
          rideDetails += `
          <table class="ride-table">
            <tr class="row">
              <td> ${ride.driverdetails}</td>
              <td> ${ride.destination}</td>
              <td> ${ride.departurelocation}</td>
              <td> ${moment(ride.date).format('MMM Do YY')}</td>
              <td>
                <button class="button" onclick="getSpecificRide(${ride.rideid})">View Details</button>
              </td>
                </tr>
            </table>
            `;
          allRides.innerHTML += rideDetails;
        });
      }
    });
};
window.onload = getAllRides('#rides');


// Getting the details of one ride
const getSpecificRide = (rideId) => {
  let rideDetails = '';
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'sign-up.html';
  }
  modal.style.display = 'block';
  errMessage.style.display = 'none';
  modalTable.innerHTML = '';
  span.onclick = () => {
    modal.style.display = 'none';
  };
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  };
  const oneRideRoute = `api/v1/rides/${rideId}`;
  fetch(oneRideRoute, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (data.success) {
        const ride = data.ride;
        rideDetails = `
        <table class="ride-table">
          <tr>
            <td>Message:</td>
            <td>${ride.message}</td>
          </tr>
          <tr>
            <td>Driver name:</td>
            <td>${ride.driverdetails}</td>
          </tr>
          <tr>
            <td>Destination: </td>
            <td>${ride.destination}</td>
          </tr>
          <tr>
            <td>Departure terminal:</td>
            <td>${ride.departurelocation}</td>
          </tr>
          <tr>
            <td> Departure date: </td>
            <td> ${moment(ride.date).format('MMM Do YY')}</td>
          </tr>
        </table>
          <button class="trip-btn modal-btn" onclick="requestRide(${rideId})">Request Ride</button>
        `;
        modalTable.innerHTML = rideDetails;
      } else {
        window.location.href = 'sign-in.html';
      }
    });
};

const requestRide = (rideId) => {
  const token = localStorage.getItem('token');
  const request = `api/v1/rides/${rideId}/requests`;
  fetch(request, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then((data) => {
      if (data.success) {
        errMessage.setAttribute('style', 'display: none;');
        swal({
          title: 'Congrats!',
          text: data.message,
          icon: 'success',
        });
      } else {
        errMessage.setAttribute('style', 'display: none;');
        swal({
          title: 'Error!',
          text: 'You have requested for this ride already, or you own this ride',
          icon: 'error',
        });
      }
    });
};
