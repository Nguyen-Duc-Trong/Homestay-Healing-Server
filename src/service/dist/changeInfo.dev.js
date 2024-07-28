"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeInfo = void 0;

var _models = _interopRequireDefault(require("../models"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _uploadService = require("../service/uploadService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var hashPassword = function hashPassword(password) {
  return _bcryptjs["default"].hashSync(password, _bcryptjs["default"].genSaltSync(10));
};

var changeInfo = function changeInfo(req) {
  return regeneratorRuntime.async(function changeInfo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", new Promise(function _callee(resolve, reject) {
            var _req$body, id, password, username, zalo, phone, newPassword, avatar, user, isPasswordValid, newAvatar, result, updatedUser;

            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _req$body = req.body, id = _req$body.id, password = _req$body.password, username = _req$body.username, zalo = _req$body.zalo, phone = _req$body.phone, newPassword = _req$body.newPassword;
                    console.log(req.body);
                    avatar = req.file;
                    _context.next = 6;
                    return regeneratorRuntime.awrap(_models["default"].User.findOne({
                      where: {
                        id: id
                      },
                      raw: true
                    }));

                  case 6:
                    user = _context.sent;

                    if (user) {
                      _context.next = 10;
                      break;
                    }

                    reject({
                      message: 'User not found'
                    });
                    return _context.abrupt("return");

                  case 10:
                    isPasswordValid = _bcryptjs["default"].compareSync(password, user.password);

                    if (isPasswordValid) {
                      _context.next = 14;
                      break;
                    }

                    reject({
                      message: 'Invalid password'
                    });
                    return _context.abrupt("return");

                  case 14:
                    // console.log(data);
                    // console.log(avatar);
                    newAvatar = '';

                    if (!avatar) {
                      _context.next = 20;
                      break;
                    }

                    _context.next = 18;
                    return regeneratorRuntime.awrap((0, _uploadService.uploadToCloudinary)(avatar));

                  case 18:
                    result = _context.sent;
                    newAvatar = result.url;

                  case 20:
                    _context.next = 22;
                    return regeneratorRuntime.awrap(_models["default"].User.update({
                      id: id || user.id,
                      name: username || user.name,
                      password: newPassword ? hashPassword(newPassword) : user.password,
                      phone: phone || user.phone,
                      zalo: zalo || user.zalo,
                      avatar: newAvatar || user.avatar
                    }, {
                      where: {
                        id: id
                      }
                    }));

                  case 22:
                    _context.next = 24;
                    return regeneratorRuntime.awrap(_models["default"].User.findOne({
                      where: {
                        id: id
                      },
                      raw: true
                    }));

                  case 24:
                    updatedUser = _context.sent;
                    resolve(updatedUser);
                    _context.next = 31;
                    break;

                  case 28:
                    _context.prev = 28;
                    _context.t0 = _context["catch"](0);
                    reject(_context.t0);

                  case 31:
                  case "end":
                    return _context.stop();
                }
              }
            }, null, null, [[0, 28]]);
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.changeInfo = changeInfo;