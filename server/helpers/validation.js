import validator from 'validator';
import db from '../dummyData';

const { rideOffer } = db;

/**
 * @description - This validates all the entries into the app
 */
class Validation {
  /**
   * @description Trims body values
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
  static removeWhiteSpaces(req, res, next) {
    // trim body values
    if (req.body) {
      Object.keys(req.body).forEach((k) => {
        const value = req.body[k];
        // trim value if body exist
        if ((typeof value === 'string' || value instanceof String)
        && value !== undefined) req.body[k] = req.body[k].trim();
      });
    }
    next();
  }

  /**
   * @description Checks if request body contains required keys
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
  static checkBodyContains(...params) {
    return (req, res, next) => {
      /* eslint-disable no-restricted-syntax */
      for (const p of params) {
        if (req.body[p] === undefined || req.body[p] === '') {
          return res.status(400).send({
            message: `${p} cannot be missing in the body!`
          });
        }
      }
      next();
    };
  }

  /**
   * @description Confirms entered date
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
  static confirmDate(req, res, next) {
    // checks if the date entered is valid and in the future
    if (req.body.date && !validator.isAfter(req.body.date)) {
      return res.status(406).send({
        message: 'Please enter a valid date in this format (YYYY-MM-DD)',
      });
    }
    next();
  }

  /**
   * @description Checks if fee is an integer
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
  static confirmFeeType(req, res, next) {
    // checks if the fee entered is a valid currency
    if (req.body.fee && !validator.isInt(req.body.fee, { allow_leading_zeroes: false })) {
      return res.status(406).send({
        message: 'Please enter a valid amount for the ride',
      });
    }
    next();
  }

  /**
   * @description Checks if a ride offer exists already before creation
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
  static rideOfferExists(req, res, next) {
    const driver = req.body.driverName;
    const destinatn = req.body.destination;
    const same = rideOffer.findIndex(oneRide => oneRide.driverName === driver &&
      oneRide.destination === destinatn);
    if (same === -1) {
      next();
    }
    return res.status(406).json({
      message: 'A Ride Offer with same detail is found!',
    });
  }
}

export default Validation;
