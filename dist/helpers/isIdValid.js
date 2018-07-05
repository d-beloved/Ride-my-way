'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// checks if the entered Id is a number
var idValidator = function idValidator(req, res, next) {
  var testId = req.params.requestId;
  if (req.params.rideId) {
    testId = req.params.rideId;
  }
  var id = parseInt(testId, 10);
  if (!id || id < 0 || id !== Number(testId)) return res.status(400).json({ message: 'You passed an invalid ID' });
  next();
};
exports.default = idValidator;