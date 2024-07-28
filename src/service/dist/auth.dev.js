"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginService = exports.registerService = void 0;

var _models = _interopRequireDefault(require("../models"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _uuid = require("uuid");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

_dotenv["default"].config();

var hashPassword = function hashPassword(password) {
  return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
};

var getFirst10Chars = function getFirst10Chars() {
  var id = (0, _uuid.v4)();
  return id.substring(0, 10);
};

var registerService = function registerService(_ref) {
  var name = _ref.name,
      phone = _ref.phone,
      password = _ref.password;
  return new Promise(function _callee(resolve, reject) {
    var _ref2, _ref3, user, created, token;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_models["default"].User.findOrCreate({
              where: {
                phone: phone
              },
              defaults: {
                phone: phone,
                name: name,
                password: hashPassword(password),
                id: getFirst10Chars(),
                rules: "user",
                money: 0,
                avatar: "https://res.cloudinary.com/drorqx56b/image/upload/v1717259463/uc7wg33is5xhmk57vuye.png"
              }
            }));

          case 3:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            user = _ref3[0];
            created = _ref3[1];
            token = created && _jsonwebtoken["default"].sign({
              id: user.id,
              phone: user.phone
            }, process.env.SECRET_KEY, {
              expiresIn: '1d'
            });
            resolve({
              err: token ? 0 : 2,
              msg: token ? 'Đăng kí thành công' : 'Tài khoản đã tồn tại',
              token: token || null,
              username: token ? user.name : " ",
              phone: token ? user.phone : " ",
              id: token ? user.id : " ",
              rules: token ? user.rules : " ",
              money: token ? user.money : " ",
              avatar: token ? user.avatar : " "
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 11]]);
  });
};

exports.registerService = registerService;

var loginService = function loginService(_ref4) {
  var phone = _ref4.phone,
      password = _ref4.password;
  return new Promise(function _callee2(resolve, reject) {
    var user, isCorrectPassword, token;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_models["default"].User.findOne({
              where: {
                phone: phone
              },
              raw: true
            }));

          case 3:
            user = _context2.sent;
            console.log(user);
            isCorrectPassword = user && _bcryptjs["default"].compareSync(password, user.password);
            token = isCorrectPassword && _jsonwebtoken["default"].sign({
              id: user.id,
              phone: user.phone
            }, process.env.SECRET_KEY, {
              expiresIn: '1d'
            });
            resolve({
              err: token ? 0 : 2,
              msg: token ? 'Đăng nhập thành công' : response ? 'Sai mật khẩu' : 'Số điện thoại chưa tồn tại',
              token: token || null,
              username: token ? user.name : " ",
              phone: token ? user.phone : " ",
              id: token ? user.id : " ",
              rules: token ? user.rules : " ",
              money: token ? user.money : " ",
              avatar: token ? user.avatar : " "
            });
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 10]]);
  });
};

exports.loginService = loginService;