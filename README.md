# Ride-my-way

A carpooling application that provides drivers with the ability to create ride offers and passengers to join available ride offers

[![Build Status](https://travis-ci.org/d-beloved/Ride-my-way.svg?branch=develop)](https://travis-ci.org/d-beloved/Ride-my-way) [![Coverage Status](https://coveralls.io/repos/github/d-beloved/Ride-my-way/badge.svg?branch=develop)](https://coveralls.io/github/d-beloved/Ride-my-way?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/9a71cfbdbaa14210a7b6/maintainability)](https://codeclimate.com/github/d-beloved/Ride-my-way/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/9a71cfbdbaa14210a7b6/test_coverage)](https://codeclimate.com/github/d-beloved/Ride-my-way/test_coverage)


The UI template for the app can be accessed [ here ](https://d-beloved.github.io/Ride-my-way/UI/).

The endpoints are hosted on heroku [ here ](https://ayo-ride-my-way-v1.herokuapp.com/api/v1).

## Made With
  ### UI
    * HTML for writing the webpage
    * CSS for styling
    * Javascript to add some behaviour
  
  ### Server
    * Nodejs for server-side logic
    * Babel for transpiling
    * Express for api routes implementation
    * Heroku for hosting services
    * PostgreSql for the App database

  ### Continuous Integration
    * Travis CI & Codeclimate for test automation
    * Coveralls for test coverage report
  
  ### Test-Driven Development
    * Mocha & Chai for api route testing

## Installation.
  * Install [Nodejs](https://nodejs.org/en/download/)
  * Clone this repo ``` git clone https://github.com/d-beloved/WEconnect.git ```
  * Run ```npm install``` to install the required dependencies
  * Run ```npm test``` to fireup the tests
  * Navigate to http://localhost:3110/api/v1/

## Features of the template
* Users can Signup and log in on the app.
* Drivers can add ride offers..
* Passengers can view all available ride offers.
* Passengers can see the details of a ride offer and request to join the ride. E.g What date
the ride leaves, where it is headed e.t.c
* Passengers can make a request for an available ride
* Drivers can view the requests to the ride offer they created.
* Drivers can either accept or reject a ride request.

## Available APIs
<table>
  <tr>
      <th>HTTP REQUEST VERB</th>
      <th>API ENDPOINT/PATH</th>
      <th>ACTION</th>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/</td>
      <td>Welcomes users to the application</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/signup</td>
      <td>Registers a new user on the app</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/auth/login</td>
      <td>Logs in a registered user</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/users/rides</td>
      <td>Allows users to create ride offers</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/rides</td>
      <td>Gets all avalaible ride offers in the app</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/rides/:rideId</td>
      <td>Gets one ride offer in the app</td>
  </tr>
  <tr>
      <td>POST</td>
      <td>/api/v1/rides/:rideId/requests</td>
      <td>Makes a request for a ride offer</td>
  </tr>
  <tr>
      <td>GET</td>
      <td>/api/v1/users/rides/:rideId/requests</td>
      <td>Get all request for a ride offer</td>
  </tr>
  <tr>
      <td>PUT</td>
      <td>/api/v1/users/rides/:rideId/requests/:requestId</td>
      <td>Accepts or rejects a ride offer</td>
  </tr>
</table>

For more details on how to use this API, check the **Documentation** out [ here ](https://ayo-ride-my-way-v1.herokuapp.com/documentation).

## License and Copyright
&copy; Ayodeji Moronkeji

Licensed under the [MIT License](LICENSE).
