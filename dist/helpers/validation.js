'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @description - This validates all the entries into the app
 */
var Validation = function () {
  function Validation() {
    _classCallCheck(this, Validation);
  }

  _createClass(Validation, null, [{
    key: 'trimsRequestBody',

    /**
     * @description Trims body values
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{Function} next
     */
    value: function trimsRequestBody(req, res, next) {
      // trim body values
      if (req.body) {
        Object.keys(req.body).forEach(function (k) {
          var value = req.body[k];
          // trim value if body exist
          if ((typeof value === 'string' || value instanceof String) && value !== undefined) req.body[k] = req.body[k].trim();
        });
      }
      next();
    }

    /**
     * @description Checks if value is a string
     * @param{Object} req - api request
     * @param{Object} res - route response
     * @param{Function} next - next middleware
     * @return{Function} next
     */

  }, {
    key: 'isString',
    value: function isString() {
      for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }

      return function (req, res, next) {
        /* eslint-disable no-restricted-syntax */
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = params[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var p = _step.value;

            if (typeof req.body[p] !== 'string') {
              return res.status(400).send({
                message: 'field ' + p + ' should be a string, Re-enter the value please'
              });
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
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

  }, {
    key: 'checkBodyContains',
    value: function checkBodyContains() {
      for (var _len2 = arguments.length, params = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }

      return function (req, res, next) {
        /* eslint-disable no-restricted-syntax */
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = params[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var p = _step2.value;

            if (req.body[p] === undefined || req.body[p] === '') {
              return res.status(400).send({
                message: p + ' cannot be missing in the body!'
              });
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
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

  }, {
    key: 'confirmEmail',
    value: function confirmEmail(req, res, next) {
      // checks if the email entered is valid
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email) === false) {
        return res.status(406).send({
          message: 'Please enter a valid email'
        });
      }
      return next();
    }
  }]);

  return Validation;
}();

exports.default = Validation;