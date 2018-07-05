'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createToken = function () {
  function createToken() {
    _classCallCheck(this, createToken);
  }

  _createClass(createToken, null, [{
    key: 'token',

    /**
     * @description Method to generate authentication token
     * @param {Object} user
     * @param {string} secretKey
     * @return {String} returns token
     */
    value: function token(user, secretKey) {
      var authToken = _jsonwebtoken2.default.sign(user, secretKey, { expiresIn: '24h' });

      return authToken;
    }
  }]);

  return createToken;
}();

exports.default = createToken;