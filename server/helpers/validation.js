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
  static trimsRequestBody(req, res, next) {
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
   * @description Checks if its string that is entered
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
  static checkIfString(...params) {
    return (req, res, next) => {
    /* eslint-disable no-restricted-syntax */
      for (const p of params) {
        const value = req.body[p];
        if (typeof value !== 'string') {
          return res.status(400).send({
            message: `${p} must be a string value!`,
            success: false
          });
        }
      }
      next();
    };
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
            message: `${p} cannot be missing in the body!`,
            success: false
          });
        }
      }
      next();
    };
  }

  /**
   * @description Confirms that the email is valid
   * @param{Object} req - api request
   * @param{Object} res - route response
   * @param{Function} next - next middleware
   * @return{Function} next
   */
  static confirmEmail(req, res, next) {
    // checks if the email entered is valid
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) === false) {
      return res.status(406).send({
        message: 'Please enter a valid email',
        success: false
      });
    }
    return next();
  }
}

export default Validation;
