"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var requestModel = "\n  DROP TABLE IF EXISTS Requests;\n  DROP TYPE IF EXISTS status_allowed;\n  CREATE TYPE status_allowed AS ENUM (\n    'accepted',\n    'pending',\n    'rejected'\n  );\n\n  CREATE TABLE Requests (\n      requestId serial PRIMARY KEY,\n      userId INTEGER REFERENCES Users(userid),\n      rideId INTEGER REFERENCES Ride_offers(rideid),\n      status status_allowed NOT NULL DEFAULT 'pending',\n      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,\n      UNIQUE(userId,rideId)\n  );\n";

var requestDb = "" + requestModel;

exports.default = requestDb;