# Ride-my-way
A carpooling application that provides drivers with the ability to create ride offers and passengers to join available ride offers

[![Build Status](https://travis-ci.org/d-beloved/Ride-my-way.svg?branch=heroku-deploy-v1)](https://travis-ci.org/d-beloved/Ride-my-way) [![Coverage Status](https://coveralls.io/repos/github/d-beloved/Ride-my-way/badge.svg?branch=heroku-deploy-v1)](https://coveralls.io/github/d-beloved/Ride-my-way?branch=heroku-deploy-v1)


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
* Users can create an account and log in.
* Drivers can add ride offers..
* Passengers can view all available ride offers.
  * They can also search for available rides based on the ride's destination.
* Passengers can see the details of a ride offer and request to join the ride. E.g What time
the ride leaves, where it is headed e.t.c
* Drivers can view the requests to the ride offer they created.
* Drivers can either accept or reject a ride request.

## Available APIs
- API route that welcomes users to the application
  * GET : ```/```

- An API route that allow users to create ride offers
  * POST : ```/api/v1/rides```

- An API route that allow users to gets all available ride offers in the app
  * GET : ```/api/v1/rides```

- An API route that allow users to gets one ride offer in the app
  * GET : ```/api/v1/rides/<rideId>```
  
- An API route that allow users to delete a ride offer
  * DELETE : ```/api/v1/rides/<rideId>```

- An API route that allow users to modify a ride offer
  * PUT : ```/api/v1/rides/<rideId>```

- An API route that allow users to make a request for a ride offer
  * POST : ```/api/v1/rides/<rideId>/requests```

- An API route that allow users to get all the requests made for a ride offer
  * GET : ```/api/v1/rides/<rideId>/requests```

- An API route that allow users to get the status of the requests made for a ride offer
  * GET : ```/api/v1/rides/<rideId>/requests/<requestId>/status```


## License and Copyright
&copy; Ayodeji Moronkeji

Licensed under the [MIT License](LICENSE).


More details coming in soon...