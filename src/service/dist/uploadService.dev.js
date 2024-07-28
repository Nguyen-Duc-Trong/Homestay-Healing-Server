"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadToCloudinary = void 0;

var _cloudinary = require("cloudinary");

var _streamifier = _interopRequireDefault(require("streamifier"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

var uploadToCloudinary = function uploadToCloudinary(file) {
  return new Promise(function (resolve, reject) {
    var stream = _cloudinary.v2.uploader.upload_stream(function (error, result) {
      if (error) {
        console.error("Upload error:", error);
        reject(error);
      } else {
        console.log("Upload successful:", result);
        resolve(result);
      }
    });

    _streamifier["default"].createReadStream(file.buffer).pipe(stream);
  });
};

exports.uploadToCloudinary = uploadToCloudinary;