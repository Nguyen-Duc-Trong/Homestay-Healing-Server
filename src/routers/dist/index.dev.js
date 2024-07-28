"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initRouter = function initRouter(app) {
  app.use('/api/v1/auth', _auth["default"]);
  return app.use('/', function (req, res) {
    res.send('Ơn giời...code chạy đây rồi -)))');
  });
};

var _default = initRouter;
exports["default"] = _default;