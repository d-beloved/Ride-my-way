"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var userModel = "\n  DROP TABLE IF EXISTS Users CASCADE;\n  CREATE TABLE Users (\n      userId serial PRIMARY KEY,\n      username VARCHAR(255) UNIQUE NOT NULL,\n      email VARCHAR(255) UNIQUE NOT NULL,\n      password VARCHAR(255) NOT NULL,\n      createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\n  );\n";

var userdb = "" + userModel;

exports.default = userdb;