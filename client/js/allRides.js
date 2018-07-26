/* eslint-disable no-undef */
/* eslint-disable no-alert */
const allRides = document.getElementById('rides');
const alertMsg = document.getElementById('alert');
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
      }
      else {
        const rideOffer = data.rides;
        return rideOffer.map((ride) => {
          let rideDetails = '';
          rideDetails += `
          <table class="ride-table">
            <tr class="row">
              <td> ${ride.driverdetails}</td>
              <td> ${ride.destination}</td>
              <td> ${ride.departurelocation}</td>
              <td> ${ride.date}</td>
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
