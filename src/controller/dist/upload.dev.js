"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = void 0;

var _uploadService = require("../service/uploadService");

var uploadFile = function uploadFile(req, res, next) {
  var result;
  return regeneratorRuntime.async(function uploadFile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.file) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "No file uploaded"
          }));

        case 2:
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _uploadService.uploadToCloudinary)(req.file));

        case 5:
          result = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            url: result.url
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", res.status(500).json({
            error: _context.t0
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

exports.uploadFile = uploadFile;