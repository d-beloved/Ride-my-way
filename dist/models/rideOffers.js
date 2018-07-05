"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var rideModel = "\n  DROP TABLE IF EXISTS Ride_offers CASCADE;\n  CREATE TABLE Ride_offers (\n      rideId serial PRIMARY KEY,\n      userId INTEGER REFERENCES Users(userid),\n      message TEXT NOT NULL,\n      destination VARCHAR(255) NOT NULL,\n      depart VARCHAR(255) NOT NULL,\n      date DATE NOT NULL,\n      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n  );\n";

var rideDb = "" + rideModel;

exports.default = rideDb;